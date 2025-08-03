"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';

interface VideoJob {
    id: string;
    status: 'processing' | 'completed' | 'error';
    progress: number;
    filePath?: string;
    error?: string;
}

export default function VideoGenerator() {
    const [query, setQuery] = useState('');
    const [currentJob, setCurrentJob] = useState<VideoJob | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [videoUrl, setVideoUrl] = useState<string | null>(null);

    const handleGenerate = async () => {
        if (!query.trim()) return;

        setIsGenerating(true);
        setCurrentJob(null);
        setVideoUrl(null);

        try {
            const response = await axios.post('http://localhost:3001/video/generate', {
                query: query.trim(),
            });

            const { jobId } = response.data;
            pollJobStatus(jobId);

        } catch (error) {
            console.error('Error generating video:', error);
            setIsGenerating(false);
        }
    };

    const pollJobStatus = async (jobId: string) => {
        const interval = setInterval(async () => {
            try {
                const response = await axios.get(`http://localhost:3001/video/status/${jobId}`);
                const job: VideoJob = response.data;

                setCurrentJob(job);

                if (job.status === 'completed') {
                    clearInterval(interval);
                    setIsGenerating(false);
                    setVideoUrl(`http://localhost:3001/video/download/${jobId}`);
                } else if (job.status === 'error') {
                    clearInterval(interval);
                    setIsGenerating(false);
                }
            } catch (error) {
                console.error('Error polling status:', error);
                clearInterval(interval);
                setIsGenerating(false);
            }
        }, 2000);
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8">
                {/* Input Section */}
                <div className="mb-8">
                    <label htmlFor="query" className="block text-sm font-medium text-gray-700 mb-2">
                        Describe your video
                    </label>
                    <div className="flex gap-4">
                        <textarea
                            id="query"
                            rows={3}
                            className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Create a video about making coffee..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            disabled={isGenerating}
                        />
                        <button
                            onClick={handleGenerate}
                            disabled={isGenerating || !query.trim()}
                            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                            {isGenerating ? 'Generating...' : 'Generate Video'}
                        </button>
                    </div>
                </div>

                {/* Progress Section */}
                {currentJob && (
                    <div className="mb-8">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium text-gray-700">
                                {currentJob.status === 'processing' ? 'Generating your video...' :
                                    currentJob.status === 'completed' ? 'Video ready!' :
                                        'Error occurred'}
                            </span>
                            <span className="text-sm text-gray-500">{currentJob.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                                className={`h-2 rounded-full transition-all duration-300 ${currentJob.status === 'error' ? 'bg-red-500' : 'bg-blue-600'
                                    }`}
                                style={{ width: `${currentJob.progress}%` }}
                            ></div>
                        </div>
                        {currentJob.error && (
                            <p className="text-red-600 text-sm mt-2">{currentJob.error}</p>
                        )}
                    </div>
                )}

                {/* Video Preview Section */}
                {videoUrl && (
                    <div className="mb-8">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Your Video</h3>
                        <div className="bg-black rounded-lg overflow-hidden">
                            <video
                                controls
                                className="w-full max-w-2xl mx-auto"
                                style={{ maxHeight: '400px' }}
                            >
                                <source src={videoUrl} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </div>
                        <div className="text-center mt-4">
                            <a
                                href={videoUrl}
                                download
                                className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                            >
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                Download Video
                            </a>
                        </div>
                    </div>
                )}

                {/* Examples Section */}
                <div className="border-t pt-8">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Example Prompts</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                            "Create a video about making coffee",
                            "Show how to bake chocolate chip cookies",
                            "Demonstrate proper yoga poses for beginners",
                            "Explain how solar panels work"
                        ].map((example, index) => (
                            <button
                                key={index}
                                onClick={() => setQuery(example)}
                                disabled={isGenerating}
                                className="text-left p-3 bg-gray-50 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <span className="text-sm text-gray-700">{example}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}