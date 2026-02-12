import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
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
        <Route index element={<Search playSong={playSong} />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

export default App;
