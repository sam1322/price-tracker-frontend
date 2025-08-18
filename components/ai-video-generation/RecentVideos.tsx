// components/RecentVideos.tsx
'use client';

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Play, Clock, User } from 'lucide-react';
import { Video, videoApi } from '@/lib/api/ai-video-generation.service';
import { VideoLoadingSkeleton } from './LoadingStates';


export function RecentVideos() {
    const [videos, setVideos] = useState<Video[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

    const fetchRecentVideos = async () => {
        try {
            setLoading(true);
            const data = await videoApi.getRecentVideos();
            setVideos(data);
        } catch (err) {
            setError('Failed to load recent videos');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRecentVideos();
    }, []);



    if (loading) {
        return (
            <div className="mt-20">
                <h3 className="text-3xl font-bold text-white mb-8 text-center">Recent Creations</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, i) => (
                        <VideoLoadingSkeleton key={i} />
                    ))}
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="mt-20 text-center">
                <p className="text-red-400">{error}</p>
                <button
                    onClick={fetchRecentVideos}
                    className="mt-4 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition"
                >
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-20"
        >
            <h3 className="text-3xl font-bold text-white mb-8 text-center">Recent Creations</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {videos.map((video, index) => (
                    <motion.div
                        key={video.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="group cursor-pointer"
                        onClick={() => setSelectedVideo(video)}
                    >
                        <div className="relative overflow-hidden rounded-xl bg-white/10 backdrop-blur border border-white/20">
                            {/* Video Thumbnail */}
                            <div className="aspect-video relative">
                                <video
                                    src={video.videoUrl}
                                    className="w-full h-full object-cover"
                                    muted
                                />
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition flex items-center justify-center">
                                    <Play className="w-12 h-12 text-white opacity-80 group-hover:scale-110 transition" />
                                </div>
                            </div>

                            {/* Video Info */}
                            <div className="p-4">
                                <p className="text-white/90 line-clamp-2 mb-3">{video.prompt}</p>
                                <div className="flex items-center justify-between text-white/50 text-sm">
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
                    </motion.div>
                ))}
            </div>

            {/* Empty State */}
            {videos.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-white/50">No videos created yet. Be the first!</p>
                </div>
            )}

            {/* Video Modal */}
            {selectedVideo && (
                <VideoPlayerModal
                    video={selectedVideo}
                    onClose={() => setSelectedVideo(null)}
                />
            )}
        </motion.section>
    );
}

function VideoPlayerModal({ video, onClose }: { video: Video; onClose: () => void }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="bg-gray-900 rounded-2xl overflow-hidden max-w-5xl w-full"
                // components/RecentVideos.tsx (continued)
                onClick={(e) => e.stopPropagation()}
            >
                <div className="relative">
                    <video
                        src={video.videoUrl}
                        controls
                        autoPlay
                        className="w-full h-auto max-h-[70vh]"
                    />
                </div>

                <div className="p-6 bg-gray-800">
                    <h4 className="text-white text-xl font-semibold mb-2">Video Details</h4>
                    <p className="text-gray-300 mb-4">{video.prompt}</p>

                    <div className="flex items-center justify-between">
                        <div className="text-gray-400 text-sm">
                            Created on {new Date(video.createdAt).toLocaleString()}
                        </div>

                        <div className="flex space-x-3">
                            <button
                                onClick={() => window.open(video.videoUrl, '_blank')}
                                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition"
                            >
                                Download
                            </button>
                            <button
                                onClick={onClose}
                                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}