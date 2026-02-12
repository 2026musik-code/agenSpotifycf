import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Search, Settings, Music } from 'lucide-react';
import Player from './Player';

export default function Layout({ currentSong, isPlaying, onPlayPause }) {
  const location = useLocation();

  const navItems = [
    { icon: Search, label: "Search", path: "/" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  return (
    <div className="flex flex-col h-screen bg-black text-white font-sans overflow-hidden">
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-black flex flex-col p-6 gap-y-4 hidden md:flex border-r border-[#282828]">
            <div className="flex items-center gap-x-2 mb-6 px-2 text-white">
                <Music size={32} className="text-green-500" />
                <span className="text-xl font-bold tracking-tight">Agent Spotify</span>
            </div>

            <nav className="flex flex-col gap-y-2">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;
                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-x-4 px-4 py-3 rounded transition font-medium ${isActive ? 'bg-[#282828] text-white' : 'text-gray-400 hover:text-white'}`}
                        >
                            <Icon size={24} />
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            <div className="mt-auto px-4 py-4">
               <div className="text-xs text-gray-500">© 2024 AGENT SPOTIFY CF</div>
            </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-[#121212] overflow-y-auto relative custom-scrollbar w-full">
            {/* Mobile Header */}
            <div className="md:hidden flex items-center justify-between p-4 bg-black sticky top-0 z-40 border-b border-[#282828]">
                <div className="flex items-center gap-x-2">
                    <Music size={24} className="text-green-500" />
                    <span className="text-lg font-bold">Agent Spotify</span>
                </div>
                 <div className="flex gap-x-4">
                    <Link to="/" className={location.pathname === '/' ? 'text-white' : 'text-gray-400'}><Search size={24} /></Link>
                    <Link to="/settings" className={location.pathname === '/settings' ? 'text-white' : 'text-gray-400'}><Settings size={24} /></Link>
                 </div>
            </div>

            <div className="p-4 md:p-8 pb-32 min-h-full">
                 <Outlet />
            </div>
        </main>
      </div>

      {/* Player Bar */}
      {currentSong && (
        <div className="absolute bottom-0 w-full z-50">
             <Player currentSong={currentSong} isPlaying={isPlaying} onPlayPause={onPlayPause} />
        </div>
      )}
    </div>
  );
}
