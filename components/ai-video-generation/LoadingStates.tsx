export const VideoLoadingSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="aspect-video bg-white/10 rounded-xl mb-4"></div>
      <div className="p-4">
        <div className="h-4 bg-white/10 rounded w-3/4 mb-2"></div>
        <div className="h-3 bg-white/10 rounded w-1/2"></div>
      </div>
    </div>
  );
}