// components/VideoShowcaseWithAPI.tsx
'use client';

import { useState, useEffect } from 'react';
import { VideoShowcase } from './VideoShowCase';

export interface Video {
  id: string;
  videoUrl: string;
  thumbnailUrl?: string;
  prompt: string;
  category?: string;
  duration?: number;
  views?: number;
  likes?: number;
  featured?: boolean;
  createdAt: string;
}

export function VideoShowcaseWithAPI() {
  // const [videos, setVideos] = useState<Video[]>([]);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   fetchShowcaseVideos();
  // }, []);

  // const fetchShowcaseVideos = async () => {
  //   try {
  //     const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/videos/showcase`);
  //     if (response.ok) {
  //       const data = await response.json();
  //       setVideos(data);
  //     }
  //   } catch (error) {
  //     console.error('Failed to fetch showcase videos:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // if (loading) {
  //   return <VideoShowcaseLoading />;
  // }

  return <VideoShowcase  />;
  // return <VideoShowcase videos={videos} />;
}

// Loading skeleton
function VideoShowcaseLoading() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="h-12 w-96 bg-white/10 rounded-lg mx-auto mb-4 animate-pulse" />
          <div className="h-6 w-full max-w-3xl bg-white/10 rounded-lg mx-auto animate-pulse" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="aspect-video bg-white/10 rounded-2xl animate-pulse" />
          ))}
        </div>
      </div>
    </section>
  );
}