// Storage utilities for shortened URLs and analytics
const STORAGE_KEY = 'shortenedUrls';

export function getAllShortenedUrls() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

export function saveShortenedUrl(urlObj) {
  const urls = getAllShortenedUrls();
  urls.push(urlObj);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(urls));
}

export function getShortenedUrlByCode(code) {
  const urls = getAllShortenedUrls();
  const now = new Date();
  return urls.find(u => u.shortcode === code && new Date(u.expiresAt) > now);
}

export function updateClicksForShortcode(code, clickObj) {
  const urls = getAllShortenedUrls();
  const idx = urls.findIndex(u => u.shortcode === code);
  if (idx !== -1) {
    urls[idx].clicks.push(clickObj);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(urls));
  }
}
