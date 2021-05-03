import { loadPlayerAnimations } from "./loadPlayerAnimations";
import { loadPlayerModel } from "./loadPlayerModel";
import { loadWeaponModel } from "./loadWeaponModel";
import type { NameClipDuo } from "../typings/NameClipDuo";

export const loadPlayerAssets = async (): Promise<readonly NameClipDuo[]> => {
  // Loading player model must complete before loading weapon model may commence
  const playerModel = await loadPlayerModel();

  const promises = [loadPlayerAnimations(), loadWeaponModel(playerModel)] as const;

  // Run in parallell, but purposefully ignore the 2nd result (which is void)
  const [nameClipDuos] = await Promise.all(promises);

  return nameClipDuos;
};
