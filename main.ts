// Entry for make.fun's "Sum up 20 November's world news in one image".
//
// The picture beside this file, entry.png, is a drawn front page of
// Friday 20 November 2026: Trump putting the Iran decision off to 2027,
// Putin's retaliation vow after the Shenzhen declaration, Europe offering
// Russia talks, Cyclone Akvan's landfall in Odisha, Hayabusa2's cancelled
// asteroid landing, and GTA 6's sales passing The Odyssey.
//
// This program does one deliberately plain thing: it reads entry.png,
// checks it is a whole PNG inside the 1 MiB cap, and writes those exact
// bytes to <output dir>/entry.png. Nothing is re-encoded, so two runs
// produce byte-identical output. The output dir is /output in the
// grading sandbox, or MAKEFUN_OUTPUT_DIR when run by hand:
//
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const PNG_SIGNATURE = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
const MAX_BYTES = 1024 * 1024;

function checkPng(bytes: Buffer): void {
  if (bytes.length > MAX_BYTES) {
    throw new Error(
      `entry.png is ${bytes.length} bytes, over the 1 MiB limit`
    );
  }
  const magicOk = PNG_SIGNATURE.every((b, i) => bytes[i] === b);
  if (!magicOk) {
    throw new Error("entry.png is not a PNG file");
  }
  // The IHDR chunk carries the pixel size right after its 8-byte header:
  // four bytes of width, then four of height, both big-endian.
  const width = bytes.readUInt32BE(16);
  const height = bytes.readUInt32BE(20);
  if (width > 1024 || height > 1024) {
    throw new Error(
      `entry.png is ${width}x${height}, over the 1024x1024 cap`
    );
  }
}

async function main(): Promise<void> {
  const here = dirname(fileURLToPath(import.meta.url));
  const picture = await readFile(resolve(here, "entry.png")).catch((err) => {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") {
      throw new Error("entry.png must sit beside main.ts");
    }
    throw err;
  });
  checkPng(picture);

  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  await mkdir(outDir, { recursive: true });
  const dest = resolve(outDir, "entry.png");
  await writeFile(dest, picture);
  console.log(`wrote ${dest} (${picture.length} bytes)`);
}

await main();
