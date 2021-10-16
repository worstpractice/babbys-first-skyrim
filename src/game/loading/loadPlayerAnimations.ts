import { ANIMATIONS } from 'src/game/constants/ANIMATIONS';
import { ANIMATIONS_PATH } from 'src/game/constants/ANIMATIONS_PATH';
import { FBXLoader } from 'src/game/shims/FbxLoader';
import type { AnimationName } from 'src/game/typings/AnimationName';
import type { FbxFileName } from 'src/game/typings/FbxFileName';
import type { LoadingHandler } from 'src/game/typings/LoadingHandler';
import type { NameClipDuo } from 'src/game/typings/NameClipDuo';
import { toPromises } from 'src/utils/mapping/toPromises';
import type { LoadingManager } from 'three';

export const loadPlayerAnimations = async (loadingManager: LoadingManager): Promise<readonly NameClipDuo[]> => {
  const loader = new FBXLoader(loadingManager).setPath(ANIMATIONS_PATH);

  const toLoadingHandler = ([path, name]: readonly [FbxFileName, AnimationName]): LoadingHandler => {
    const handleLoading: LoadingHandler = async () => {
      const { animations } = await loader.loadAsync(path);

      const animation = animations[0];

      if (!animation) throw new ReferenceError('Missing animations!');

      return [name, animation] as const;
    };

    return handleLoading;
  };

  const handlers: readonly LoadingHandler[] = ANIMATIONS.map(toLoadingHandler);

  const promises: readonly Promise<NameClipDuo>[] = handlers.map(toPromises);

  return Promise.all(promises);
};
