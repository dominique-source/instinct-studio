import { existsSync } from "node:fs";
import path from "node:path";

/**
 * Checks a /public-relative path exists on disk. Server-only (build/render
 * time) — used to hide media areas gracefully instead of showing a
 * placeholder when an asset hasn't been added yet.
 */
export function publicFileExists(publicPath: string): boolean {
  const relative = publicPath.replace(/^\/+/, "");
  return existsSync(path.join(process.cwd(), "public", relative));
}
