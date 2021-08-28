import type { Player } from 'src/game/typings/Player';

export const mapAnimationNamesToAnimations = ({ activeAnimations, actionClips }: Player): void => {
  activeAnimations.on('add', ({ value }): void => {
    const { action } = actionClips[value];

    action.play();
  });

  activeAnimations.on('delete', ({ value }): void => {
    const { action } = actionClips[value];

    action.stop();
  });
};
