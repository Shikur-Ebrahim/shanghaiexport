import { v2 as cloudinary, type UploadApiResponse, type UploadApiOptions } from "cloudinary";

/**
 * Server-only Cloudinary configuration and operations.
 * 
 * CRITICAL SECURITY NOTICE:
 * Cloudinary API Key and API Secret are restricted to server-side code only.
 * NEVER import this file into Client Components.
 */

const cloudName = process.env.CLOUDINARY_CLOUD_NAME || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
  secure: true,
});

export { cloudinary };

/**
 * Uploads media (images/videos) to Cloudinary from server actions or route handlers.
 */
export async function uploadMedia(
  file: string | Buffer,
  options: UploadApiOptions = {}
): Promise<UploadApiResponse> {
  if (!apiKey || !apiSecret) {
    throw new Error(
      "Missing CLOUDINARY_API_KEY or CLOUDINARY_API_SECRET server environment variables."
    );
  }

  return new Promise((resolve, reject) => {
    if (typeof file === "string") {
      cloudinary.uploader.upload(file, options, (error, result) => {
        if (error || !result) reject(error);
        else resolve(result);
      });
    } else {
      const uploadStream = cloudinary.uploader.upload_stream(options, (error, result) => {
        if (error || !result) reject(error);
        else resolve(result);
      });
      uploadStream.end(file);
    }
  });
}

/**
 * Deletes media from Cloudinary by public ID.
 */
export async function deleteMedia(
  publicId: string,
  options: { resource_type?: "image" | "video" | "raw" } = {}
) {
  if (!apiKey || !apiSecret) {
    throw new Error(
      "Missing CLOUDINARY_API_KEY or CLOUDINARY_API_SECRET server environment variables."
    );
  }

  return cloudinary.uploader.destroy(publicId, options);
}

/**
 * Generates an authenticated signature for secure client-side direct uploads.
 */
export function generateSignature(paramsToSign: Record<string, string | number>) {
  if (!apiSecret) {
    throw new Error("Missing CLOUDINARY_API_SECRET server environment variable.");
  }

  return cloudinary.utils.api_sign_request(paramsToSign, apiSecret);
}
