'use client'

import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'

type Bookmark = {
    id: string
    title: string
    url: string
    created_at: string
    user_id: string
}

export default function BookmarkList({ bookmarks, onDelete }: { bookmarks: Bookmark[], onDelete: (id: string) => void }) {
    const supabase = createClient()
    const [deletingId, setDeletingId] = useState<string | null>(null)

    const handleDeleteClick = (id: string) => {
        setDeletingId(id)
    }

    const confirmDelete = async () => {
        if (!deletingId) return

        try {
            const id = deletingId
            // Optimistic update in parent
            onDelete(id)

            const { error } = await supabase.from('bookmarks').delete().eq('id', id)
            if (error) {
                console.error('Error deleting bookmark:', error)
                alert('Failed to delete bookmark')
                // Ideally revert optimistic update here if failed, but for now alert is enough
            }
        } catch (err) {
            console.error('Exception deleting:', err)
        } finally {
            setDeletingId(null)
        }
    }

    const cancelDelete = () => {
        setDeletingId(null)
    }

    if (bookmarks.length === 0) {
        return (
            <div className="mt-8 text-center py-12 bg-white/40 backdrop-blur-sm rounded-2xl border border-dashed border-indigo-200">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-indigo-50">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                </div>
                <h3 className="mt-4 text-sm font-medium text-gray-900">No bookmarks yet</h3>
                <p className="mt-1 text-sm text-gray-500">Get started by creating a new bookmark.</p>
            </div>
        )
    }

    return (
        <>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                {bookmarks.map((bookmark) => (
                    <div
                        key={bookmark.id}
                        className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/60 bg-white/60 backdrop-blur-md p-6 shadow-lg shadow-indigo-100/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-200/50 hover:bg-white/80"
                    >
                        <div className="absolute top-0 right-0 h-24 w-24 translate-x-12 -translate-y-12 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 opacity-50 blur-2xl transition-all group-hover:opacity-100"></div>

                        <div className="relative z-10">
                            <div className="mb-4 flex items-start justify-between">
                                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 transition-colors group-hover:bg-indigo-100 group-hover:text-indigo-700">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                    </svg>
                                </div>
                                <button
                                    onClick={() => handleDeleteClick(bookmark.id)}
                                    className="rounded-full p-2 text-gray-400 hover:bg-red-50 hover:text-red-600 transition-all duration-200 focus:outline-none"
                                    title="Delete Bookmark"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>

                            <h4 className="text-lg font-bold text-gray-900 line-clamp-1" title={bookmark.title}>
                                {bookmark.title}
                            </h4>

                            <a
                                href={bookmark.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-1 block text-sm text-gray-500 hover:text-indigo-600 hover:underline line-clamp-1 transition-colors"
                                title={bookmark.url}
                            >
                                {bookmark.url}
                            </a>
                        </div>

                        <div className="relative z-10 mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                            <span className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded-md">
                                {new Date(bookmark.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                            </span>
                            <a
                                href={bookmark.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 group/link"
                            >
                                Visit Site
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 transform transition-transform group-hover/link:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </a>
                        </div>
                    </div>
                ))}
            </div>

            {/* Delete Confirmation Modal */}
            {deletingId && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6 border border-white/50 transform transition-all scale-100">
                        <div className="text-center">
                            <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:h-10 sm:w-10">
                                <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                                </svg>
                            </div>
                            <h3 className="mt-4 text-lg font-semibold leading-6 text-gray-900" id="modal-title">Delete Bookmark?</h3>
                            <div className="mt-2">
                                <p className="text-sm text-gray-500">Are you sure you want to delete this bookmark? This action cannot be undone.</p>
                            </div>
                        </div>
                        <div className="mt-6 flex gap-3 sm:flex-row-reverse">
                            <button
                                type="button"
                                className="inline-flex w-full justify-center rounded-lg bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                                onClick={confirmDelete}
                            >
                                Delete
                            </button>
                            <button
                                type="button"
                                className="mt-3 inline-flex w-full justify-center rounded-lg bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto transition-colors focus:outline-none"
                                onClick={cancelDelete}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
