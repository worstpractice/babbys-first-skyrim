import { CHARACTERS_PATH } from 'src/game/constants/CHARACTERS_PATH';
import { FBXLoader } from 'src/game/shims/FbxLoader';
import { enableShadows } from 'src/game/utils/mapping/enableShadows';
import { enableSrgbEncoding } from 'src/game/utils/mapping/enableSrgbEncoding';
import type { Group, LoadingManager } from 'three';

type Props = {
  readonly loadingManager: LoadingManager;
};

export const loadPlayerModel = async ({ loadingManager }: Props): Promise<Group> => {
  const loader = new FBXLoader(loadingManager);

  loader.setPath(CHARACTERS_PATH);

  const model = await loader.loadAsync('castle-guard.fbx');

  model.name = 'playerModel';
  model.scale.setScalar(0.09);

  model.traverse(enableShadows);
  model.traverse(enableSrgbEncoding);

  return model;
};
