// Loading component for when projects are being fetched
export function ProjectsLoading() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-8 pb-16">
        <div className="max-w-7xl mx-auto">
          {/* Header skeleton */}
          <div className="text-center mb-12">
            <div className="h-16 w-96 bg-gray-800 rounded-lg mx-auto mb-4 animate-pulse" />
            <div className="h-6 w-full max-w-3xl bg-gray-800 rounded-lg mx-auto animate-pulse" />
          </div>

          {/* Grid skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-900/50 rounded-2xl overflow-hidden">
                <div className="h-48 bg-gray-800 animate-pulse" />
                <div className="p-6 space-y-3">
                  <div className="h-6 bg-gray-800 rounded animate-pulse" />
                  <div className="h-4 bg-gray-800 rounded animate-pulse w-3/4" />
                  <div className="h-4 bg-gray-800 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}