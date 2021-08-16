import { FBXLoader } from 'src/game/shims/FbxLoader';
import type { AnimationName } from 'src/game/typings/AnimationName';
import type { FbxFileName } from 'src/game/typings/FbxFileName';
import type { NameClipDuo } from 'src/game/typings/NameClipDuo';
import { toPromises } from 'src/utils/mapping/toPromises';
import type { AnimationClip, LoadingManager } from 'three';

const ANIMATIONS_PATH = './assets/animations/sword-and-shield/' as const;

const ANIMATIONS: readonly (readonly [FbxFileName, AnimationName])[] = [
  //
  ['slash.fbx', 'attacking'],
  ['idle.fbx', 'idling'],
  ['jump.fbx', 'jumping'],
  ['run.fbx', 'running'],
  ['walk.fbx', 'walking'],
] as const;

export const loadPlayerAnimations = async (loadingManager: LoadingManager): Promise<readonly NameClipDuo[]> => {
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
