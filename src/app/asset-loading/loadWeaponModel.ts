import type { Group } from "three";
import { itemToModel } from "../../lookup-tables/itemToModel";
import { FBXLoader } from "../shims/FbxLoader";
import { enableShadows } from "../utils/mapping/enableShadows";
import { enableSrgbEncoding } from "../utils/mapping/enableSrgbEncoding";
import { vec3 } from "../utils/vec3";

const WEAPONS_PATH = `./assets/models/weapons/`;

const ITEM_NAME = "sword";

export const loadWeaponModel = async (playerModel: Group) => {
  const weaponLoader = new FBXLoader();
  weaponLoader.setPath(WEAPONS_PATH);
  const weaponModel = await weaponLoader.loadAsync(`${ITEM_NAME}.fbx`);
  weaponModel.name = ITEM_NAME;
  weaponModel.scale.setScalar(0.021);
  weaponModel.traverse(enableShadows);
  weaponModel.traverse(enableSrgbEncoding);
  // Align to player
  weaponModel.rotateY(Math.PI);
  weaponModel.rotateX(-Math.PI / 2);
  weaponModel.rotateY(-1);
  weaponModel.position.add(vec3(-10, 13.37, -0.5));
  itemToModel.set(ITEM_NAME, weaponModel);
  playerModel.children[0]?.traverse((child) => {
    if (child.name !== "RightHandIndex1") return;
    child.attach(weaponModel);
  });
  // Hide for now, unhide via inventory equip
  weaponModel.visible = false;
};
