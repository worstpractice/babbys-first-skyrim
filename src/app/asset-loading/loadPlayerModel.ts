import type { Group } from "three";
import { AnimationMixer } from "three";
import { loadingManager } from "../engine/loadingManager";
import { mixers } from "../engine/mixers";
import { scene } from "../engine/scene";
import { player } from "../player/player";
import { FBXLoader } from "../shims/FbxLoader";
import type { Mutable } from "../typings/Mutable";
import { enableShadows } from "../utils/mapping/enableShadows";
import { enableSrgbEncoding } from "../utils/mapping/enableSrgbEncoding";

const CHARACTERS_PATH = "./assets/models/castle-guard/";

export const loadPlayerModel = async (): Promise<Group> => {
  const modelLoader = new FBXLoader(loadingManager);

  modelLoader.setPath(CHARACTERS_PATH);

  const playerModel = await modelLoader.loadAsync("castle-guard.fbx");

  playerModel.name = "playerModel";
  playerModel.scale.setScalar(0.09);

  playerModel.traverse(enableShadows);
  playerModel.traverse(enableSrgbEncoding);

  (player as Mutable<typeof player>).model = playerModel;
  (player as Mutable<typeof player>).mixer = new AnimationMixer(playerModel);

  mixers.push(player.mixer);

  scene.add(playerModel);

  return playerModel;
};
