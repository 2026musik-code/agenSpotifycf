export async function searchSpotify(query, apiKey) {
  if (!query || !apiKey) return [];
  const url = `https://api.ferdev.my.id/search/spotify?query=${encodeURIComponent(query)}&apikey=${apiKey}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.status === 200 && data.result) {
      return data.result;
    }
    return [];
  } catch (error) {
    console.error("Error fetching spotify data:", error);
    return [];
  }
}
