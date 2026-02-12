const IS_DEV = import.meta.env.DEV;

export async function getApiKey() {
  if (IS_DEV) {
    return localStorage.getItem("spotify_apikey") || "";
  }
  try {
    const res = await fetch("/api/settings");
    if (!res.ok) throw new Error("Failed to fetch");
    const data = await res.json();
    return data.apikey || "";
  } catch (e) {
    console.warn("Using localStorage fallback due to error:", e);
    return localStorage.getItem("spotify_apikey") || "";
  }
}

export async function saveApiKey(key) {
  if (IS_DEV) {
    localStorage.setItem("spotify_apikey", key);
    return true;
  }
  try {
    const res = await fetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ apikey: key }),
    });
    if (!res.ok) throw new Error("Failed to save");
    // Also save to local storage for instant feedback/cache
    localStorage.setItem("spotify_apikey", key);
    return true;
  } catch (e) {
    console.error("Failed to save to R2:", e);
    localStorage.setItem("spotify_apikey", key);
    return false;
  }
}
