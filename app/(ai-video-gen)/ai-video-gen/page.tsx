'use client';

import { RecentVideos } from '@/components/ai-video-generation/RecentVideos';
import VideoGenerationForm from '@/components/ai-video-generation/VideoGenerationForm';
import { VideoJobTracker } from '@/components/ai-video-generation/VideoJobTracker';
import { VideoShowcase } from '@/components/ai-video-generation/VideoShowCase';
import { videoApi } from '@/lib/api/ai-video-generation.service';
import { Loader2, User } from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function HomePage() {
  const [activeJobId, setActiveJobId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState(null);


  const fetchProcessingVideos = async () => {
    try {
      setLoading(true);
      const data = await videoApi.getProcessingVideos();
      if (data?.length > 0) {
        setActiveJobId(data[0].id)
      }
      // setVideos(data);
    } catch (err) {
      // setError('Failed to load recent videos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  const fetchUser = () => {

  }
  useEffect(() => {
    // Check if user is logged in
    // const savedUser = localStorage.getItem('user');
    // if (savedUser) {
    //   setUser(JSON.parse(savedUser));
    // }
    fetchProcessingVideos()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-white mx-auto mb-4" />
          <p className="text-white/70">Loading your AI Video Studio...</p>
        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>

      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-white/10 backdrop-blur-xl">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
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

              <nav className="flex items-center space-x-6">
                <a href="#gallery" className="text-white/70 hover:text-white transition">Gallery</a>

                {user ? (
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2 text-white/70">
                      <User className="w-4 h-4" />
                      <span className="text-sm">{user.email}</span>
                    </div>
                    <button
                      onClick={() => {
                        localStorage.removeItem('user');
                        setUser(null);
                      }}
                      className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg backdrop-blur transition text-sm"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <Link
                    href="/auth/signin"
                    className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg backdrop-blur transition cursor-pointer"
                  >
                    Sign In
                  </Link>
                )}
              </nav>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center mb-12"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Transform Ideas into
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> AI Videos</span>
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Describe your vision and watch as AI brings it to life with stunning visuals,
              narration, and professional editing.
            </p>
          </motion.div>

          {/* Video Generation Form */}
          <VideoGenerationForm onJobCreated={setActiveJobId} />

          {/* Active Job Tracker */}
          {/* {true ? ( */}
          {activeJobId ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-12"
            >
              <VideoJobTracker jobId={activeJobId} />
            </motion.div>
          ) : null}

          {/* Recent Videos Gallery */}
          <RecentVideos />
          <VideoShowcase  />
        </section>
      </div>
    </div>
  );
}