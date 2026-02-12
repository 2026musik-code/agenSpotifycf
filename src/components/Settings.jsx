import React, { useState, useEffect } from 'react';
import { getApiKey, saveApiKey } from '../lib/storage';
import { Save, Key } from 'lucide-react';

export default function Settings() {
  const [apiKey, setApiKey] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    getApiKey().then(setApiKey);
  }, []);

  const handleSave = async () => {
    setStatus('Saving...');
    const success = await saveApiKey(apiKey);
    if (success) {
      setStatus('Saved!');
      setTimeout(() => setStatus(''), 2000);
    } else {
      setStatus('Error saving.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-4">
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-2 text-white">
        <Key className="text-green-500" /> Settings
      </h1>

      <div className="bg-[#181818] p-8 rounded-lg shadow-lg border border-[#282828]">
        <label className="block text-sm font-medium text-gray-400 mb-2">
          API Key (api.ferdev.my.id)
        </label>
        <div className="flex gap-4 flex-col md:flex-row">
            <input
                type="text"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your API Key"
                className="flex-1 bg-[#121212] border border-[#333] rounded px-4 py-3 text-white focus:outline-none focus:border-green-500 transition"
            />
            <button
                onClick={handleSave}
                className="bg-green-500 text-black font-bold px-6 py-3 rounded hover:scale-105 transition flex items-center justify-center gap-2"
            >
                <Save size={20} />
                Save
            </button>
        </div>
        {status && (
            <p className={`mt-4 text-sm ${status.includes('Error') ? 'text-red-500' : 'text-green-500'}`}>
                {status}
            </p>
        )}
        <p className="mt-6 text-xs text-gray-500">
            The API Key is required to search for music. It will be stored securely in R2 (or localStorage in dev).
        </p>
      </div>
    </div>
  );
}
