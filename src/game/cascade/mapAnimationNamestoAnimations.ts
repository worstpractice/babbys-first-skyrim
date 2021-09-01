import type { Player } from 'src/game/typings/Player';

export const mapAnimationNamesToAnimations = ({ activeAnimations, actionClips }: Player): void => {
  activeAnimations.on('add', (animationName): void => {
    const { action } = actionClips[animationName];

    action.play();
  });

  activeAnimations.on('delete', (animationName): void => {
    const { action } = actionClips[animationName];

    action.stop();
  });
};
