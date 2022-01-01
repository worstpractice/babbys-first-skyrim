import { ANIMATIONS } from 'src/game/constants/ANIMATIONS';
import { ANIMATIONS_PATH } from 'src/game/constants/ANIMATIONS_PATH';
import { FBXLoader } from 'src/game/shims/FbxLoader';
import type { Action } from 'src/game/typings/Action';
import type { FbxFileName } from 'src/game/typings/FbxFileName';
import type { LoadingHandler } from 'src/game/typings/LoadingHandler';
import { toPromises } from 'src/views/utils/mapping/toPromises';
import { panic } from 'src/views/utils/panic';
import type { AnimationClip, LoadingManager } from 'three';

export const loadKnightAnimations = async (loadingManager: LoadingManager): Promise<readonly (readonly [Action, AnimationClip])[]> => {
  const loader = new FBXLoader(loadingManager).setPath(ANIMATIONS_PATH);

  const toLoadingHandler = <T extends readonly [FbxFileName, Action]>([path, name]: T): LoadingHandler => {
    const handleLoading: LoadingHandler = async () => {
      const { animations } = await loader.loadAsync(path);

      const [animation] = animations;

      return animation ? [name, animation] : panic(`Missing animation "${name}"!`);
    };

    return handleLoading;
  };

  const handlers: readonly LoadingHandler[] = ANIMATIONS.map(toLoadingHandler);

  const promises: readonly Promise<readonly [Action, AnimationClip]>[] = handlers.map(toPromises);

  return Promise.all(promises);
};
