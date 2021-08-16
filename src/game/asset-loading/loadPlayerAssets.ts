import { loadPlayerAnimations } from 'src/game/asset-loading/loadPlayerAnimations';
import { loadPlayerModel } from 'src/game/asset-loading/loadPlayerModel';
import { loadWeaponModel } from 'src/game/asset-loading/loadWeaponModel';
import type { Player } from 'src/game/typings/Player';
import type { AnimationMixer, LoadingManager, Scene } from 'three';

type Props = {
  readonly animationMixers: AnimationMixer[];
  readonly loadingManager: LoadingManager;
  readonly player: Player;
  readonly scene: Scene;
};

export const loadPlayerAssets = async (props: Props) => {
  const { loadingManager } = props;

  // Loading player model must complete before loading weapon model may commence
  const playerModel = await loadPlayerModel(props);

  const promises = [
    //
    loadPlayerAnimations(loadingManager),
    loadWeaponModel(loadingManager, playerModel),
  ] as const;

  // Run in parallell, but purposefully ignore the 2nd result (which is void)
  const [nameClipDuos] = await Promise.all(promises);

  return nameClipDuos;
};
