import type { Uuid } from 'src/game/typings/brands/Uuid';

// @ts-expect-error this is solved by installing "@types/web", but alas, they lag with whole-project analysis enabled
export const uuid = (): Uuid => window.crypto.randomUUID() as Uuid;
