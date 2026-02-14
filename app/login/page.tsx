'use client'

import { createClient } from '@/lib/supabase/client'
import { useState } from 'react'

export default function LoginPage() {
    const [loading, setLoading] = useState(false)
    const supabase = createClient()

    const handleLogin = async () => {
        setLoading(true)
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${location.origin}/auth/callback`,
            },
        })

        if (error) {
            console.error('Error logging in:', error.message)
            setLoading(false)
        }
    }

    return (
        <div className="flex min-h-screen w-full font-sans">
            {/* Left Side - Branding */}
            <div className="hidden w-1/2 flex-col justify-center items-center bg-gradient-to-br from-blue-600 to-indigo-800 p-12 text-white relative overflow-hidden lg:flex">
                {/* Decorative Background Shapes */}
                <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>

                <div className="relative z-10 text-center max-w-lg">
                    <h1 className="text-6xl font-extrabold tracking-tight mb-4 drop-shadow-sm">Abstrabit</h1>
                    <p className="text-2xl font-light mb-8 text-blue-100 tracking-wide">Your Smart Bookmark Companion</p>
                    <p className="text-lg text-blue-200 leading-relaxed font-light">
                        Save, manage, and access your bookmarks securely from anywhere.
                        Experience a new way to organize your digital life.
                    </p>
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="flex w-full items-center justify-center bg-white p-8 lg:w-1/2">
                <div className="w-full max-w-md space-y-10">
                    <div className="text-center">
                        <h2 className="text-4xl font-bold tracking-tight text-gray-900">
                            Welcome Back
                        </h2>
                        <p className="mt-3 text-base text-gray-500">
                            Login using your Google account to continue
                        </p>
                    </div>

                    <div className="mt-8">
                        <button
                            onClick={handleLogin}
                            disabled={loading}
                            className="group relative flex w-full items-center justify-center gap-3 rounded-full bg-white border border-gray-200 px-8 py-4 text-base font-semibold text-gray-700 shadow-sm hover:bg-gray-50 hover:shadow-md hover:border-gray-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <>
                                    <svg className="h-5 w-5 animate-spin text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <span>Connecting...</span>
                                </>
                            ) : (
                                <>
                                    {/* Google Standard Icon */}
                                    <svg className="h-6 w-6" viewBox="0 0 24 24">
                                        <path
                                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                            fill="#4285F4"
                                        />
                                        <path
                                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                            fill="#34A853"
                                        />
                                        <path
                                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                            fill="#FBBC05"
                                        />
                                        <path
                                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                            fill="#EA4335"
                                        />
                                    </svg>
                                    <span>Continue with Google</span>
                                </>
                            )}
                        </button>
                    </div>

                    <div className="pt-8 text-center text-xs text-gray-400">
                        &copy; {new Date().getFullYear()} Abstrabit Inc. All rights reserved.
                    </div>
                </div>
            </div>
        </div>
    )
}
