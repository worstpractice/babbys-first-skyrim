import { ANIMATIONS } from 'src/game/constants/ANIMATIONS';
import { ANIMATIONS_PATH } from 'src/game/constants/ANIMATIONS_PATH';
import { FBXLoader } from 'src/game/shims/FbxLoader';
import type { NameClipDuo } from 'src/game/typings/NameClipDuo';
import { toPromises } from 'src/utils/mapping/toPromises';
import type { AnimationClip, LoadingManager } from 'three';

export const loadPlayerAnimations = async (loadingManager: LoadingManager): Promise<readonly NameClipDuo[]> => {
  const loader = new FBXLoader(loadingManager);

  loader.setPath(ANIMATIONS_PATH);

  const asyncAnimationLoaders: readonly ((this: void) => Promise<NameClipDuo>)[] = ANIMATIONS.map(([path, name]) => {
    const handleLoad = async (): Promise<NameClipDuo> => {
      const animation = await loader.loadAsync(path);

      animation.name = name;

      const animations = animation.animations[0] as AnimationClip;

      return [name, animations] as const;
    };

    return handleLoad;
  });

  const promises: readonly Promise<NameClipDuo>[] = asyncAnimationLoaders.map(toPromises);

  return Promise.all(promises);
};
