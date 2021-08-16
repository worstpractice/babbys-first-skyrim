import { player } from 'src/game/player/player';
import type { AnimationName } from 'src/game/typings/AnimationName';
import type { Mutable } from 'src/game/typings/Mutable';
import type { AnimationClip } from 'three';
import { LoopOnce } from 'three';

export const populateAnimationsTable = (animationName: AnimationName, clip: AnimationClip): void => {
  clip.name = `${animationName}Clip`;

  const action = player.mixer.clipAction(clip);

  (player.animations[animationName] as Mutable<typeof player['animations'][AnimationName]>).action = action;
  (player.animations[animationName] as Mutable<typeof player['animations'][AnimationName]>).clip = clip;

  const shouldLoopOnce = clip.name === 'jumpingClip' || clip.name === 'attackingClip';

  if (!shouldLoopOnce) return;

  action.setLoop(LoopOnce, 1);
};
