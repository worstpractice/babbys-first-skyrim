import { createAmbientLight } from 'src/game/world/createAmbientLight';
import { createDirectionalLight } from 'src/game/world/createDirectionalLight';
import { createGroundPlane } from 'src/game/world/createGroundPlane';
import type { Scene } from 'three';

const thingsToAddToScene = [
  //
  createGroundPlane,
  createAmbientLight,
  createDirectionalLight,
] as const;

export const populateWorld = (scene: Scene): void => {
  for (const createFn of thingsToAddToScene) {
    const thing = createFn();

    scene.add(thing);
  }
};
