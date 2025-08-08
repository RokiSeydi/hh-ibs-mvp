import { useEffect, useState } from 'react';
import { PlayCircle } from 'lucide-react';

interface TikTokEmbedProps {
  url: string;
  className?: string;
}

export function TikTokEmbed({ url, className = "" }: TikTokEmbedProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Simulate loading time and then show fallback
    const timer = setTimeout(() => {
      setLoading(false);
      setError(true); // Always show fallback due to CSP issues
    }, 1000);

    return () => clearTimeout(timer);
  }, [url]);

  if (loading) {
    return (
      <div className={`flex items-center justify-center bg-gray-100 ${className}`}>
        <div className="text-center">
          <PlayCircle className="h-16 w-16 text-gray-400 mx-auto mb-2 animate-pulse" />
          <p className="text-gray-500 text-sm">Loading TikTok...</p>
        </div>
      </div>
    );
  }

  // Always show fallback for now due to CSP restrictions
  return (
    <div className={`flex items-center justify-center bg-gradient-to-br from-pink-500 to-purple-600 ${className}`}>
      <div className="text-center text-white p-6">
        <PlayCircle className="h-16 w-16 mx-auto mb-3 opacity-90" />
        <p className="font-semibold text-lg mb-2">TikTok Video</p>
        <p className="text-sm mb-4 opacity-90">Tap to watch on TikTok</p>
        <a 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-white text-purple-600 px-4 py-2 rounded-lg font-semibold hover:bg-opacity-90 transition-all inline-flex items-center space-x-2"
        >
          <span>Watch Video</span>
          <PlayCircle className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
