import { ANIMATIONS } from 'src/game/constants/ANIMATIONS';
import { ANIMATIONS_PATH } from 'src/game/constants/ANIMATIONS_PATH';
import { FBXLoader } from 'src/game/shims/FbxLoader';
import type { AnimationName } from 'src/game/typings/AnimationName';
import type { FbxFileName } from 'src/game/typings/FbxFileName';
import type { LoadingHandler } from 'src/game/typings/LoadingHandler';
import type { NameClipDuo } from 'src/game/typings/NameClipDuo';
import { toPromises } from 'src/utils/mapping/toPromises';
import { panic } from 'src/utils/panic';
import type { LoadingManager } from 'three';

export const loadPlayerAnimations = async (loadingManager: LoadingManager): Promise<readonly NameClipDuo[]> => {
  const loader = new FBXLoader(loadingManager).setPath(ANIMATIONS_PATH);

  const toLoadingHandler = <T extends readonly [FbxFileName, AnimationName]>([path, name]: T): LoadingHandler => {
    const handleLoading: LoadingHandler = async () => {
      const { animations } = await loader.loadAsync(path, console.debug);

      const [animation] = animations;

      return animation ? [name, animation] : panic(`Missing animation "${name}"!`);
    };

    return handleLoading;
  };

  const handlers: readonly LoadingHandler[] = ANIMATIONS.map(toLoadingHandler);

  const promises: readonly Promise<NameClipDuo>[] = handlers.map(toPromises);

  return Promise.all(promises);
};
