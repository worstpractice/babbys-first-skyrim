import { loadPlayerAnimations } from 'src/game/asset-loading/loadPlayerAnimations';
import { loadPlayerModel } from 'src/game/asset-loading/loadPlayerModel';
import { loadWeaponModel } from 'src/game/asset-loading/loadWeaponModel';
import type { AnimationMixer, LoadingManager, Scene } from 'three';

type Props = {
  readonly animationMixers: AnimationMixer[];
  readonly loadingManager: LoadingManager;
  readonly scene: Scene;
};

export const loadPlayerAssets = async ({ loadingManager, ...rest }: Props) => {
  // Loading player model must complete before loading weapon model may commence
  const playerModel = await loadPlayerModel({ ...rest, loadingManager });

  const promises = [
    //
    loadPlayerAnimations(loadingManager),
    loadWeaponModel(loadingManager, playerModel),
  ] as const;

  // Run in parallell, but purposefully ignore the 2nd result (which is void)
  const [nameClipDuos] = await Promise.all(promises);

  return nameClipDuos;
};
