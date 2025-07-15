// Validation utilities for URL and shortcode
export function isValidUrl(url) {
  try {
    // Accepts http/https URLs only
    const u = new URL(url);
    return u.protocol === 'http:' || u.protocol === 'https:';
  } catch {
    return false;
  }
}

export function isValidShortcode(code) {
  // Alphanumeric, 4-12 chars
  return /^[a-zA-Z0-9]{4,12}$/.test(code);
}

export function generateShortcode(length = 6) {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}
