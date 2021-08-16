import { populateAnimationsTable } from 'src/game/animations/populateAnimationsTable';
import { loadPlayerAssets } from 'src/game/asset-loading/loadPlayerAssets';
import { startIdling } from 'src/game/cascade/animations/idling';
import type { NameClipDuo } from 'src/game/typings/NameClipDuo';
import type { AnimationMixer, LoadingManager, Scene } from 'three';

type Props = {
  readonly animationMixers: AnimationMixer[];
  readonly loadingManager: LoadingManager;
  readonly scene: Scene;
};

export const loadPlayerCharacter = async (props: Props): Promise<void> => {
  const nameClipDuos: readonly NameClipDuo[] = await loadPlayerAssets(props);

  for (const [name, clip] of nameClipDuos) {
    await populateAnimationsTable(name, clip);
  }

  startIdling();
};
