import type { World } from 'cannon-es';
import { ObSet } from 'obset';
import type { GameObject } from 'src/game/typings/GameObject';
import type { Level } from 'src/typings/Level';
import type { AmbientLight, DirectionalLight, Scene } from 'three';

type Props = {
  readonly constructors: {
    readonly gameObjects: readonly ((this: void) => GameObject)[];
    readonly lights: readonly ((this: void) => AmbientLight | DirectionalLight)[];
  };
  readonly scene: Scene;
  readonly world: World;
};

export const createLevel = ({ constructors, scene, world }: Props): Level => {
  const gameObjects = new ObSet<GameObject>();

  /////////////////////////////////////////////////////////////////////////////
  // * Lights *
  /////////////////////////////////////////////////////////////////////////////
  for (const constructor of constructors.lights) {
    const light = constructor();

    scene.add(light);
  }

  /////////////////////////////////////////////////////////////////////////////
  // * GameObjects *
  /////////////////////////////////////////////////////////////////////////////
  for (const constructor of constructors.gameObjects) {
    const gameObject = constructor();

    gameObjects.add(gameObject);

    const { body, model } = gameObject;

    scene.add(model);
    world.addBody(body);
  }

  /////////////////////////////////////////////////////////////////////////////

  return {
    gameObjects,
    scene,
    world,
  };
};
