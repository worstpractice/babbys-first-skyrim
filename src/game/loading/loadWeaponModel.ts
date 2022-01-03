import { FACING_UPRIGHT } from 'src/game/constants/FACING_UPRIGHT';
import { ITEM_NAME } from 'src/game/constants/ITEM_NAME';
import { WEAPONS_PATH } from 'src/game/constants/WEAPONS_PATH';
import { FBXLoader } from 'src/game/shims/FbxLoader';
import { enableShadows } from 'src/game/utils/traverse/enableShadows';
import { enableSrgbEncoding } from 'src/game/utils/traverse/enableSrgbEncoding';
import { itemNameToModel } from 'src/views/lookup-tables/itemNameToModel';
import type { LoadingManager, Mesh } from 'three';
import { Vector3 } from 'three';

export const loadWeaponModel = async (loadingManager: LoadingManager, playerMesh: Mesh): Promise<void> => {
  const loader = new FBXLoader(loadingManager).setPath(WEAPONS_PATH);

  const mesh = (await loader.loadAsync(`${ITEM_NAME}.fbx`)) as any as Mesh;

  mesh.name = ITEM_NAME;
  mesh.scale.setScalar(0.021);
  mesh.traverse(enableShadows);
  mesh.traverse(enableSrgbEncoding);

  // Align to player
  mesh.rotateY(Math.PI);
  mesh.rotateX(FACING_UPRIGHT);
  mesh.rotateY(-1);
  mesh.position.add(new Vector3(-10, 13.37, -0.5));

  itemNameToModel[ITEM_NAME] = mesh;

  const [root] = playerMesh.children;

  root?.traverse((child): void => {
    if (child.name !== 'RightHandIndex1') return;

    child.attach(mesh);
  });

  // Hide for now, unhide via inventory equip
  mesh.visible = false;
};
