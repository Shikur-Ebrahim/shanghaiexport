import { NextRequest, NextResponse } from "next/server";
import { uploadToR2 } from "@/lib/r2/server";
import { getR2PublicUrl } from "@/lib/r2/client";

/**
 * Handles direct file uploads from the admin portal to Cloudflare R2.
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Sanitize filename and prefix with timestamp
    const cleanName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const key = `vehicles/${Date.now()}-${cleanName}`;

    await uploadToR2(key, buffer, file.type || "image/jpeg");

    const publicUrl = getR2PublicUrl(key);

    return NextResponse.json({
      success: true,
      key,
      url: publicUrl,
    });
  } catch (error: any) {
    console.error("R2 Upload error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to upload file to Cloudflare R2" },
      { status: 500 }
    );
  }
}
