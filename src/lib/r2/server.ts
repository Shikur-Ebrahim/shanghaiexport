import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

/**
 * Server-only Cloudflare R2 S3 Client configuration.
 *
 * CRITICAL SECURITY NOTICE:
 * R2 Access Key ID and Secret Access Key are restricted to server-side code only.
 * NEVER import this file into Client Components.
 */

const accountId = process.env.R2_ACCOUNT_ID;
const accessKeyId = process.env.R2_ACCESS_KEY_ID;
const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
export const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME || "shanghaiexport";

const endpoint =
  process.env.R2_ENDPOINT ||
  (accountId ? `https://${accountId}.r2.cloudflarestorage.com` : undefined);

export const r2Client = new S3Client({
  region: "auto",
  endpoint,
  credentials:
    accessKeyId && secretAccessKey
      ? {
          accessKeyId,
          secretAccessKey,
        }
      : undefined,
});

/**
 * Uploads a file buffer directly to Cloudflare R2 from server actions or route handlers.
 */
export async function uploadToR2(
  key: string,
  body: Buffer | Uint8Array | string,
  contentType?: string
) {
  if (!accessKeyId || !secretAccessKey) {
    throw new Error("Missing R2_ACCESS_KEY_ID or R2_SECRET_ACCESS_KEY environment variables.");
  }

  const cleanKey = key.replace(/^\//, "");

  const command = new PutObjectCommand({
    Bucket: R2_BUCKET_NAME,
    Key: cleanKey,
    Body: body,
    ContentType: contentType,
  });

  return r2Client.send(command);
}

/**
 * Deletes an object from Cloudflare R2 by key.
 */
export async function deleteFromR2(key: string) {
  if (!accessKeyId || !secretAccessKey) {
    throw new Error("Missing R2_ACCESS_KEY_ID or R2_SECRET_ACCESS_KEY environment variables.");
  }

  const cleanKey = key.replace(/^\//, "");

  const command = new DeleteObjectCommand({
    Bucket: R2_BUCKET_NAME,
    Key: cleanKey,
  });

  return r2Client.send(command);
}

/**
 * Generates a presigned URL allowing the frontend to upload directly to R2
 * without passing the large file payload through the Next.js server.
 */
export async function getPresignedUploadUrl(
  key: string,
  contentType: string,
  expiresInSeconds: number = 3600
): Promise<string> {
  if (!accessKeyId || !secretAccessKey) {
    throw new Error("Missing R2_ACCESS_KEY_ID or R2_SECRET_ACCESS_KEY environment variables.");
  }

  const cleanKey = key.replace(/^\//, "");

  const command = new PutObjectCommand({
    Bucket: R2_BUCKET_NAME,
    Key: cleanKey,
    ContentType: contentType,
  });

  return getSignedUrl(r2Client, command, { expiresIn: expiresInSeconds });
}
