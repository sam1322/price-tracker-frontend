// components/VideoJobTracker.tsx
'use client';

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Circle, Loader2, AlertCircle, Play } from 'lucide-react';
import { videoApi } from '@/lib/api/ai-video-generation.service';

interface JobStatus {
    id: string;
    status: string;
    videoUrl?: string;
    error?: string;
}

const statusSteps = [
    { key: 'GENERATING_SCRIPT', label: 'Writing Script', icon: '📝' },
    { key: 'GENERATING_ASSETS', label: 'Creating Visuals', icon: '🎨' },
    { key: 'RENDERING_VIDEO', label: 'Rendering Video', icon: '🎬' },
    { key: 'COMPLETED', label: 'Complete', icon: '✨' },
];

export function VideoJobTracker({ jobId }: { jobId: string }) {
    const [job, setJob] = useState<JobStatus | null>(null);
    const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // useEffect(() => {
    //     const pollJob = async () => {
    //         try {
    //             const response = await fetch(`/api/videos/status/${jobId}`);
    //             const data = await response.json();
    //             setJob(data);

    //             if (data.status === 'COMPLETED' || data.status === 'FAILED') {
    //                 clearInterval(interval);
    //             }
    //         } catch (error) {
    //             console.error('Failed to fetch job status:', error);
    //         }
    //     };

    //     pollJob();
    //     const interval = setInterval(pollJob, 2000);

    //     return () => clearInterval(interval);
    // }, [jobId]);

    // if (!job) return null;

    useEffect(() => {
        let intervalId: NodeJS.Timeout;

        const fetchJobStatus = async () => {
            try {
                const data = await videoApi.getJobStatus(jobId);
                setJob(data);
                setError(null)

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
                {job.status === 'COMPLETED' && job.videoUrl && (
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
                )}
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



// Video Modal Component
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
                    <button
                        onClick={() => window.open(videoUrl, '_blank')}
                        className="text-white/70 hover:text-white transition text-sm"
                    >
                        Download Video
                    </button>
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
