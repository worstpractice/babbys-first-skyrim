import { rm } from 'node:fs/promises';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const getProjectRoot = () => {
  // @ts-ignore
  return globalThis.__dirname || dirname(fileURLToPath(import.meta.url));
};

const nuke = async () => {
  await rm(`${getProjectRoot()}/node_modules/.cache/snowpack`, { recursive: true });
};

const noOp = () => {};

void nuke().catch(noOp);
