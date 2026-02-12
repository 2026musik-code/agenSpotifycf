import React, { useState, useEffect } from 'react';
import { Search as SearchIcon, PlayCircle, Loader } from 'lucide-react';
import { searchSpotify } from '../lib/api';
import { getApiKey } from '../lib/storage';

export default function Search({ playSong }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    getApiKey().then(setApiKey);
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    if (!apiKey) {
        alert("Please go to Settings and enter your API Key first.");
        return;
    }

    setLoading(true);
    setHasSearched(true);
    const data = await searchSpotify(query, apiKey);

    if (Array.isArray(data)) {
        setResults(data);
    } else {
        setResults([]);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-4">
      {/* Header / Search Bar */}
      <div className="mb-8 mt-4">
        <h1 className="text-3xl font-bold mb-6 text-white">Search</h1>
        <form onSubmit={handleSearch} className="relative w-full max-w-lg">
            <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="What do you want to listen to?"
                className="w-full bg-[#242424] text-white rounded-full py-3 pl-14 pr-6 text-lg focus:outline-none focus:ring-2 focus:ring-white transition placeholder-gray-400"
            />
        </form>
      </div>

      {/* Results */}
      <div>
        {loading ? (
            <div className="flex justify-center mt-20">
                <Loader className="animate-spin text-green-500" size={48} />
            </div>
        ) : (
            <>
                {results.length > 0 ? (
                    <div>
                        <h2 className="text-xl font-bold mb-4 text-white">Songs</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                            {results.map((song, index) => (
                                <div
                                    key={index}
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
                            ))}
                        </div>
                    </div>
                ) : (
                    hasSearched && (
                        <div className="text-center mt-20 text-gray-400">
                            <p className="text-xl text-white font-bold">No results found for "{query}"</p>
                            <p className="mt-2 text-sm">Please make sure your API Key is correct and try again.</p>
                        </div>
                    )
                )}

                {!hasSearched && (
                     <div className="text-center mt-20 text-gray-400 flex flex-col items-center">
                        <div className="flex justify-center mb-4 bg-[#181818] p-8 rounded-full">
                             <SearchIcon size={64} className="text-gray-600" />
                        </div>
                        <p className="text-xl font-bold text-white mb-2">Search for songs</p>
                        <p className="text-sm">Find your favorite music using the search bar above.</p>
                    </div>
                )}
            </>
        )}
      </div>
    </div>
  );
}
