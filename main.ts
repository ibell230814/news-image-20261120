// make.fun entry: "Sum up 20 November's world news in one image".
//
// The image shipped next to this file, entry.png, is a drawn front page
// for Friday 20 November 2026. It carries six stories — Trump deferring
// the Iran decision past New Year, Putin's retaliation vow after the
// Shenzhen declaration, Europe offering Russia talks, Cyclone Akvan's
// landfall in Odisha, the end of Hayabusa2's asteroid-landing plan, and
// GTA 6's sales passing The Odyssey — plus a footer of secondary items.
//
// This program keeps things deliberately boring: it loads entry.png,
// checks that it really is a PNG within the size limits, and writes the
// very same bytes to <output dir>/entry.png. Nothing is re-encoded, so
// every run produces identical output. The grader writes to /output;
// by hand you can point it elsewhere with MAKEFUN_OUTPUT_DIR:
//
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const PNG_MAGIC = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
const MAX_BYTES = 1024 * 1024;
const MAX_SIDE = 1024;

function validatePng(bytes: Buffer): void {
  if (bytes.length === 0) {
    throw new Error("entry.png is empty");
  }
  if (bytes.length > MAX_BYTES) {
    throw new Error(
      `entry.png is ${bytes.length} bytes, above the ${MAX_BYTES}-byte cap`,
    );
  }
  const isPng = PNG_MAGIC.every((byte, index) => bytes[index] === byte);
  if (!isPng) {
    throw new Error("entry.png does not start with a PNG signature");
  }
  // Width and height live in the IHDR chunk: four big-endian bytes each,
  // starting 16 bytes into the file.
  const width = bytes.readUInt32BE(16);
  const height = bytes.readUInt32BE(20);
  if (width > MAX_SIDE || height > MAX_SIDE) {
    throw new Error(
      `entry.png is ${width}x${height}, above the ${MAX_SIDE}x${MAX_SIDE} cap`,
    );
  }
}

async function main(): Promise<void> {
  const here = dirname(fileURLToPath(import.meta.url));
  const picture = await readFile(resolve(here, "entry.png")).catch((error) => {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      throw new Error("entry.png must sit next to main.ts");
    }
    throw error;
  });
  validatePng(picture);

  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  await mkdir(outDir, { recursive: true });
  const dest = resolve(outDir, "entry.png");
  await writeFile(dest, picture);
  console.log(`wrote ${dest} (${picture.length} bytes)`);
}

await main();
