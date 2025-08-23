'use client';

import { Video, videoApi } from '@/lib/api/ai-video-generation.service';
import { useQuery } from '@tanstack/react-query';
import { Clock, Play, User } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { VideoLoadingSkeleton } from './LoadingStates';
import { VideoPlayerModal } from './VideoPlayerModal';


export function RecentVideos() {
  // const [videos, setVideos] = useState<Video[]>([]);
  // const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  const fetchRecentVideos = async () => {
    try {
      const data = await videoApi.getRecentVideos();
      console.log("videos data", data)
      // setVideos(data);
      return data as Video[]
    } catch (err) {
      setError('Failed to load recent videos');
      console.error(err);
    }
    return []
  };

  // useEffect(() => {
  //   fetchRecentVideos();
  // }, []);

  const { data: videos, isPending: loading } = useQuery({
    queryKey: ["recentVideos"],
    queryFn: () => fetchRecentVideos(),
  });


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
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6 }}
      className="mt-40 pt-10"
    >
      <h3 className="text-3xl font-bold text-white mb-8 text-center">Recent Creations</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.isArray(videos) && videos.map((video, index) => (
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
                  onMouseEnter={(e) => e.currentTarget.play()}
                  onMouseLeave={(e) => {
                    e.currentTarget.pause();
                    e.currentTarget.currentTime = 0;
                  }}
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
      {Array.isArray(videos) && videos.length === 0 && (
        <div className="text-center py-16">
          {/* <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Play className="w-12 h-12 text-white/50" />
          </div> */}
          <p className="text-white/50 text-lg">No videos created yet</p>
          {/* <p className="text-white/30 mt-2">Be the first to create one!</p> */}
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
