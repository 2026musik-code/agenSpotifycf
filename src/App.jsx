import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import Search from './components/Search';
import Settings from './components/Settings';

function App() {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const playSong = (song) => {
    setCurrentSong(song);
    setIsPlaying(true);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <Routes>
      <Route path="/" element={<Layout currentSong={currentSong} isPlaying={isPlaying} onPlayPause={togglePlayPause} />}>
        <Route index element={<Home playSong={playSong} />} />
        <Route path="search" element={<Search playSong={playSong} />} />
        <Route path="settings" element={<Settings />} />
        {/* Placeholder for Library */}
        <Route path="library" element={
            <div className="p-8 text-center text-gray-400">
                <h1 className="text-2xl font-bold mb-4 text-white">Your Library</h1>
                <p>Save your favorite songs here (Coming Soon).</p>
            </div>
        } />
      </Route>
    </Routes>
  );
}

export default App;
