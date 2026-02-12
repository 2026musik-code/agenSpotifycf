import React from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';

export default function Player({ currentSong, isPlaying, onPlayPause }) {
  if (!currentSong) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#181818] border-t border-[#282828] h-20 md:h-24 px-4 flex items-center justify-between z-50">
      {/* Song Info */}
      <div className="flex items-center w-1/3">
        <div className="w-12 h-12 md:w-14 md:h-14 bg-gray-800 flex-shrink-0 mr-4 rounded shadow-lg overflow-hidden">
             {/* Placeholder for album art since API doesn't provide it */}
             <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-green-700 to-black text-xs text-white">
                <span className="font-bold text-lg">{currentSong.name.charAt(0)}</span>
             </div>
        </div>
        <div className="truncate pr-4">
          <div className="text-white text-sm font-medium truncate hover:underline cursor-pointer">
            {currentSong.name}
          </div>
          <div className="text-gray-400 text-xs hover:underline cursor-pointer">
            {currentSong.artists}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col items-center w-1/3">
        <div className="flex items-center space-x-4 md:space-x-6 mb-1 md:mb-2">
          <button className="text-gray-400 hover:text-white transition">
            <SkipBack size={20} fill="currentColor" />
          </button>
          <button
            onClick={onPlayPause}
            className="bg-white rounded-full p-2 hover:scale-105 transition active:scale-95 flex items-center justify-center"
          >
            {isPlaying ? (
              <Pause size={20} fill="black" className="text-black" />
            ) : (
              <Play size={20} fill="black" className="text-black ml-1" />
            )}
          </button>
          <button className="text-gray-400 hover:text-white transition">
            <SkipForward size={20} fill="currentColor" />
          </button>
        </div>
        <div className="w-full hidden md:flex items-center space-x-2 text-xs text-gray-400">
           <span>0:00</span>
           <div className="h-1 bg-gray-600 rounded-full flex-1 group cursor-pointer">
             <div className="h-1 bg-white rounded-full w-1/3 group-hover:bg-green-500"></div>
           </div>
           <span>3:30</span>
        </div>
      </div>

      {/* Volume / Extra */}
      <div className="flex items-center justify-end w-1/3 space-x-2 md:space-x-4">
        <Volume2 size={20} className="text-gray-400 hidden md:block" />
        <div className="w-24 h-1 bg-gray-600 rounded-full hidden md:block">
           <div className="h-1 bg-gray-400 rounded-full w-1/2 hover:bg-green-500"></div>
        </div>
        <a href={currentSong.url} target="_blank" rel="noreferrer" className="text-green-500 text-xs border border-green-500 px-3 py-1 rounded hover:bg-green-500 hover:text-white transition whitespace-nowrap">
            Open Spotify
        </a>
      </div>
    </div>
  );
}
