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
  const weaponLoader = new FBXLoader(loadingManager);

  weaponLoader.setPath(WEAPONS_PATH);

  const weaponModel = await weaponLoader.loadAsync(`${ITEM_NAME}.fbx`);

  weaponModel.name = ITEM_NAME;
  weaponModel.scale.setScalar(0.021);
  weaponModel.traverse(enableShadows);
  weaponModel.traverse(enableSrgbEncoding);

  // Align to player
  weaponModel.rotateY(Math.PI);
  weaponModel.rotateX(FACING_UPRIGHT);
  weaponModel.rotateY(-1);
  weaponModel.position.add(new Vector3(-10, 13.37, -0.5));

  itemNameToModel[ITEM_NAME] = weaponModel;

  const [root] = playerModel.children;

  root?.traverse((child): void => {
    if (child.name !== 'RightHandIndex1') return;

    child.attach(weaponModel);
  });

  // Hide for now, unhide via inventory equip
  weaponModel.visible = false;
};
