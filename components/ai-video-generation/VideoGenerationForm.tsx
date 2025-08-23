// components/VideoGenerationForm.tsx
'use client';

import { useState } from 'react';
// import { motion } from 'framer-motion';
import { videoApi } from '@/lib/api/ai-video-generation.service';
import { Loader2, Sparkles, Wand2 } from 'lucide-react';
import { motion } from "motion/react";
import { useRouter } from 'next/navigation';

interface Props {
    onJobCreated: (jobId: string) => void;
}
function VideoGenerationForm({ onJobCreated }: Props) {
    const [prompt, setPrompt] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [selectedStyle, setSelectedStyle] = useState('cinematic');
    const [error, setError] = useState<string | null>(null);
    const router = useRouter()

    const videoStyles = [
        { id: 'cinematic', name: 'Cinematic', icon: '🎬', color: 'from-orange-500 to-red-500' },
        { id: 'anime', name: 'Anime', icon: '🎌', color: 'from-purple-500 to-pink-500' },
        { id: 'realistic', name: 'Realistic', icon: '📷', color: 'from-blue-500 to-cyan-500' },
        { id: 'cartoon', name: 'Cartoon', icon: '🎨', color: 'from-green-500 to-emerald-500' },
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!prompt.trim()) return;

        setIsLoading(true);
        setError(null)
        try {
            const data = await videoApi.generateVideo(
                `${prompt} in ${selectedStyle} style`
            );
            onJobCreated(data.jobId);
            setPrompt('');
        } catch (error) {
            console.log("error",error)
            if(error.response.status == 401){
                router.push("/auth/signin")
            }
            setError('Failed to generate video. Please try again.');
            console.error('Failed to generate video:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-4xl mx-auto"
        >
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Style Selection */}
                    <div>
                        <label className="text-white text-sm font-medium mb-3 block">Choose Style</label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {videoStyles.map((style) => (
                                <motion.button
                                    key={style.id}
                                    type="button"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setSelectedStyle(style.id)}
                                    className={`p-4 rounded-xl border-2 transition-all ${selectedStyle === style.id
                                            ? 'border-white bg-white/20'
                                            : 'border-white/20 bg-white/5 hover:bg-white/10'
                                        }`}
                                >
                                    <div className="text-3xl mb-2">{style.icon}</div>
                                    <div className="text-white text-sm font-medium">{style.name}</div>
                                </motion.button>
                            ))}
                        </div>
                    </div>

                    {/* Prompt Input */}
                    <div>
                        <label className="text-white text-sm font-medium mb-3 block">Describe Your Video</label>
                        <div className="relative">
                            <textarea
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                placeholder="A futuristic city with flying cars at sunset..."
                                className="w-full h-32 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-white/40 focus:bg-white/15 transition resize-none"
                                disabled={isLoading}
                            />
                            <Sparkles className="absolute top-3 right-3 w-5 h-5 text-white/30" />
                        </div>
                    </div>

                    {/* Advanced Options */}
                    <details className="group">
                        <summary className="text-white/70 text-sm cursor-pointer hover:text-white transition">
                            Advanced Options
                        </summary>
                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-white/70 text-xs mb-2 block">Duration</label>
                                <select className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm">
                                    <option value="15">15 seconds</option>
                                    <option value="30">30 seconds</option>
                                    <option value="60">60 seconds</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-white/70 text-xs mb-2 block">Aspect Ratio</label>
                                <select className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm">
                                    <option value="16:9">16:9 (Landscape)</option>
                                    <option value="9:16">9:16 (Portrait)</option>
                                    <option value="1:1">1:1 (Square)</option>
                                </select>
                            </div>
                        </div>
                    </details>

                    {/* Submit Button */}
                    <motion.button
                        type="submit"
                        disabled={isLoading || !prompt.trim()}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl 
                     disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center space-x-2"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                <span>Creating Your Video...</span>
                            </>
                        ) : (
                            <>
                                <Wand2 className="w-5 h-5" />
                                <span>Generate Video</span>
                            </>
                        )}
                    </motion.button>
                </form>
            </div>
        </motion.div>
    );
}

export default VideoGenerationForm