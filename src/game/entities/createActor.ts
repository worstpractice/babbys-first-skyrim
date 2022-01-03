import { Body, Box, Vec3 } from 'cannon-es';
import { ObSet } from 'obset';
import type { Action } from 'src/game/typings/Action';
import type { Actor } from 'src/game/typings/Actor';
import type { Animation } from 'src/game/typings/Animation';
import type { Effect } from 'src/game/typings/Effect';
import type { Inventory } from 'src/game/typings/Inventory';
import type { Table } from 'src/game/typings/Table';
import { snitch } from 'src/views/utils/snitch';
import type { AnimationClip, Mesh } from 'three';
import { AnimationMixer, LoopOnce } from 'three';

type Props = {
  readonly inventory: Inventory;
  readonly mesh: Mesh;
  readonly mixers: AnimationMixer[];
  readonly nameClipDuos: readonly (readonly [Action, AnimationClip])[];
  readonly position: Vec3;
};

export const createActor = async ({ inventory, mesh, mixers, nameClipDuos, position }: Props): Promise<Actor> => {
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // * Create Mixer *
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const mixer = new AnimationMixer(mesh); // Every mesh has one mixer, every mixer has one mesh

  mixers.push(mixer);

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // * Create Action Clips *
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const entries = nameClipDuos.map(([action, animationClip]) => {
    animationClip.name = `${action}Clip` as const;

    const animationAction = mixer.clipAction(animationClip);

    const shouldLoopOnce = animationClip.name === 'jumpingClip' || animationClip.name === 'attackingClip';

    if (shouldLoopOnce) {
      animationAction.setLoop(LoopOnce, 1);
    }

    const animation: Animation = {
      animationAction,
      animationClip,
    } as const;

    return [action, animation] as const;
  });

  const animations: Table<Action, Animation> = Object.fromEntries(entries);

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // * Create Physics *
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const body = new Body({
    mass: 80, // kg
    position,
    shape: new Box(new Vec3(6, 12, 6)),
    type: Body.DYNAMIC,
  });

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // * Create ObSets *
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const actions = new ObSet<Action>()
    //
    .on('add', snitch)
    .on('delete', snitch);

  const effects = new ObSet<Effect>()
    //
    .on('add', snitch)
    .on('delete', snitch);

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // * Create Player *
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  return {
    actions,
    animations,
    body,
    effects,
    inventory,
    mesh,
    mixer,
  } as const;
};
