import { FACING_UPRIGHT } from 'src/game/constants/FACING_UPRIGHT';
import { ITEM_NAME } from 'src/game/constants/ITEM_NAME';
import { WEAPONS_PATH } from 'src/game/constants/WEAPONS_PATH';
import { FBXLoader } from 'src/game/shims/FbxLoader';
import { enableShadows } from 'src/game/utils/mapping/enableShadows';
import { enableSrgbEncoding } from 'src/game/utils/mapping/enableSrgbEncoding';
import { itemNameToModel } from 'src/lookup-tables/itemNameToModel';
import type { Group, LoadingManager } from 'three';
import { Vector3 } from 'three';

export const loadWeaponModel = async (loadingManager: LoadingManager, playerModel: Group): Promise<void> => {
  const loader = new FBXLoader(loadingManager);

  loader.setPath(WEAPONS_PATH);

  const model = await loader.loadAsync(`${ITEM_NAME}.fbx`);

  model.name = ITEM_NAME;
  model.scale.setScalar(0.021);
  model.traverse(enableShadows);
  model.traverse(enableSrgbEncoding);

  // Align to player
  model.rotateY(Math.PI);
  model.rotateX(FACING_UPRIGHT);
  model.rotateY(-1);
  model.position.add(new Vector3(-10, 13.37, -0.5));

  itemNameToModel[ITEM_NAME] = model;

  const [root] = playerModel.children;

  root?.traverse((child): void => {
    if (child.name !== 'RightHandIndex1') return;

    child.attach(model);
  });

  // Hide for now, unhide via inventory equip
  model.visible = false;
};
