#!/usr/bin/env ts-node
/**
 * quickjs-emscripten exposes an export for the .wasm file, but Cloudflare refuses to accept it.
 * Cloudflare's build system only allows importing .wasm files using a relative path.
 * Github issue: https://github.com/cloudflare/workers-sdk/issues/1672
 *
 * Instead the easy way out is to just copy the .wasm files we need into the build directory.
 * Once there, we can import them and use them to make a new quickjs variant.
 */

import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';

const VARIANTS = [
  'RELEASE_SYNC'
];

for (const VARIANT of VARIANTS) {
  const kebab = VARIANT.toLowerCase().replace('_', '-');
  
  const wasmFilePath = execSync(`node -p "require.resolve('@jitl/quickjs-wasmfile-${kebab}/wasm')"`)
    .toString()
    .trim();
  
  const destPath = path.join(`${VARIANT}.wasm`);
  fs.copyFileSync(wasmFilePath, destPath);
  console.log(`Copied ${wasmFilePath} to ${destPath}`);
  
  const mapFilePath = `${wasmFilePath}.map`;
  if (fs.existsSync(mapFilePath)) {
    const mapDestPath = path.join(`${VARIANT}.wasm.map.txt`);
    fs.copyFileSync(mapFilePath, mapDestPath);
    console.log(`Copied ${mapFilePath} to ${mapDestPath}`);
  }
}