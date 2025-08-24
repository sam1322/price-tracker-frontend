// components/AuthDialog.tsx
'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { BASEURL } from '@/constants/path';
import { useAuthStore, User } from '@/stores/authStore';
import { useQueryClient } from '@tanstack/react-query';
import { Chrome, UserCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

interface AuthDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess: (user: User) => void;
}

export function AuthDialog({ open, onOpenChange, onSuccess }: AuthDialogProps) {
    const router = useRouter();
    const [mode, setMode] = useState<'signin' | 'signup'>('signin');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const { createGuestSession, login, register } = useAuthStore()
    const queryClient = useQueryClient()
    const isSignUp = mode === 'signup'

    const handleEmailAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            // const endpoint = isSignUp ? '/auth/register' : '/auth/login';
            // const body = isSignUp
            //     ? { email, password, name }
            //     : { email, password };

            const signFn = isSignUp ? register : login

            await signFn({ email, password, name })

            queryClient.invalidateQueries(); // Invalidates ALL queries

            // Redirect on success
            // router.push('/dashboard');
            router.back()
            // const response = await fetch(`${BASEURL}${endpoint}`, {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     credentials: 'include', // Important for cookies
            //     body: JSON.stringify(body),
            // });

            // const data = await response.json();

            // if (!response.ok) {
            //     throw new Error(data.message || 'Something went wrong');
            // }

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

        // const currentPath = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;

        // // Encode the redirect URI
        // const redirectUri = encodeURIComponent(currentPath);



        // // Redirect to Google auth with redirect_uri parameter
        // window.location.href = `${process.env.NEXT_PUBLIC_API_URL
        //     }/auth/google?redirect_uri=${redirectUri}`;
    };

    const handleGuestLogin = async () => {
        setLoading(true);
        try {
            await createGuestSession()
            // Redirect on success
            // router.push('/dashboard');
            queryClient.invalidateQueries(); // Invalidates ALL queries

            router.back();
        } catch (err) {
            console.error(err)
            toast.error('Failed to login as guest')
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px] bg-gray-900 border-gray-800">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-white text-center">
                        {mode === 'signin' ? 'Welcome Back' : 'Create Account'}
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    {/* Guest Login Option */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
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
                            <span className="bg-gray-900 px-2 text-gray-400">Or continue with</span>
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
                                className="bg-gray-800 border-gray-700 text-white placeholder-gray-500"
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
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-red-400 text-sm"
                            >
                                {error}
                            </motion.p>
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
                            className="w-full bg-purple-600 hover:bg-purple-700 text-white"
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
                        className="w-full bg-gray-800 border-gray-700 hover:bg-gray-700 text-white"
                    >
                        <Chrome className="w-4 h-4 mr-2" />
                        Continue with Google
                    </Button>

                    {/* Toggle between Sign In and Sign Up */}
                    {/* <div className="text-center text-sm">
                        <span className="text-gray-400">
                            {mode === 'signin' ? "Don't have an account? " : 'Already have an account? '}
                        </span>
                        <button
                            type="button"
                            onClick={() => {
                                setMode(mode === 'signin' ? 'signup' : 'signin');
                                setError('');
                            }}
                            className="text-purple-400 hover:text-purple-300 font-medium"
                        >
                            {mode === 'signin' ? 'Sign Up' : 'Sign In'}
                        </button>
                    </div> */}
                </div>
            </DialogContent>
        </Dialog>
    );
}