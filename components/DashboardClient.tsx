'use client'

import AddBookmarkForm from '@/components/AddBookmarkForm'
import BookmarkList from '@/components/BookmarkList'
import LogoutButton from '@/components/LogoutButton'
import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'

type Bookmark = {
    id: string
    title: string
    url: string
    created_at: string
    user_id: string
}

export default function DashboardClient({ user, initialBookmarks }: { user: User, initialBookmarks: Bookmark[] }) {
    const [bookmarks, setBookmarks] = useState<Bookmark[]>(initialBookmarks)
    const supabase = createClient()

    useEffect(() => {
        const channel = supabase
            .channel('realtime bookmarks')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'bookmarks',
                },
                (payload) => {
                    if (payload.eventType === 'INSERT') {
                        // Client-side RLS Check: Ensure this bookmark belongs to the current user
                        const newBookmark = payload.new as Bookmark
                        if (newBookmark.user_id !== user.id) return

                        setBookmarks((prev) => {
                            if (prev.some(b => b.id === newBookmark.id)) return prev
                            return [newBookmark, ...prev]
                        })
                    } else if (payload.eventType === 'DELETE') {
                        // For DELETE, payload.old only contains the ID unless REPLICA IDENTITY FULL is set
                        // We simply remove it if it's in our list (which implies ownership)
                        setBookmarks((prev) => prev.filter((b) => b.id !== payload.old.id))
                    } else if (payload.eventType === 'UPDATE') {
                        const updatedBookmark = payload.new as Bookmark
                        if (updatedBookmark.user_id !== user.id) return

                        setBookmarks((prev) => prev.map(b => b.id === updatedBookmark.id ? updatedBookmark : b))
                    }
                }
            )
            .subscribe()

        return () => {
            supabase.removeChannel(channel)
        }
    }, [supabase])

    const handleAddBookmark = (newBookmark: Bookmark) => {
        // Optimistic update: check if it's already there (from realtime) to avoid dupes
        setBookmarks((prev) => {
            if (prev.some(b => b.id === newBookmark.id)) return prev
            return [newBookmark, ...prev]
        })
    }

    const handleDeleteBookmark = (id: string) => {
        setBookmarks((prev) => prev.filter((b) => b.id !== id))
    }

    return (
        <div className="min-h-screen font-sans text-gray-900">
            {/* Top Navigation Bar */}
            <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/20 bg-white/70 backdrop-blur-md shadow-sm">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <div className="flex flex-col">
                            <span className="text-2xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                                Abstrabit
                            </span>
                            <span className="text-xs font-medium text-gray-500 tracking-wide uppercase">
                                Smart Bookmark Dashboard
                            </span>
                        </div>
                        <div className="flex items-center space-x-6">
                            <div className="hidden md:flex flex-col items-end">
                                <span className="text-sm font-medium text-gray-700">
                                    Welcome back
                                </span>
                                <span className="text-xs text-gray-500">
                                    {user.email}
                                </span>
                            </div>
                            <LogoutButton />
                        </div>
                    </div>
                </div>
            </nav>

            <main className="pt-24 pb-12 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Main Content Grid */}
                <div className="grid gap-8 lg:grid-cols-12 items-start">
                    {/* Left Column: Add Bookmark Form */}
                    <div className="lg:col-span-4 sticky top-24">
                        <div className="bg-white/40 backdrop-blur-xl rounded-2xl shadow-xl border border-white/50 overflow-hidden">
                            <div className="h-2 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
                            <div className="p-6">
                                <AddBookmarkForm onAdd={handleAddBookmark} />
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Bookmarks List */}
                    <div className="lg:col-span-8">
                        <div className="mb-6 flex items-center justify-between">
                            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                                </svg>
                                Your Bookmarks
                            </h2>
                            <span className="px-3 py-1 text-xs font-semibold text-indigo-600 bg-indigo-50 rounded-full border border-indigo-100">
                                {bookmarks.length} saved
                            </span>
                        </div>
                        <BookmarkList bookmarks={bookmarks} onDelete={handleDeleteBookmark} />
                    </div>
                </div>
            </main>
        </div>
    )
}
