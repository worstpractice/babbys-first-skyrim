import { FBXLoader } from 'src/game/shims/FbxLoader';
import { enableShadows } from 'src/game/utils/mapping/enableShadows';
import { enableSrgbEncoding } from 'src/game/utils/mapping/enableSrgbEncoding';
import type { Group, LoadingManager } from 'three';

const CHARACTERS_PATH = './assets/models/castle-guard/' as const;

type Props = {
  readonly loadingManager: LoadingManager;
};

export const loadPlayerModel = async ({ loadingManager }: Props): Promise<Group> => {
  const modelLoader = new FBXLoader(loadingManager);

  modelLoader.setPath(CHARACTERS_PATH);

  const playerModel = await modelLoader.loadAsync('castle-guard.fbx');

  playerModel.name = 'playerModel';
  playerModel.scale.setScalar(0.09);

  playerModel.traverse(enableShadows);
  playerModel.traverse(enableSrgbEncoding);

  return playerModel;
};
