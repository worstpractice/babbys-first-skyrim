import { player } from 'src/game/player/player';
import { FBXLoader } from 'src/game/shims/FbxLoader';
import type { Mutable } from 'src/game/typings/Mutable';
import { enableShadows } from 'src/game/utils/mapping/enableShadows';
import { enableSrgbEncoding } from 'src/game/utils/mapping/enableSrgbEncoding';
import type { LoadingManager, Scene } from 'three';
import { AnimationMixer } from 'three';

const CHARACTERS_PATH = './assets/models/castle-guard/' as const;

type Props = {
  readonly animationMixers: AnimationMixer[];
  readonly loadingManager: LoadingManager;
  readonly scene: Scene;
};

export const loadPlayerModel = async ({ animationMixers, loadingManager, scene }: Props) => {
  const modelLoader = new FBXLoader(loadingManager);

  modelLoader.setPath(CHARACTERS_PATH);

  const playerModel = await modelLoader.loadAsync('castle-guard.fbx');

  playerModel.name = 'playerModel';
  playerModel.scale.setScalar(0.09);

  playerModel.traverse(enableShadows);
  playerModel.traverse(enableSrgbEncoding);

  (player as Mutable<typeof player>).model = playerModel;
  (player as Mutable<typeof player>).mixer = new AnimationMixer(playerModel);

  animationMixers.push(player.mixer);

  scene.add(playerModel);

  return playerModel;
};
