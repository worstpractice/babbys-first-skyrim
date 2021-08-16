import { ObSet } from 'obset';
import { mapAnimationNamesToAnimations } from 'src/game/cascade/mapAnimationNamestoAnimations';
import { mapEffectsToAnimationNames } from 'src/game/cascade/mapEffectsToAnimationNames';
import { mapInputToKeys } from 'src/game/cascade/mapInputToKeys';
import { mapKeysToEffects } from 'src/game/cascade/mapKeysToEffects';
import type { Input } from 'src/game/typings/Input';
import type { ActionKey } from 'src/game/typings/keys/ActionKey';
import type { ModifierKey } from 'src/game/typings/keys/ModifierKey';
import type { MovementKey } from 'src/game/typings/keys/MovementKey';
import type { RelevantKey } from 'src/game/typings/keys/RelevantKey';
import type { TurnKey } from 'src/game/typings/keys/TurnKey';
import type { RelevantMouseButton } from 'src/game/typings/RelevantMouseButton';

export const createInput = async () => {
  const input: Input = {
    heldActionKeys: new ObSet<ActionKey>(),
    heldKeys: new ObSet<RelevantKey>(),
    heldModifierKeys: new ObSet<ModifierKey>(),
    heldMouseButtons: new ObSet<RelevantMouseButton>(),
    heldMovementKeys: new ObSet<MovementKey>(),
    heldTurnKeys: new ObSet<TurnKey>(),
  } as const;

  //////////////////////////////////////////////////////////////////////

  /** Congratulations! Here are some essential side effects. Enjoy! */
  mapInputToKeys(input);
  mapKeysToEffects(input);
  mapEffectsToAnimationNames(input);
  mapAnimationNamesToAnimations();

  return input;
};
