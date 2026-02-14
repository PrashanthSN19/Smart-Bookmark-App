'use client'

import { createClient } from '@/lib/supabase/client'
import { useState } from 'react'

export default function AddBookmarkForm({ onAdd }: { onAdd?: (bookmark: any) => void }) {
    const [title, setTitle] = useState('')
    const [url, setUrl] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const supabase = createClient()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        // Basic validation
        if (!title.trim() || !url.trim()) {
            setError('Title and URL are required')
            setLoading(false)
            return
        }

        try {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) {
                throw new Error('You must be logged in to add a bookmark')
            }

            const { data, error: insertError } = await supabase
                .from('bookmarks')
                .insert([
                    {
                        title: title.trim(),
                        url: url.trim(),
                        user_id: user.id,
                    },
                ])
                .select()
                .single()

            if (insertError) throw insertError

            if (onAdd && data) {
                onAdd(data)
            }

            setTitle('')
            setUrl('')
        } catch (err: any) {
            setError(err.message || 'Failed to add bookmark')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="relative">
            <div className="mb-6 text-center">
                <h3 className="text-xl font-bold text-gray-900">Add New Bookmark</h3>
                <p className="text-sm text-gray-500 mt-1">Save your favorite links deeply</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                    <div className="rounded-xl bg-red-50 p-3 text-sm text-red-600 border border-red-100 flex items-center gap-2 animate-pulse">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {error}
                    </div>
                )}

                <div className="group">
                    <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-1 ml-1">
                        Title
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="block w-full pl-10 pr-3 py-3 rounded-xl border border-gray-200 bg-white/50 focus:bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all duration-200 shadow-sm"
                            placeholder="e.g. My Favorite Site"
                            required
                        />
                    </div>
                </div>

                <div className="group">
                    <label htmlFor="url" className="block text-sm font-semibold text-gray-700 mb-1 ml-1">
                        URL
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <input
                            type="url"
                            id="url"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            className="block w-full pl-10 pr-3 py-3 rounded-xl border border-gray-200 bg-white/50 focus:bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all duration-200 shadow-sm"
                            placeholder="https://example.com"
                            required
                        />
                    </div>
                </div>

                <div className="pt-2">
                    <button
                        type="submit"
                        disabled={loading}
                        className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-lg shadow-indigo-500/30 transition-all duration-200 transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <span className="flex items-center gap-2">
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Adding...
                            </span>
                        ) : (
                            <span className="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:rotate-90 transition-transform duration-200" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                                </svg>
                                Add Bookmark
                            </span>
                        )}
                    </button>
                </div>
            </form>
        </div>
    )
}
