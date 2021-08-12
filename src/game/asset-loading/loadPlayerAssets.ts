import { loadPlayerAnimations } from "src/game/asset-loading/loadPlayerAnimations";
import { loadPlayerModel } from "src/game/asset-loading/loadPlayerModel";
import { loadWeaponModel } from "src/game/asset-loading/loadWeaponModel";
import type { NameClipDuo } from "src/game/typings/NameClipDuo";
import type { LoadingManager, Scene } from "three";

export const loadPlayerAssets = async (loadingManager: LoadingManager, scene: Scene): Promise<readonly NameClipDuo[]> => {
  // Loading player model must complete before loading weapon model may commence
  const playerModel = await loadPlayerModel(loadingManager, scene);

  const promises = [loadPlayerAnimations(loadingManager), loadWeaponModel(playerModel)] as const;

  // Run in parallell, but purposefully ignore the 2nd result (which is void)
  const [nameClipDuos] = await Promise.all(promises);

  return nameClipDuos;
};
