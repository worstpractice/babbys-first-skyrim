import { populateAnimationsTable } from 'src/game/animations/populateAnimationsTable';
import { loadPlayerAssets } from 'src/game/asset-loading/loadPlayerAssets';
import { startIdling } from 'src/game/cascade/animations/idling';
import type { NameClipDuo } from 'src/game/typings/NameClipDuo';
import type { LoadingManager, Scene } from 'three';

export const loadPlayerCharacter = async (loadingManager: LoadingManager, scene: Scene): Promise<void> => {
  const nameClipDuos: readonly NameClipDuo[] = await loadPlayerAssets(loadingManager, scene);

  for (const [name, clip] of nameClipDuos) {
    populateAnimationsTable(name, clip);
  }

  startIdling();
};
