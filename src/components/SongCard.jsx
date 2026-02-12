import React from 'react';
import { PlayCircle } from 'lucide-react';

export default function SongCard({ song, playSong }) {
  if (!song) return null;

  return (
    <div
        className="bg-[#181818] p-4 rounded-lg hover:bg-[#282828] transition group cursor-pointer flex flex-col h-full"
        onClick={() => playSong(song)}
    >
        <div className="aspect-square bg-gray-800 mb-4 rounded shadow-lg relative overflow-hidden w-full flex items-center justify-center">
                {/* Art Placeholder */}
                <div className={`absolute inset-0 flex items-center justify-center bg-gradient-to-br text-6xl font-bold text-white select-none from-green-700 to-black`}>
                {song.name ? song.name.charAt(0).toUpperCase() : '?'}
                </div>

                {/* Hover Play Button */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-end justify-end p-2 translate-y-2 group-hover:translate-y-0 duration-300">
                <div className="bg-green-500 rounded-full p-3 shadow-xl hover:scale-105 transition text-black mb-2 mr-2">
                    <PlayCircle size={28} fill="black" />
                </div>
                </div>
        </div>
        <h3 className="font-bold text-white truncate mb-1 text-base">{song.name}</h3>
        <p className="text-sm text-gray-400 truncate">{song.artists}</p>
    </div>
  );
}
