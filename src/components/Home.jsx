import React, { useState, useEffect } from 'react';
import { Loader } from 'lucide-react';
import { searchSpotify } from '../lib/api';
import { getApiKey } from '../lib/storage';
import SongCard from './SongCard';

export default function Home({ playSong }) {
  const [apiKey, setApiKey] = useState('');
  const [sections, setSections] = useState({
    madeForYou: [],
    popular: [],
    trending: []
  });
  const [loading, setLoading] = useState(true);

  // Get greeting based on time
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  useEffect(() => {
    async function loadData() {
      const key = await getApiKey();
      setApiKey(key);
      if (key) {
        // Fetch mock recommendations
        try {
            const [madeForYou, popular, trending] = await Promise.all([
                searchSpotify("Indonesian Pop", key),
                searchSpotify("Global Top Hits", key),
                searchSpotify("Trending Now", key)
            ]);

            setSections({
                madeForYou: Array.isArray(madeForYou) ? madeForYou.slice(0, 5) : [],
                popular: Array.isArray(popular) ? popular.slice(0, 5) : [],
                trending: Array.isArray(trending) ? trending.slice(0, 5) : []
            });
        } catch (e) {
            console.error("Failed to load home data", e);
        }
      }
      setLoading(false);
    }
    loadData();
  }, []);

  if (loading) {
     return (
        <div className="flex items-center justify-center h-full">
            <Loader className="animate-spin text-green-500" size={48} />
        </div>
     );
  }

  if (!apiKey) {
      return (
          <div className="p-8 text-center">
              <h1 className="text-2xl font-bold mb-4">Welcome to Agent Spotify</h1>
              <p className="text-gray-400 mb-4">Please go to Settings to enter your API Key and start listening.</p>
          </div>
      )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-8 text-white">{getGreeting()}</h1>

      {/* Section 1: Made For You */}
      {sections.madeForYou.length > 0 && (
          <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-white hover:underline cursor-pointer">Made For You</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                  {sections.madeForYou.map((song, i) => (
                      <SongCard key={i} song={song} playSong={playSong} />
                  ))}
              </div>
          </div>
      )}

      {/* Section 2: Popular Hits */}
      {sections.popular.length > 0 && (
          <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-white hover:underline cursor-pointer">Popular Hits</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                  {sections.popular.map((song, i) => (
                      <SongCard key={i} song={song} playSong={playSong} />
                  ))}
              </div>
          </div>
      )}

      {/* Section 3: Trending */}
      {sections.trending.length > 0 && (
          <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-white hover:underline cursor-pointer">Trending Now</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                  {sections.trending.map((song, i) => (
                      <SongCard key={i} song={song} playSong={playSong} />
                  ))}
              </div>
          </div>
      )}

      {sections.madeForYou.length === 0 && sections.popular.length === 0 && (
          <div className="text-center text-gray-400 mt-10">
              <p>No recommendations found. Try searching for songs!</p>
          </div>
      )}
    </div>
  );
}
