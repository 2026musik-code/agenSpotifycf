import React, { useState, useEffect } from 'react';
import { Volume2, X } from 'lucide-react';

export default function Player({ currentSong, isPlaying, onPlayPause }) {
  if (!currentSong) return null;

  // Extract track ID from URL
  const trackId = currentSong.url.split('/').pop().split('?')[0];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-[#282828] h-20 md:h-24 px-4 flex items-center justify-between z-50">
      {/* If we have a track ID, use the embed */}
      {trackId ? (
        <div className="w-full h-full flex items-center justify-center">
             <iframe
                src={`https://open.spotify.com/embed/track/${trackId}?utm_source=generator&theme=0`}
                width="100%"
                height="80"
                frameBorder="0"
                allowfullscreen=""
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="rounded-lg"
             ></iframe>
        </div>
      ) : (
        // Fallback (should not happen if URL is valid)
        <div className="text-white text-center w-full">
            Could not play song.
        </div>
      )}
    </div>
  );
}
