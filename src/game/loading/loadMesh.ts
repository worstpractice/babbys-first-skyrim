import type { FbxFileName } from 'src/game/typings/FbxFileName';
import { FBXLoader } from 'src/game/utils/shims/FbxLoader';
import { enableShadows } from 'src/game/utils/traverse/enableShadows';
import { enableSrgbEncoding } from 'src/game/utils/traverse/enableSrgbEncoding';
import type { ItemName } from 'src/views/typings/ItemName';
import type { MeshName } from 'src/views/typings/MeshName';
import type { LoadingManager, Mesh } from 'three';

type Props = {
  readonly fileName: FbxFileName;
  readonly filePath: `./assets/models/${string}/`;
  readonly loadingManager: LoadingManager;
  readonly name: ItemName | MeshName;
  readonly tweaks: readonly ((this: void, mesh: Mesh) => Mesh)[];
};

export const loadMesh = async ({ fileName, filePath, loadingManager, name, tweaks }: Props): Promise<Mesh> => {
  const loader = new FBXLoader(loadingManager).setPath(filePath);

  const mesh = (await loader.loadAsync(fileName)) as any as Mesh;

  mesh.name = name;
  mesh.traverse(enableShadows);
  mesh.traverse(enableSrgbEncoding);

  let result = mesh;

  for (const tweak of tweaks) {
    result = tweak(result);
  }

  return result;
};
