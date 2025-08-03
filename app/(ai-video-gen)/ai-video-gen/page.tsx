import VideoGenerator from '@/components/ai-video-generation/VideoGenerator';

export default function Home() {
    return (
        <div className="min-h-screen bg-gray-100">
            <div className="container mx-auto py-12 px-4">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        AI Video Generator
                    </h1>
                    <p className="text-xl text-gray-600">
                        Create professional videos from text in seconds
                    </p>
                </div>

                <VideoGenerator />
            </div>
        </div>
    );
}