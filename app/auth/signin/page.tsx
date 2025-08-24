'use client';

import { Button } from '@/components/ui/button';
import { BASEURL } from '@/constants/path';
import { useAuthStore } from '@/stores/authStore';
import { useQueryClient } from '@tanstack/react-query';
import { ArrowLeft, Chrome, UserCircle } from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

export default function SignInPage() {
    const router = useRouter();
    const [mode, setMode] = useState<'signin' | 'signup'>('signin');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const queryClient = useQueryClient()
    const { createGuestSession, login, register } = useAuthStore()

    const handleGuestLogin = async () => {
        setLoading(true);
        try {
            await createGuestSession()
            // Redirect on success
            queryClient.invalidateQueries(); // Invalidates ALL queries

            router.push("/")
            // router.back();
        } catch (err) {
            console.log("guest erorr", err)
            toast.error('Failed to login as guest')
        } finally {
            setLoading(false);
        }
    };


    const isSignUp = mode === 'signup'

    const handleEmailAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const signFn = isSignUp ? register : login

            await signFn({ email, password, name })

            queryClient.invalidateQueries(); // Invalidates ALL queries

            // Redirect on success
            // router.push('/dashboard');
            router.back()
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleAuth = async () => {
        // In real app, this would redirect to Google OAuth
        window.location.href = `${BASEURL}/auth/google`;
    };

    return (
        <div className="min-h-screen bg-gray-950 flex flex-col relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
                <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
                <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />
            </div>

            {/* Header */}
            <header className="w-full p-6 z-10">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <Link href="/" className="inline-flex items-center text-gray-400 hover:text-white transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Home
                    </Link>
                    {/* Optional: Add your logo here */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center space-x-3"
                    >
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-bold text-white">AI Video Studio</h1>
                    </motion.div>
                </div>
            </header>

            {/* Main Content */}
            <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="w-full max-w-md"
                >
                    {/* Card Container */}
                    <div className="bg-gray-900/30 backdrop-blur-xl border border-gray-800 rounded-2xl shadow-2xl p-8">
                        {/* ... (rest of the form content stays the same, but add these enhancements) */}
                        {/* Title */}
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold text-white mb-2">
                                {mode === 'signin' ? 'Welcome Back' : 'Create Account'}
                            </h1>
                            <p className="text-gray-400">
                                {mode === 'signin'
                                    ? 'Sign in to continue to your dashboard'
                                    : 'Sign up to get started with your account'}
                            </p>
                        </div>

                        <div className="space-y-6">
                            {/* Guest Login Option */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4"
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-white font-medium">Try as Guest</p>
                                        <p className="text-gray-400 text-sm">No signup required</p>
                                    </div>
                                    <Button
                                        onClick={handleGuestLogin}
                                        disabled={loading}
                                        variant="outline"
                                        className="bg-blue-500/20 border-blue-500/40 hover:bg-blue-500/30 text-white cursor-pointer"
                                    >
                                        <UserCircle className="w-4 h-4 mr-2" />
                                        Guest Access
                                    </Button>
                                </div>
                            </motion.div>

                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t border-gray-700" />
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-gray-900/50 px-2 text-gray-400">Or continue with</span>
                                </div>
                            </div>

                            {/* Email/Password Form */}
                            {/* <form onSubmit={handleEmailAuth} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-gray-300">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="you@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        disabled={loading}
                                        className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:bg-gray-800 transition-colors"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="password" className="text-gray-300">Password</Label>
                                    <div className="relative">
                                        <Input
                                            id="password"
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="••••••••"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            disabled={loading}
                                            className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:bg-gray-800 transition-colors pr-10"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                                        >
                                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                    </div>
                                </div>

                                <AnimatePresence>
                                    {mode === 'signup' && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="space-y-2 overflow-hidden"
                                        >
                                            <Label htmlFor="name" className="text-gray-300">Full Name</Label>
                                            <Input
                                                id="name"
                                                type="text"
                                                placeholder="John Doe"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                disabled={loading}
                                                className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:bg-gray-800 transition-colors"
                                                required={mode === 'signup'}
                                            />
                                        </motion.div>
                                    )}
                                </AnimatePresence>


                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="bg-red-500/10 border border-red-500/20 rounded-lg p-3"
                                    >
                                        <p className="text-red-400 text-sm">{error}</p>
                                    </motion.div>
                                )}


                                {mode === 'signin' && (
                                    <div className="flex justify-end">
                                        <Link
                                            href="/auth/forgot-password"
                                            className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
                                        >
                                            Forgot password?
                                        </Link>
                                    </div>
                                )}

                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2.5"
                                >
                                    {loading ? (
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : (
                                        <>
                                            <Mail className="w-4 h-4 mr-2" />
                                            {mode === 'signin' ? 'Sign In' : 'Sign Up'}
                                        </>
                                    )}
                                </Button>
                            </form> */}

                            {/* Google Auth */}
                            <Button
                                onClick={handleGoogleAuth}
                                disabled={loading}
                                variant="outline"
                                className="w-full bg-gray-800/50 border-gray-700 hover:bg-gray-700/50 text-white font-medium py-2.5"
                            >
                                <Chrome className="w-4 h-4 mr-2" />
                                Continue with Google
                            </Button>

                            {/* Toggle between Sign In and Sign Up */}
                            <div className="text-center text-sm pt-4">
                                <span className="text-gray-400">
                                    {mode === 'signin' ? "Don't have an account? " : 'Already have an account? '}
                                </span>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setMode(mode === 'signin' ? 'signup' : 'signin');
                                        setError('');
                                    }}
                                    className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
                                >
                                    {mode === 'signin' ? 'Sign Up' : 'Sign In'}
                                </button>
                            </div>
                        </div>


                        {/* ... (rest of the form content) */}
                    </div>

                    {/* Footer Links */}
                    <div className="mt-8 text-center text-sm text-gray-500">
                        <p>
                            By continuing, you agree to our{' '}
                            <Link href="/terms" className="text-purple-400 hover:text-purple-300">
                                Terms of Service
                            </Link>{' '}
                            and{' '}
                            <Link href="/privacy" className="text-purple-400 hover:text-purple-300">
                                Privacy Policy
                            </Link>
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );


}