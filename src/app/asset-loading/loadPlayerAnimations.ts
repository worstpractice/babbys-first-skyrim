import type { AnimationClip } from "three";
import { toPromises } from "../../utils/mapping/toPromises";
import { loadingManager } from "../engine/loadingManager";
import { FBXLoader } from "../shims/FbxLoader";
import type { AnimationName } from "../typings/AnimationName";
import type { FbxFileName } from "../typings/FbxFileName";
import type { NameClipDuo } from "../typings/NameClipDuo";

const ANIMATIONS_PATH = "./assets/animations/sword-and-shield/";

const ANIMATIONS: readonly (readonly [FbxFileName, AnimationName])[] = [
  //
  ["slash.fbx", "attacking"],
  ["idle.fbx", "idling"],
  ["jump.fbx", "jumping"],
  ["run.fbx", "running"],
  ["walk.fbx", "walking"],
] as const;

export const loadPlayerAnimations = async (): Promise<readonly NameClipDuo[]> => {
  const animationLoader = new FBXLoader(loadingManager);
  animationLoader.setPath(ANIMATIONS_PATH);

  const asyncAnimationLoaders: readonly (() => Promise<NameClipDuo>)[] = ANIMATIONS.map(([path, name]) => {
    return async (): Promise<NameClipDuo> => {
      const animation = await animationLoader.loadAsync(path);

      animation.name = name;

      const animations = animation.animations[0] as AnimationClip;

      return [name, animations] as const;
    };
  });

  const promises: readonly Promise<NameClipDuo>[] = asyncAnimationLoaders.map(toPromises);

  return Promise.all(promises);
};
