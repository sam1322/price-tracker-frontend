// components/VideoShowcase.tsx
'use client';

import { Clock, Play, Sparkles, TrendingUp, User } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import Link from 'next/link';
import { useState } from 'react';
import { VideoPlayerModal } from './VideoPlayerModal';
import { Video } from './VideoShowCaseWithApi';
import { useAuthStore } from '@/stores/authStore';
// import { VideoPlayerModal } from './VideoPlayerModal';

// interface ShowcaseVideo {
//     id: string;
//     videoUrl: string;
//     thumbnailUrl?: string;
//     prompt: string;
//     category?: string;
//     duration?: number;
//     views?: number;
//     likes?: number;
//     featured?: boolean;
//     createdAt: string;
// }

// Sample showcase data - replace with your actual featured videos
const SHOWCASE_VIDEOS: Video[] = [
    {
        id: '1',
        videoUrl: 'https://azurefilestorage132.blob.core.windows.net/sam-blob/cmehjnrpn000fi0hq966m0ts3/final_video.mp4',
        prompt: 'Playfull cute puppies in cinematic style',
        category: 'Fantasy',
        duration: 18,
        views: 892,
        likes: 67,
        createdAt: '2025-08-18'
    },
    {
        id: '2',
        videoUrl: 'https://azurefilestorage132.blob.core.windows.net/sam-blob/cmegpjles0001i0tewr3kzo1m/final_video.mp4',
        // thumbnailUrl: '/thumbnails/sample1.jpg',
        prompt: 'how nuclear energy is the best source energy for the mankind.',
        category: 'Sci-Fi',
        duration: 30,
        views: 1234,
        likes: 89,
        // featured: true,
        createdAt: '2025-08-18'
    },
    {
        id: '3',
        videoUrl: 'https://azurefilestorage132.blob.core.windows.net/sam-blob/cmehjbhs40001i01k18mcyp4j/final_video.mp4',
        prompt: 'a story about prehistoric earth  in cinematic style',
        category: 'Fantasy',
        duration: 6,
        views: 892,
        likes: 67,
        createdAt: '2025-08-18'
    },
    // Add more showcase videos...
];

const categories = ['All', 'Trending', 'Sci-Fi', 'Fantasy', 'Nature', 'Abstract', 'Cinematic'];

export function VideoShowcase() {
    const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [hoveredId, setHoveredId] = useState<string | null>(null);
    const { user } = useAuthStore()

    const filteredVideos = selectedCategory === 'All'
        ? SHOWCASE_VIDEOS
        : selectedCategory === 'Trending'
            ? SHOWCASE_VIDEOS.filter(v => v.featured)
            : SHOWCASE_VIDEOS.filter(v => v.category === selectedCategory);

    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/10 rounded-full blur-3xl" />
            </div>

            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    id="gallery"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        AI Video Gallery
                    </h2>
                    <p className="text-xl text-white/70 max-w-3xl mx-auto">
                        Explore stunning videos created by our AI. From cinematic scenes to abstract art,
                        see what&apos;s possible with just a text prompt.
                    </p>
                </motion.div>

                {/* Category Filter */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex flex-wrap justify-center gap-3 mb-12"
                >
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-6 py-2 rounded-full font-medium transition-all ${selectedCategory === category
                                ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/25'
                                : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
                                }`}
                        >
                            {category === 'Trending' && <TrendingUp className="w-4 h-4 inline mr-1" />}
                            {category}
                        </button>
                    ))}
                </motion.div>

                {/* Video Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredVideos.map((video, index) => (
                        <motion.div
                            key={video.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            onHoverStart={() => setHoveredId(video.id)}
                            onHoverEnd={() => setHoveredId(null)}
                            className="group relative "
                        >
                            <div
                                className="h-full relative overflow-hidden rounded-2xl bg-gray-900/50 backdrop-blur border border-white/10 hover:border-white/20 transition-all cursor-pointer"
                                onClick={() => setSelectedVideo(video)}
                            >
                                {/* Featured Badge */}
                                {video.featured && (
                                    <div className="absolute top-4 left-4 z-10">
                                        <div className="px-3 py-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center space-x-1">
                                            <Sparkles className="w-3 h-3 text-white" />
                                            <span className="text-xs font-medium text-white">Featured</span>
                                        </div>
                                    </div>
                                )}

                                {/* Video Thumbnail */}
                                <div className="aspect-video relative overflow-hidden">
                                    <video
                                        src={video.videoUrl}
                                        poster={video.thumbnailUrl}
                                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                                        muted
                                        loop
                                        playsInline
                                        onMouseEnter={(e) => {
                                            if (hoveredId === video.id) {
                                                e.currentTarget.play();
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.pause();
                                            e.currentTarget.currentTime = 0;
                                        }}
                                    />

                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition" />

                                    {/* Play Button */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <motion.div
                                            initial={{ scale: 1 }}
                                            animate={{ scale: hoveredId === video.id ? 1.1 : 1 }}
                                            className="w-16 h-16 bg-white/20 backdrop-blur rounded-full flex items-center justify-center group-hover:bg-white/30 transition"
                                        >
                                            <Play className="w-6 h-6 text-white ml-1" fill="white" />
                                        </motion.div>
                                    </div>

                                    {/* Duration */}
                                    {video.duration && (
                                        <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 rounded text-xs text-white">
                                            {Math.floor(video.duration / 60)}:{(video.duration % 60).toString().padStart(2, '0')}
                                        </div>
                                    )}
                                </div>

                                {/* Video Info */}
                                <div className="p-5 flex flex-col justify-between ">
                                    <div>
                                        <h3 className="text-white font-medium line-clamp-2 mb-3 group-hover:text-purple-400 transition truncate" title={video.prompt}>
                                            {video.prompt}
                                        </h3>

                                        {/* Category Tag */}
                                        {video.category && (
                                            <span className="inline-block px-3 py-1 bg-purple-500/20 text-purple-400 text-xs rounded-full mb-3">
                                                {video.category}
                                            </span>
                                        )}
                                    </div>
                                    {/* Stats */}
                                    <div className="flex items-center justify-between text-white/50 text-sm ">

                                        {/* TODO: will be implemented later */}
                                        {/* <div className="flex items-center space-x-3">
                                            <div className="flex items-center space-x-1">
                                                <Eye className="w-4 h-4" />
                                                <span>{video.views?.toLocaleString() || 0}</span>
                                            </div>
                                            <div className="flex items-center space-x-1">
                                                <Heart className="w-4 h-4" />
                                                <span>{video.likes || 0}</span>
                                            </div>
                                        </div> */}
                                        <div className="flex items-center justify-between text-white/50 text-sm w-full">
                                            <div className="flex items-center space-x-1">
                                                <Clock className="w-4 h-4" />
                                                <span>{new Date(video.createdAt).toLocaleDateString()}</span>
                                            </div>
                                            <div className="flex items-center space-x-1">
                                                <User className="w-4 h-4" />
                                                <span>AI Generated</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Empty State */}
                {filteredVideos.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20"
                    >
                        <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Play className="w-12 h-12 text-white/50" />
                        </div>
                        <p className="text-white/50 text-lg">No videos in this category yet</p>
                    </motion.div>
                )}

                {/* Call to Action */}
                {user ? null : <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="mt-16 text-center"
                >
                    <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl backdrop-blur border border-white/10">
                        <Sparkles className="w-8 h-8 text-purple-400" />
                        <div className="text-left">
                            <h3 className="text-white font-semibold text-lg">Ready to create your own?</h3>
                            <p className="text-white/70 text-sm">Sign up and start generating amazing AI videos in seconds</p>
                        </div>
                        <Link
                            href={"/auth/signin"}
                            // onClick={() => window.location.href = '/auth/signin'}
                            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all"
                        >
                            Get Started Free
                        </Link>
                    </div>
                </motion.div>}
            </div>

            {/* Video Modal */}
            <AnimatePresence>
                {selectedVideo && (
                    <VideoPlayerModal
                        video={selectedVideo}
                        onClose={() => setSelectedVideo(null)}
                    />
                )}
            </AnimatePresence>
        </section>
    );
}