import type { Material, World } from 'cannon-es';
import { THINGS } from 'src/game/tables/THINGS';
import type { Thing } from 'src/game/typings/Thing';
import type { AmbientLight, DirectionalLight, Scene } from 'three';

type Props = {
  readonly constructors: {
    readonly things: readonly ((this: void) => Thing)[];
    readonly lights: readonly ((this: void) => AmbientLight | DirectionalLight)[];
  };
  readonly physicsMaterial: Material;
  readonly scene: Scene;
  readonly world: World;
};

export const populate = ({ constructors, physicsMaterial, scene, world }: Props): void => {
  const { lights, things } = constructors;

  for (const constructor of lights) {
    const light = constructor();

    scene.add(light);
  }

  for (const constructor of things) {
    const thing = constructor();

    THINGS.add(thing);

    const { body, model } = thing;

    body.material = physicsMaterial;

    scene.add(model);
    world.addBody(body);
  }
};
