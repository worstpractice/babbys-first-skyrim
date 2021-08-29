import type { World } from 'cannon-es';
import { ObSet } from 'obset';
import type { Thing } from 'src/game/typings/Thing';
import type { Level } from 'src/typings/Level';
import type { AmbientLight, DirectionalLight, Scene } from 'three';

type Props = {
  readonly constructors: {
    readonly things: readonly ((this: void) => Thing)[];
    readonly lights: readonly ((this: void) => AmbientLight | DirectionalLight)[];
  };
  readonly scene: Scene;
  readonly world: World;
};

export const createLevel = ({ constructors, scene, world }: Props): Level => {
  const things = new ObSet<Thing>();

  /////////////////////////////////////////////////////////////////////////////
  // * Lights *
  /////////////////////////////////////////////////////////////////////////////
  for (const constructor of constructors.lights) {
    const light = constructor();

    scene.add(light);
  }

  /////////////////////////////////////////////////////////////////////////////
  // * Things *
  /////////////////////////////////////////////////////////////////////////////
  for (const constructor of constructors.things) {
    const thing = constructor();

    things.add(thing);

    const { body, model } = thing;

    scene.add(model);
    world.addBody(body);
  }

  /////////////////////////////////////////////////////////////////////////////

  return {
    scene,
    things,
    world,
  };
};
