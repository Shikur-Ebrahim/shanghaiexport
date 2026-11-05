/**
 * Client-safe Cloudinary helper utilities.
 * 
 * IMPORTANT: Never import server-side SDK or secret keys here.
 * This file only relies on the public cloud name to construct media URLs.
 */

export const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "";

export interface CloudinaryUrlOptions {
  width?: number;
  height?: number;
  crop?: "fill" | "fit" | "scale" | "thumb" | "limit";
  quality?: "auto" | number;
  format?: "auto" | "webp" | "avif" | "png" | "jpg";
  resourceType?: "image" | "video";
}

/**
 * Builds a secure Cloudinary delivery URL for client-side rendering.
 */
export function getCloudinaryUrl(
  publicId: string,
  options: CloudinaryUrlOptions = {}
): string {
  if (!CLOUDINARY_CLOUD_NAME) {
    console.warn("NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME is not set.");
    return publicId;
  }

  // If already a full URL, return as-is
  if (publicId.startsWith("http://") || publicId.startsWith("https://")) {
    return publicId;
  }

  const {
    width,
    height,
    crop = "limit",
    quality = "auto",
    format = "auto",
    resourceType = "image",
  } = options;

  const transformations: string[] = [`f_${format}`, `q_${quality}`];
  if (width) transformations.push(`w_${width}`);
  if (height) transformations.push(`h_${height}`);
  if (width || height) transformations.push(`c_${crop}`);

  const transformString = transformations.join(",");
  const cleanId = publicId.replace(/^\//, "");

  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/${resourceType}/upload/${transformString}/${cleanId}`;
}
