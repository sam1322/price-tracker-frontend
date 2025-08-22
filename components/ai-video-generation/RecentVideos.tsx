'use client';

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Play, Clock, User, Eye, Heart } from 'lucide-react';
import { Video, videoApi } from '@/lib/api/ai-video-generation.service';
import { VideoLoadingSkeleton } from './LoadingStates';
import { VideoPlayerModal } from './VideoPlayerModal';


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

  // if (error) return null;
  // TODO: fix this later ie show an error state if the api really gives an error other than 404 signifying there is no recent video available
  // if (error) {
  //     return (
  //         <div className="mt-20 text-center">
  //             <p className="text-red-400">{error}</p>
  //             <button
  //                 onClick={fetchRecentVideos}
  //                 className="mt-4 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition"
  //             >
  //                 Try Again
  //             </button>
  //         </div>
  //     );
  // }

  //   return (
  //   <motion.section
  //     id="gallery"
  //     initial={{ opacity: 0 }}
  //     animate={{ opacity: 1 }}
  //     transition={{ delay: 0.6 }}
  //     className="mt-20"
  //   >
  //     <div className="text-center mb-12">
  //       <h3 className="text-3xl font-bold text-white mb-8 text-center">Recent Creations</h3>

  //       <p className="text-white/70 max-w-2xl mx-auto">
  //         Explore amazing AI-generated videos created by you
  //       </p>
  //     </div>

  //     {loading ? (
  //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  //         {[...Array(6)].map((_, i) => (
  //           <VideoLoadingSkeleton key={i} />
  //         ))}
  //       </div>
  //     ) : videos.length === 0 ? (
  //       <div className="text-center py-16">
  //         <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
  //           <Play className="w-12 h-12 text-white/50" />
  //         </div>
  //         <p className="text-white/50 text-lg">No videos in the gallery yet</p>
  //         <p className="text-white/30 mt-2">Be the first to create one!</p>
  //       </div>
  //     ) : (
  //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  //         {videos.map((video, index) => (
  //           <motion.div
  //             key={video.id}
  //             initial={{ opacity: 0, y: 20 }}
  //             animate={{ opacity: 1, y: 0 }}
  //             transition={{ delay: index * 0.1 }}
  //             className="group cursor-pointer"
  //             onClick={() => setSelectedVideo(video)}
  //           >
  //             <div className="relative overflow-hidden rounded-xl bg-white/10 backdrop-blur border border-white/20 hover:border-white/40 transition">
  //               {/* Video Thumbnail */}
  //               <div className="aspect-video relative">
  //                 <video
  //                   src={video.videoUrl}
  //                   poster={video.thumbnailUrl}
  //                   className="w-full h-full object-cover"
  //                   muted
  //                   onMouseEnter={(e) => e.currentTarget.play()}
  //                   onMouseLeave={(e) => {
  //                     e.currentTarget.pause();
  //                     e.currentTarget.currentTime = 0;
  //                   }}
  //                 />
  //                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
  //                   <Play className="w-12 h-12 text-white opacity-90 group-hover:scale-110 transition" />
  //                 </div>
  //               </div>

  //               {/* Video Info */}
  //               <div className="p-4">
  //                 <p className="text-white/90 line-clamp-2 mb-3 font-medium">{video.prompt}</p>
  //                 <div className="flex items-center justify-between text-white/50 text-sm">
  //                   <div className="flex items-center space-x-3">
  //                     <div className="flex items-center space-x-1">
  //                       <Eye className="w-4 h-4" />
  //                       <span>{video.views || 0}</span>
  //                     </div>
  //                     <div className="flex items-center space-x-1">
  //                       <Heart className="w-4 h-4" />
  //                       <span>{video.likes || 0}</span>
  //                     </div>
  //                   </div>
  //                   <div className="flex items-center space-x-1">
  //                     <Clock className="w-4 h-4" />
  //                     <span>{new Date(video.createdAt).toLocaleDateString()}</span>
  //                   </div>
  //                 </div>
  //               </div>
  //             </div>
  //           </motion.div>
  //         ))}
  //       </div>
  //     )}

  //     {/* Video Modal */}
  //     {selectedVideo && (
  //       <VideoPlayerModal
  //         video={selectedVideo}
  //         onClose={() => setSelectedVideo(null)}
  //       />
  //     )}
  //   </motion.section>
  // );
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6 }}
      className="mt-40 pt-10"
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
      {videos.length === 0 && (

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
