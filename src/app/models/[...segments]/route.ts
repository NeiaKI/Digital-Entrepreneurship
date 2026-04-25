import fs from "node:fs/promises";
import path from "node:path";

const ASSET_ROOT = path.resolve(process.cwd(), "3D-ASSET");

type RouteContext = {
  params: Promise<{ segments: string[] }>;
};

export async function GET(_request: Request, { params }: RouteContext) {
  const { segments } = await params;

  if (!segments || segments.length === 0) {
    return new Response("Asset path is required", { status: 400 });
  }

  const decodedSegments = segments.map((segment) => decodeURIComponent(segment));
  const resolvedPath = path.resolve(ASSET_ROOT, ...decodedSegments);

  if (!resolvedPath.startsWith(ASSET_ROOT)) {
    return new Response("Invalid asset path", { status: 400 });
  }

  if (path.extname(resolvedPath).toLowerCase() !== ".glb") {
    return new Response("Unsupported asset type", { status: 415 });
  }

  try {
    const fileBuffer = await fs.readFile(resolvedPath);

    return new Response(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": "model/gltf-binary",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch {
    return new Response("Asset not found", { status: 404 });
  }
}
