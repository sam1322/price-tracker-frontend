// components/VideoJobTracker.tsx
'use client';

import { videoApi } from '@/lib/api/ai-video-generation.service';
import { AlertCircle, CheckCircle2, Circle, Download, Loader2, Play, Share2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface JobStatus {
    id: string;
    status: string;
    videoUrl?: string;
    error?: string;
}

// const statusSteps = [
//     { key: 'GENERATING_SCRIPT', label: 'Writing Script', icon: '📝' },
//     { key: 'GENERATING_ASSETS', label: 'Creating Visuals', icon: '🎨' },
//     { key: 'RENDERING_VIDEO', label: 'Rendering Video', icon: '🎬' },
//     { key: 'COMPLETED', label: 'Complete', icon: '✨' },
// ];

const statusSteps = [
    { key: 'PENDING', label: 'Starting Up', icon: '⏳' },
    { key: 'GENERATING_SCRIPT', label: 'Writing Script', icon: '📝' },
    { key: 'SCRIPT_GENERATED', label: 'Script Ready', icon: '✅' },
    { key: 'GENERATING_ASSETS', label: 'Creating Visuals', icon: '🎨' },
    { key: 'ASSETS_GENERATED', label: 'Assets Ready', icon: '🖼️' },
    { key: 'RENDERING_VIDEO', label: 'Rendering Video', icon: '🎬' },
    { key: 'COMPLETED', label: 'Complete', icon: '✨' },
];


// enum JobStatus {
//     PENDING, GENERATING_SCRIPT
//   SCRIPT_GENERATED, GENERATING_ASSETS
//   ASSETS_GENERATED, RENDERING_VIDEO
//   COMPLETED
//   FAILED
// }

export function VideoJobTracker({ jobId }: { jobId: string }) {
    const [job, setJob] = useState<JobStatus | null>(null);
    const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // eslint-disable-next-line prefer-const
        let intervalId: NodeJS.Timeout;

        const fetchJobStatus = async () => {
            try {
                const data = await videoApi.getJobStatus(jobId);
                // const data = { status: "COMPLETED" }
                setJob(data);

                // Stop polling if job is complete or failed
                if (data.status === 'COMPLETED' || data.status === 'FAILED') {
                    clearInterval(intervalId);
                }
            } catch (err) {
                setError('Failed to fetch job status');
                clearInterval(intervalId);
            }
        };

        // Initial fetch
        fetchJobStatus();

        // Poll every 2 seconds
        intervalId = setInterval(fetchJobStatus, 2000);

        return () => clearInterval(intervalId);
    }, [jobId]);

    if (error) {
        return (
            <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4">
                <p className="text-red-200">{error}</p>
            </div>
        );
    }

    if (!job) {
        return (
            <div className="flex justify-center p-8">
                <Loader2 className="w-8 h-8 animate-spin text-white/50" />
            </div>
        );
    }


    const currentStepIndex = statusSteps.findIndex(step => step.key === job.status);
    // const currentStepIndex = (() => {
    //     switch (job.status) {
    //         case 'PENDING':
    //         case 'GENERATING_SCRIPT':
    //             return 0;
    //         case 'SCRIPT_GENERATED':
    //         case 'GENERATING_ASSETS':
    //             return 1;
    //         case 'ASSETS_GENERATED':
    //         case 'RENDERING_VIDEO':
    //             return 2;
    //         case 'COMPLETED':
    //             return 3;
    //         default:
    //             return -1;
    //     }
    // })();

    return (
        <>
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20">
                <h3 className="text-white text-xl font-semibold mb-6">Creating Your Video</h3>

                {/* Progress Steps */}
                <div className="space-y-4">
                    {statusSteps.map((step, index) => {
                        const isActive = index === currentStepIndex;
                        const isCompleted = index < currentStepIndex || job.status === 'COMPLETED';
                        const isFailed = job.status === 'FAILED';

                        return (
                            <motion.div
                                key={step.key}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-center space-x-4"
                            >
                                <div className="relative">
                                    {isCompleted && !isFailed ? (
                                        <CheckCircle2 className="w-8 h-8 text-green-400" />
                                    ) : isActive && !isFailed ? (
                                        <div className="relative">
                                            <Circle className="w-8 h-8 text-white/30" />
                                            <Loader2 className="w-8 h-8 text-purple-400 absolute top-0 left-0 animate-spin" />
                                        </div>
                                    ) : isFailed ? (
                                        <AlertCircle className="w-8 h-8 text-red-400" />
                                    ) : (
                                        <Circle className="w-8 h-8 text-white/30" />
                                    )}
                                </div>

                                <div className="flex-1">
                                    <div className="flex items-center space-x-3">
                                        <span className="text-2xl">{step.icon}</span>
                                        <span className={`font-medium ${isActive || isCompleted ? 'text-white' : 'text-white/50'
                                            }`}>
                                            {step.label}
                                        </span>
                                    </div>

                                    {isActive && !isFailed && (
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: '100%' }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                            className="h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mt-2"
                                        />
                                    )}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Error Message */}
                {job.status === 'FAILED' && job.error && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg"
                    >
                        <p className="text-red-200 text-sm">{job.error}</p>
                    </motion.div>
                )}

                {/* Success Message & Video Player */}
                {/* {job.status === 'COMPLETED' && job.videoUrl && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-6"
                    >
                        <button
                            onClick={() => setIsVideoModalOpen(true)}
                            className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold 
                       rounded-xl flex items-center justify-center space-x-2 hover:shadow-lg transition"
                        >
                            <Play className="w-5 h-5" />
                            <span>Watch Your Video</span>
                        </button>
                    </motion.div>
                )} */}
                {/* Success State */}
                <AnimatePresence>
                    {job.status === 'COMPLETED' && job.videoUrl ? (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ delay: 0.3 }}
                            className="mt-8 space-y-6"
                        >
                            {/* Video Preview */}
                            <div className="relative rounded-xl overflow-hidden bg-black/50 aspect-video">
                                <video
                                    src={job.videoUrl}
                                    className="w-full h-full object-cover"
                                    // poster={job.thumbnailUrl}
                                    controls
                                    muted
                                    loop
                                    autoPlay
                                />
                                <button
                                    onClick={() => setIsVideoModalOpen(true)}
                                    className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/20 transition group"
                                >
                                    <div className="bg-white/90 rounded-full p-4 group-hover:scale-110 transition">
                                        <Play className="w-8 h-8 text-gray-900" />
                                    </div>
                                </button>
                            </div>

                            {/* Action Buttons */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => setIsVideoModalOpen(true)}
                                    className="flex items-center justify-center space-x-2 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-xl hover:shadow-lg transition"
                                >
                                    <Play className="w-5 h-5" />
                                    <span>Watch Video</span>
                                </motion.button>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => window.open(job.videoUrl, '_blank')}
                                    className="flex items-center justify-center space-x-2 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl border border-white/20 transition"
                                >
                                    <Download className="w-5 h-5" />
                                    <span>Download</span>
                                </motion.button>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => {
                                        navigator.clipboard.writeText(job.videoUrl ?? '');
                                        toast.success('Video link copied successfully')

                                        // navigator.clipboard.writeText(window.location.origin + '/video/' + job.id);
                                        // You could add a toast notification here
                                    }}
                                    className="flex items-center justify-center space-x-2 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl border border-white/20 transition"
                                >
                                    <Share2 className="w-5 h-5" />
                                    <span>Share</span>
                                </motion.button>
                            </div>

                            {/* Success Message */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="text-center"
                            >
                                <p className="text-green-400 text-sm">
                                    ✨ Your AI video has been successfully generated!
                                </p>
                            </motion.div>
                        </motion.div>
                    ) : null}
                </AnimatePresence>
            </div>

            {/* Video Modal */}
            {isVideoModalOpen && job.videoUrl && (
                <VideoModal
                    videoUrl={job.videoUrl}
                    onClose={() => setIsVideoModalOpen(false)}
                />
            )}
        </>
    );
}


// components/VideoJobTracker.tsx (continued)
function VideoModal({ videoUrl, onClose }: { videoUrl: string; onClose: () => void }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="bg-black rounded-2xl overflow-hidden max-w-4xl w-full"
                onClick={(e) => e.stopPropagation()}
            >
                <video
                    src={videoUrl}
                    controls
                    autoPlay
                    className="w-full h-auto"
                />
                <div className="p-4 bg-white/5 flex justify-between items-center">
                    <div className="flex space-x-4">
                        <button
                            onClick={() => window.open(videoUrl, '_blank')}
                            className="text-white/70 hover:text-white transition text-sm flex items-center space-x-2"
                        >
                            <Download className="w-4 h-4" />
                            <span>Download</span>
                        </button>
                        <button
                            onClick={() => {
                                navigator.clipboard.writeText(videoUrl ?? '');
                                toast.success('Video link copied successfully')
                                // navigator.clipboard.writeText(`${window.location.origin}/video/${jobId}`);
                            }}
                            className="text-white/70 hover:text-white transition text-sm flex items-center space-x-2"
                        >
                            <Share2 className="w-4 h-4" />
                            <span>Copy Link</span>
                        </button>
                    </div>
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition"
                    >
                        Close
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
}