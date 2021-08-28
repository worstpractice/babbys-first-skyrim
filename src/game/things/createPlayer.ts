import { Body, Box, Vec3 } from 'cannon-es';
import { ObSet } from 'obset';
import { loadPlayerAnimations } from 'src/game/asset-loading/loadPlayerAnimations';
import { loadPlayerModel } from 'src/game/asset-loading/loadPlayerModel';
import { loadWeaponModel } from 'src/game/asset-loading/loadWeaponModel';
import type { ActionClips } from 'src/game/typings/ActionClips';
import type { AnimationName } from 'src/game/typings/AnimationName';
import type { Effect } from 'src/game/typings/Effect';
import type { Player } from 'src/game/typings/Player';
import type { LoadingManager } from 'three';
import { AnimationMixer, LoopOnce } from 'three';

type Props = {
  readonly animationMixers: AnimationMixer[];
  readonly loadingManager: LoadingManager;
};

export const createPlayer = async ({ animationMixers, loadingManager }: Props): Promise<Player> => {
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // * Load Player Model *
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Loading player model must complete before loading weapon model may commence
  const model = await loadPlayerModel({ loadingManager }); // Every model has one mixer

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // * Create Player Mixer *
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const mixer = new AnimationMixer(model); // Every mixer has one model

  animationMixers.push(mixer);

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // * Load Player Assets *
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const promises = [
    //
    loadPlayerAnimations(loadingManager),
    loadWeaponModel(loadingManager, model),
  ] as const;

  // Run in parallell, but purposefully ignore the 2nd result (which is void)
  const [nameClipDuos] = await Promise.all(promises);

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // * Create Action Clips *
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const entries = nameClipDuos.map(([animationName, clip]) => {
    clip.name = `${animationName}Clip` as const;

    const action = mixer.clipAction(clip);

    const shouldLoopOnce = clip.name === 'jumpingClip' || clip.name === 'attackingClip';

    if (shouldLoopOnce) {
      action.setLoop(LoopOnce, 1);
    }

    return [animationName, { action, clip }] as const;
  });

  const actionClips: ActionClips = Object.fromEntries(entries);

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // * Create Physics *
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const body = new Body({
    mass: 10, // kg
    shape: new Box(new Vec3(5, 10, 5)),
  });

  const doNotLaunchIntoSpace = 35;

  body.position.set(model.position.x, model.position.y + doNotLaunchIntoSpace, model.position.z);

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // * Create Player *
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  return {
    actionClips,
    activeAnimations: new ObSet<AnimationName>(),
    activeEffects: new ObSet<Effect>(),
    body,
    mixer,
    model,
  } as const;
};
