import type { Action } from 'src/game/typings/Action';
import type { Actor } from 'src/game/typings/Actor';

export const mapAnimationNamesToAnimations = ({ actions, animations }: Actor): void => {
  actions.on('add', (action: Action): void => {
    animations[action].animationAction.play();
  });

  actions.on('delete', (action: Action): void => {
    animations[action].animationAction.stop();
  });
};
