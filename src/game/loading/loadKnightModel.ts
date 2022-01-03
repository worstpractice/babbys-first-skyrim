import { CHARACTERS_PATH } from 'src/game/constants/CHARACTERS_PATH';
import { FBXLoader } from 'src/game/shims/FbxLoader';
import { enableShadows } from 'src/game/utils/traverse/enableShadows';
import { enableSrgbEncoding } from 'src/game/utils/traverse/enableSrgbEncoding';
import type { LoadingManager, Mesh } from 'three';

type Props = {
  readonly loadingManager: LoadingManager;
};

export const loadKnightModel = async ({ loadingManager }: Props): Promise<Mesh> => {
  const loader = new FBXLoader(loadingManager).setPath(CHARACTERS_PATH);

  const mesh = await loader.loadAsync('castle-guard.fbx');

  mesh.name = 'knightModel';
  mesh.scale.setScalar(0.09);

  mesh.traverse(enableShadows);
  mesh.traverse(enableSrgbEncoding);

  return mesh as any as Mesh;
};
