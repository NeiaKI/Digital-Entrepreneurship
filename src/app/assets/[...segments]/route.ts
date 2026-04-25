import fs from "node:fs/promises";
import path from "node:path";

const ASSET_ROOT = path.resolve(process.cwd(), "3D-ASSET");

const MIME_TYPES: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".blend": "application/octet-stream",
};

type RouteContext = {
  params: Promise<{ segments: string[] }>;
};

export async function GET(_request: Request, { params }: RouteContext) {
  const { segments } = await params;

  if (!segments || segments.length === 0) {
    return new Response("Asset path is required", { status: 400 });
  }

  const decodedSegments = segments.map((s) => decodeURIComponent(s));
  const resolvedPath = path.resolve(ASSET_ROOT, ...decodedSegments);

  if (!resolvedPath.startsWith(ASSET_ROOT + path.sep) && resolvedPath !== ASSET_ROOT) {
    return new Response("Invalid asset path", { status: 400 });
  }

  const ext = path.extname(resolvedPath).toLowerCase();
  const mimeType = MIME_TYPES[ext];

  if (!mimeType) {
    return new Response("Unsupported file type", { status: 415 });
  }

  try {
    const fileBuffer = await fs.readFile(resolvedPath);

    const headers: Record<string, string> = {
      "Content-Type": mimeType,
      "Cache-Control": "public, max-age=86400",
    };

    if (ext === ".blend") {
      const filename = path.basename(resolvedPath);
      headers["Content-Disposition"] = `attachment; filename="${filename}"`;
    }

    return new Response(fileBuffer, { status: 200, headers });
  } catch {
    return new Response("Asset not found", { status: 404 });
  }
}
