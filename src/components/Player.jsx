import React from 'react';
import { Disc } from 'lucide-react';

export default function Player({ currentSong }) {
  if (!currentSong) return null;

  // Extract track ID from URL safely
  let trackId = '';
  try {
      const parts = currentSong.url.split('/');
      trackId = parts[parts.length - 1].split('?')[0];
  } catch (e) {
      console.error("Invalid URL", currentSong.url);
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/95 backdrop-blur-md border-t border-[#282828] h-24 px-4 py-2 flex items-center gap-4 z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.5)]">

      {/* Animated Logo (Visible on desktop and larger mobile screens if space permits) */}
      <div className="hidden sm:flex items-center justify-center w-16 h-16 flex-shrink-0">
         <div className="animate-[spin_4s_linear_infinite] w-full h-full rounded-full bg-gradient-to-tr from-green-500 via-green-900 to-black p-[2px] shadow-lg shadow-green-500/20">
            <div className="w-full h-full rounded-full bg-[#121212] flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/vinyl.png')] opacity-30 mix-blend-overlay"></div>
                <Disc size={32} className="text-green-500 relative z-10" />
            </div>
         </div>
      </div>

      {/* Player Content */}
      <div className="flex-1 h-full flex items-center justify-center">
         {trackId ? (
            <iframe
                src={`https://open.spotify.com/embed/track/${trackId}?utm_source=generator&theme=0`}
                width="100%"
                height="80"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="rounded-xl shadow-inner bg-[#121212]"
                style={{ borderRadius: '12px' }}
             ></iframe>
         ) : (
            <div className="text-gray-400 text-sm text-center w-full">
                Unable to load player for this track.
            </div>
         )}
      </div>
    </div>
  );
}
