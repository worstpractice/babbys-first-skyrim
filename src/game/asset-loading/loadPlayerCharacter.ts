import { populateAnimationsTable } from 'src/game/animations/populateAnimationsTable';
import { loadPlayerAssets } from 'src/game/asset-loading/loadPlayerAssets';
import type { Actions } from 'src/game/typings/Actions';
import type { Player } from 'src/game/typings/Player';
import type { AnimationMixer, LoadingManager, Scene } from 'three';

type Props = {
  readonly actions: Actions;
  readonly animationMixers: AnimationMixer[];
  readonly loadingManager: LoadingManager;
  readonly player: Player;
  readonly scene: Scene;
};

export const loadPlayerCharacter = async (props: Props): Promise<void> => {
  const { player } = props;

  const nameClipDuos = await loadPlayerAssets(props);

  for (const [name, clip] of nameClipDuos) {
    populateAnimationsTable(name, clip, player);
  }
};
