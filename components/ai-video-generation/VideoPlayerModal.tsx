
// import { motion } from "motion/react"
// import { Video } from "./VideoShowCaseWithApi";


// export const VideoPlayerModal = ({ video, onClose }: { video: Video; onClose: () => void }) => {
//     return (
//         <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl"
//             onClick={onClose}
//         >
//             <motion.div
//                 initial={{ scale: 0.9 }}
//                 animate={{ scale: 1 }}
//                 className="bg-gray-900 rounded-2xl overflow-hidden max-w-5xl w-full"
//                 // components/RecentVideos.tsx (continued)
//                 onClick={(e) => e.stopPropagation()}
//             >
//                 <div className="relative">
//                     <video
//                         src={video.videoUrl}
//                         controls
//                         autoPlay
//                         className="w-full h-auto max-h-[70vh]"
//                     />
//                 </div>

//                 <div className="p-6 bg-gray-800">
//                     <h4 className="text-white text-xl font-semibold mb-2">Video Details</h4>
//                     <p className="text-gray-300 mb-4">{video.prompt}</p>

//                     <div className="flex items-center justify-between">
//                         <div className="text-gray-400 text-sm">
//                             Created on {new Date(video.createdAt).toLocaleString()}
//                         </div>

//                         <div className="flex space-x-3">
//                             <button
//                                 onClick={() => window.open(video.videoUrl, '_blank')}
//                                 className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition"
//                             >
//                                 Download
//                             </button>
//                             <button
//                                 onClick={onClose}
//                                 className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition"
//                             >
//                                 Close
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </motion.div>
//         </motion.div>
//     );
// }

'use client';

import { Clock, Download, Heart, Share2, X } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { Video } from './VideoShowCaseWithApi';
// VideoPlayerModal component
export function VideoPlayerModal({
    video,
    onClose
}: {
    video: Video;
    onClose: () => void;
}) {
    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        // Prevent body scroll when modal is open
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Check out this AI-generated video',
                    text: video.prompt,
                    url: window.location.href,
                });
            } catch (err) {
                console.error('Error sharing:', err);
            }
        }
    };

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = video.videoUrl;
        link.download = `ai-video-${video.id}.mp4`;
        link.click();
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative max-w-5xl w-full bg-gray-900 rounded-2xl overflow-hidden shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/10 backdrop-blur rounded-full flex items-center justify-center hover:bg-white/20 transition"
                >
                    <X className="w-5 h-5 text-white" />
                </button>

                {/* Video */}
                <div className="aspect-video bg-black">
                    <video
                        src={video.videoUrl}
                        controls
                        autoPlay
                        className="w-full h-full"
                    />
                </div>

                {/* Info */}
                <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                            <h2 className="text-xl font-semibold text-white mb-2">{video.prompt}</h2>
                            {video.category && (
                                <span className="inline-block px-3 py-1 bg-purple-500/20 text-purple-400 text-sm rounded-full">
                                    {video.category}
                                </span>
                            )}
                        </div>

                        {/* Action buttons */}
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => setIsLiked(!isLiked)}
                                className={`p-2 rounded-lg transition ${isLiked ? 'bg-pink-500 text-white' : 'bg-white/10 text-white hover:bg-white/20'
                                    }`}
                            >
                                <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                            </button>
                            <button
                                onClick={handleShare}
                                className="p-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition"
                            >
                                <Share2 className="w-5 h-5" />
                            </button>
                            <button
                                onClick={handleDownload}
                                className="p-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition"
                            >
                                <Download className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center space-x-6 text-white/50 text-sm">
                        {/* <div className="flex items-center space-x-1">
                            <Eye className="w-4 h-4" />
                            <span>{video.views?.toLocaleString() || 0} views</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <Heart className="w-4 h-4" />
                            <span>{video.likes || 0} likes</span>
                        </div> */}
                        <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>Created {new Date(video.createdAt).toLocaleDateString()}</span>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}