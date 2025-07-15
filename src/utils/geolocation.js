// Geolocation utility (coarse, public API)
export async function getLocation() {
  try {
    const resp = await fetch('https://ipapi.co/json/');
    if (!resp.ok) return 'unknown';
    const data = await resp.json();
    return `${data.city || ''}, ${data.country_name || ''}`.trim();
  } catch {
    return 'unknown';
  }
}
