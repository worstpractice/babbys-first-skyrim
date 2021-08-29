import { Body, Box, Vec3 } from 'cannon-es';
import { ObSet } from 'obset';
import { loadPlayerAnimations } from 'src/game/loading/loadPlayerAnimations';
import { loadPlayerModel } from 'src/game/loading/loadPlayerModel';
import { loadWeaponModel } from 'src/game/loading/loadWeaponModel';
import type { ActionClips } from 'src/game/typings/ActionClips';
import type { AnimationName } from 'src/game/typings/AnimationName';
import type { Effect } from 'src/game/typings/Effect';
import type { Player } from 'src/game/typings/Player';
import { snitch } from 'src/utils/snitch';
import type { LoadingManager } from 'three';
import { AnimationMixer, LoopOnce } from 'three';

type Props = {
  readonly loadingManager: LoadingManager;
  readonly mixers: AnimationMixer[];
};

export const createPlayer = async ({ loadingManager, mixers }: Props): Promise<Player> => {
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // * Load Model *
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Loading player model must complete before loading weapon model may commence
  const model = await loadPlayerModel({ loadingManager }); // Every model has one mixer

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // * Create Mixer *
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const mixer = new AnimationMixer(model); // Every mixer has one model

  mixers.push(mixer);

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // * Load Assets *
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
    mass: 80, // kg
    position: new Vec3(0, 20, 0),
    shape: new Box(new Vec3(6, 12, 6)),
    type: Body.DYNAMIC,
  });

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // * Create Player *
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  return {
    actionClips,
    activeAnimations: new ObSet<AnimationName>()
      //
      .on('add', snitch)
      .on('delete', snitch),
    activeEffects: new ObSet<Effect>()
      //
      .on('add', snitch)
      .on('delete', snitch),
    body,
    mixer,
    model,
  } as const;
};
