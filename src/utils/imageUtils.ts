/**
 * Normalizes image URLs to ensure they're absolute and accessible
 * Handles both relative paths and absolute URLs
 */
export const normalizeImageUrl = (url: string | null | undefined): string => {
  if (!url || url.trim() === '') {
    return ''; // Return empty string for missing images
  }

  const trimmedUrl = url.trim();

  // If it's a data URL (base64), return as is
  if (trimmedUrl.startsWith('data:')) {
    return trimmedUrl;
  }

  // If already absolute URL (http/https), fix port if needed
  if (trimmedUrl.startsWith('http://') || trimmedUrl.startsWith('https://')) {
    // Fix common issue: http://localhost should be http://localhost:8000
    if (trimmedUrl.startsWith('http://localhost/storage/') || trimmedUrl.startsWith('http://localhost:8000/storage/')) {
      return trimmedUrl.replace('http://localhost/storage/', 'http://localhost:8000/storage/');
    }
    return trimmedUrl;
  }

  // If it starts with /storage, make it absolute
  if (trimmedUrl.startsWith('/storage/')) {
    return `http://localhost:8000${trimmedUrl}`;
  }

  // If it starts with storage/, add the base URL
  if (trimmedUrl.startsWith('storage/')) {
    return `http://localhost:8000/${trimmedUrl}`;
  }

  // For relative paths, assume they're in storage
  if (trimmedUrl.startsWith('/')) {
    return `http://localhost:8000${trimmedUrl}`;
  }

  // Otherwise, prepend storage path
  return `http://localhost:8000/storage/${trimmedUrl}`;
};
