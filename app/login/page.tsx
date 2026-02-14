'use client'

import { createClient } from '@/lib/supabase/client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Bookmark, Sparkles, Zap, Layers, Command } from 'lucide-react'

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
        <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-slate-900 text-slate-100 font-sans selection:bg-indigo-500/30">
            {/* Animated Background Mesh */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-gradient-to-br from-indigo-600/30 to-purple-600/30 blur-[100px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-gradient-to-br from-blue-600/30 to-cyan-600/30 blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />
                <div className="absolute top-[20%] right-[20%] w-[30%] h-[30%] rounded-full bg-gradient-to-br from-violet-600/20 to-fuchsia-600/20 blur-[80px] animate-pulse" style={{ animationDelay: '4s' }} />
            </div>

            {/* Floating Particles/Shapes */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <FloatingIcon Icon={Bookmark} className="top-[15%] left-[10%] text-indigo-400/20" size={48} delay={0} />
                <FloatingIcon Icon={Zap} className="top-[60%] left-[8%] text-blue-400/20" size={32} delay={2} />
                <FloatingIcon Icon={Sparkles} className="top-[25%] right-[10%] text-purple-400/20" size={40} delay={1} />
                <FloatingIcon Icon={Layers} className="bottom-[15%] right-[15%] text-cyan-400/20" size={36} delay={3} />
                <FloatingIcon Icon={Command} className="bottom-[10%] left-[20%] text-violet-400/20" size={28} delay={4} />
            </div>

            {/* Main Glassmorphism Card */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative z-10 w-full max-w-5xl h-auto min-h-[600px] mx-4 flex flex-col lg:flex-row overflow-hidden rounded-[2.5rem] bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl"
            >
                {/* Left Side - Brand & Value Prop */}
                <div className="w-full lg:w-1/2 p-12 lg:p-16 flex flex-col justify-between relative overflow-hidden group">
                    {/* Subtle inner gradient highlight */}
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    
                    <div className="relative z-10">
                        <motion.div 
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium tracking-wider text-indigo-200 uppercase mb-8"
                        >
                            <Sparkles size={14} className="text-indigo-400" />
                            Next Gen Bookmarking
                        </motion.div>
                        
                        <motion.h1 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.6 }}
                            className="text-5xl lg:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-200 to-indigo-400 drop-shadow-sm"
                        >
                            Abstrabit
                        </motion.h1>
                        
                        <motion.p 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.7, duration: 0.6 }}
                            className="text-lg lg:text-xl text-slate-300 font-light leading-relaxed max-w-sm"
                        >
                            Your cognitive web companion. Capture, organize, and recall the internet with elegant simplicity.
                        </motion.p>
                    </div>

                    <div className="relative z-10 space-y-4 hidden lg:block">
                        <FeatureItem text="Smart tagging & organization" delay={0.9} />
                        <FeatureItem text="Instant search retrieval" delay={1.1} />
                        <FeatureItem text="Distraction-free reading mode" delay={1.3} />
                    </div>
                </div>

                {/* Right Side - Authentication */}
                <div className="w-full lg:w-1/2 p-12 lg:p-16 bg-gradient-to-br from-white/5 to-white/0 flex flex-col justify-center items-center relative border-t lg:border-t-0 lg:border-l border-white/5">
                   <div className="w-full max-w-sm space-y-8">
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8, duration: 0.6 }}
                            className="text-center"
                        >
                             <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 mb-6">
                                <Bookmark className="text-white w-8 h-8" />
                             </div>
                            <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
                            <p className="text-slate-400 text-sm">Sign in to access your digital brain</p>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.0, duration: 0.6 }}
                        >
                            <button
                                onClick={handleLogin}
                                disabled={loading}
                                className="group relative w-full flex items-center justify-center gap-3 px-8 py-4 bg-white text-slate-900 rounded-xl font-semibold text-lg hover:bg-indigo-50 transition-all duration-300 shadow-lg shadow-indigo-500/10 hover:shadow-indigo-500/20 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <div className="h-6 w-6 animate-spin rounded-full border-2 border-slate-300 border-t-indigo-600" />
                                ) : (
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
                                )}
                                <span>Continue with Google</span>
                            </button>
                            
                            <p className="mt-6 text-center text-xs text-slate-500 font-medium">
                                By continuing, you agree to our Terms of Service and Privacy Policy.
                            </p>
                        </motion.div>
                   </div>
                </div>
            </motion.div>
            
            {/* Footer / Copyright */}
            <div className="absolute bottom-6 w-full text-center text-xs text-slate-600 z-10 font-medium">
                &copy; {new Date().getFullYear()} Abstrabit Inc. All rights reserved.
            </div>
        </div>
    )
}

// Subcomponents for cleaner code

function FloatingIcon({ Icon, className, size, delay }: { Icon: any, className: string, size: number, delay: number }) {
    return (
        <motion.div
            className={`absolute ${className}`}
            animate={{ 
                y: [0, -15, 0],
                opacity: [0.3, 0.6, 0.3],
                rotate: [0, 5, -5, 0]
             }}
            transition={{ 
                duration: 6, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: delay 
            }}
        >
            <Icon size={size} />
        </motion.div>
    )
}

function FeatureItem({ text, delay }: { text: string, delay: number }) {
    return (
        <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay, duration: 0.5 }}
            className="flex items-center gap-3 text-slate-400 group/item hover:text-indigo-300 transition-colors duration-300 cursor-default"
        >
            <div className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover/item:bg-indigo-400 transition-colors duration-300" />
            <span className="text-sm tracking-wide">{text}</span>
        </motion.div>
    )
}
