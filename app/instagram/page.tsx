'use client';

import apiClient, { ApiResponse } from '@/constants/apiClient';
import { useState } from 'react';

interface InstagramResponse {
  videoUrl: string;
}



export default function InstagramDownloaderPage() {
  // const defaultVideoUrl = "https://instagram.fblr2-2.fna.fbcdn.net/o1/v/t2/f2/m86/AQP24AVrODfdJToFdUMbWfBonXgZM2NcbIE5eM97cEeNCGrIv0yJ7QQy-1gL9Ji-v5bH96DG58TVeZmJWLgQcmHJVWGMDbyMyDfjKbk.mp4?_nc_cat=111&_nc_oc=AdnrdzFq-HWUAXHbf-Eilc4zppogz8Y46Zvtf59CQAXKmcpHw0URs8bpEX4dMpPRysU2JK1Q57LOoKxoqRqGFiDl&_nc_sid=5e9851&_nc_ht=instagram.fblr2-2.fna.fbcdn.net&_nc_ohc=vGyjXAwZ8WsQ7kNvwEtrYGq&efg=eyJ2ZW5jb2RlX3RhZyI6Inhwdl9wcm9ncmVzc2l2ZS5JTlNUQUdSQU0uQ0xJUFMuQzMuNzIwLmRhc2hfYmFzZWxpbmVfMV92MSIsInhwdl9hc3NldF9pZCI6MTM5MTE4OTYxNTUwMjA1NCwidmlfdXNlY2FzZV9pZCI6MTAwOTksImR1cmF0aW9uX3MiOjE0LCJ1cmxnZW5fc291cmNlIjoid3d3In0%3D&ccb=17-1&vs=429ed71219eed083&_nc_vs=HBksFQIYUmlnX3hwdl9yZWVsc19wZXJtYW5lbnRfc3JfcHJvZC8zNDRCM0UwQjc5NDg4MkJFRjM5MzUyODRBNzVGQzU5N192aWRlb19kYXNoaW5pdC5tcDQVAALIARIAFQIYOnBhc3N0aHJvdWdoX2V2ZXJzdG9yZS9HSkxIOHg1YkF2TG5RTDBEQVBGckhfOHlsVmdlYnFfRUFBQUYVAgLIARIAKAAYABsCiAd1c2Vfb2lsATEScHJvZ3Jlc3NpdmVfcmVjaXBlATEVAAAmzIvHrfLR-AQVAigCQzMsF0AtzMzMzMzNGBJkYXNoX2Jhc2VsaW5lXzFfdjERAHX-B2XmnQEA&_nc_zt=28&oh=00_AfStrwBaLr1Wqqd6vBqQ1yVwDE97OPLOrLsog3knj92V4g&oe=687EB420"
  // const defaultUrl = BASEURL + `/instagram/stream?url=${encodeURIComponent(defaultVideoUrl)}`;
  const defaultUrl = ""

  const [postUrl, setPostUrl] = useState('');
  const [videoSrc, setVideoSrc] = useState(defaultUrl);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setVideoSrc('');
    setError('');

    try {
      console.log("postUrl", postUrl)
      // Step 1: Use the Axios instance (no need for full URLs)
      // @ts-expect-error fix the type error later
      const { videoUrl } = await apiClient.post<ApiResponse<InstagramResponse>>('/instagram/download', {
        url: postUrl
      });

      console.log("videoUrl", videoUrl)

      // TODO - fix this later
      // Step 2: Construct proxy URL
      // const proxyUrl = BASEURL + `/instagram/stream?url=${encodeURIComponent(videoUrl)}`;

      setVideoSrc(videoUrl);

    } catch (err) {
      setIsLoading(false); // Still handle request errors immediately
      if (err instanceof Error) {
        console.error("Err", err.message)
        setError(err.message); // Error is already simplified by the interceptor
      }
    } finally {
      // setIsLoading(false);
    }
  };

  const handleVideoLoaded = () => {
    setIsLoading(false);
  };

  const handleVideoError = () => {
    setIsLoading(false);
    setError('Failed to load video');
  };

  console.log("postUrl", postUrl)

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Instagram Video Downloader
          </h1>
          <p className="text-gray-600">
            Download Instagram videos, reels, and IGTV content
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="mb-8">
            <div className="flex gap-4">
              <input
                type="url"
                value={postUrl}
                onChange={(e) => setPostUrl(e.target.value)}
                placeholder="https://www.instagram.com/p/..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                required
              />
              <button
                type="submit"
                disabled={isLoading}
                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Loading...
                  </span>
                ) : (
                  'Download'
                )}
              </button>
            </div>
          </form>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800">{error}</p>
            </div>
          )}

          {videoSrc && (
            <div className="space-y-6">
              {/* {result?.title && (
                <h2 className="text-xl font-semibold text-gray-800">{result.title}</h2>
              )} */}

              <div className="space-y-4">
                <div className="aspect-video1 bg-bla1ck rounded-lg 1overflow-hidden flex flex-col gap-4 items-center justify-center">
                  <video
                    controls
                    // poster={result.thumbnail}
                    key={videoSrc} // Use key to force re-render when src changes
                    autoPlay
                    src={videoSrc}
                    className="w-full h-full rounded-lg shadow-2xl max-w-[350px]"
                    onLoadedData={handleVideoLoaded}
                    onError={handleVideoError}
                    onCanPlayThrough={handleVideoLoaded} // Backup event
                  >
                    {/* <source src={result.media} type="video/mp4" /> */}
                    {/* Your browser does not support the video tag. */}
                  </video>
                  <a href={videoSrc}
                    target='_blank'
                    download="instagram-video.mp4"
                    className="w-fit px-4 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors duration-200"
                  >
                    Download Video
                  </a>
                </div>
              </div>
              {/*TODO: Video Preview */}
              {/* {typeof result.media === 'string' ? (
                <div className="space-y-4">
                  <div className="aspect-video bg-black rounded-lg overflow-hidden">
                    <video
                      controls
                      className="w-full h-full"
                      poster={result.thumbnail}
                    >
                      <source src={result.media} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                  <button
                    onClick={() => downloadFile(result.media as string)}
                    className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors duration-200"
                  >
                    Download Video
                  </button>
                </div>
              ) : ( 
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {result.media.map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="aspect-video bg-black rounded-lg overflow-hidden">
                        <video
                          controls
                          className="w-full h-full"
                        >
                          <source src={item.url} type="video/mp4" />
                        </video>
                      </div>
                      <button
                        onClick={() => downloadFile(item.url, `instagram-video-${index + 1}.mp4`)}
                        className="w-full py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors duration-200"
                      >
                        Download Video {index + 1}
                      </button>
                    </div>
                  ))}
                </div>
              )} */}
            </div>
          )}

          {/* Instructions */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-2">How to use:</h3>
            <ol className="list-decimal list-inside space-y-1 text-sm text-gray-600">
              <li>Copy the Instagram post URL from your browser</li>
              <li>Paste it in the input field above</li>
              <li>Click Download and wait for the video to load</li>
              <li>Click the download button to save the video</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );


}