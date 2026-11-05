/**
 * Client-safe Cloudflare R2 helper utilities.
 *
 * IMPORTANT: Never import server-side SDK or secret keys here.
 * This file only relies on the public R2 dev/custom URL to construct media links.
 */

export const R2_PUBLIC_URL = process.env.NEXT_PUBLIC_R2_PUBLIC_URL || "";

/**
 * Returns the public delivery URL for an object stored in Cloudflare R2.
 */
export function getR2PublicUrl(key: string): string {
  if (!key) return "";

  // If already a full URL, return as-is
  if (key.startsWith("http://") || key.startsWith("https://")) {
    return key;
  }

  const cleanKey = key.replace(/^\//, "");
  return `${R2_PUBLIC_URL.replace(/\/$/, "")}/${cleanKey}`;
}
