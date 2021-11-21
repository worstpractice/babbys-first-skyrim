import type { Action } from 'src/game/typings/Action';
import type { Player } from 'src/game/typings/Player';

export const mapAnimationNamesToAnimations = ({ actions, animations }: Player): void => {
  actions.on('add', (action: Action): void => {
    animations[action].animationAction.play();
  });

  actions.on('delete', (action: Action): void => {
    animations[action].animationAction.stop();
  });
};
