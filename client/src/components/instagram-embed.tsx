import { useEffect, useState } from "react";
import { PlayCircle } from "lucide-react";

interface InstagramEmbedProps {
  url: string;
  className?: string;
}

export function InstagramEmbed({ url, className = "" }: InstagramEmbedProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time and then show fallback
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [url]);

  if (loading) {
    return (
      <div className={`flex items-center justify-center bg-gray-100 ${className}`}>
        <div className="text-center">
          <PlayCircle className="h-16 w-16 text-gray-400 mx-auto mb-2 animate-pulse" />
          <p className="text-gray-500 text-sm">Loading Instagram...</p>
        </div>
      </div>
    );
  }

  // Show fallback due to CSP restrictions
  return (
    <div className={`flex items-center justify-center bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-600 ${className}`}>
      <div className="text-center text-white p-6">
        <PlayCircle className="h-16 w-16 mx-auto mb-3 opacity-90" />
        <p className="font-semibold text-lg mb-2">Instagram Video</p>
        <p className="text-sm mb-4 opacity-90">Tap to watch on Instagram</p>
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
