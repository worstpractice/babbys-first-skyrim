import type { Action } from 'src/game/typings/Action';
import type { FbxFileName } from 'src/game/typings/FbxFileName';
import type { LoadingHandler } from 'src/game/typings/LoadingHandler';
import { FBXLoader } from 'src/game/utils/shims/FbxLoader';
import { toPromises } from 'src/views/utils/mapping/toPromises';
import { panic } from 'src/views/utils/panic';
import type { AnimationClip, LoadingManager } from 'three';

type Props = {
  readonly fileNameToAction: readonly (readonly [FbxFileName, Action])[];
  readonly filePath: `./assets/animations/${string}/`;
  readonly loadingManager: LoadingManager;
};

export const loadKnightAnimations = async ({ fileNameToAction, filePath, loadingManager }: Props): Promise<readonly (readonly [Action, AnimationClip])[]> => {
  const loader = new FBXLoader(loadingManager).setPath(filePath);

  const toLoadingHandler = <T extends readonly [FbxFileName, Action]>([path, name]: T): LoadingHandler => {
    const handleLoading: LoadingHandler = async () => {
      const { animations } = await loader.loadAsync(path);

      const [animation] = animations;

      return animation ? [name, animation] : panic(`Missing animation "${name}"!`);
    };

    return handleLoading;
  };

  const handlers: readonly LoadingHandler[] = fileNameToAction.map(toLoadingHandler);

  const promises: readonly Promise<readonly [Action, AnimationClip]>[] = handlers.map(toPromises);

  return Promise.all(promises);
};
