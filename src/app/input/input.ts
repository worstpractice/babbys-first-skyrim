import { ObSet } from "../abstract-data-types/ObSet";
import { mapAnimationNamesToAnimations } from "../cascade/mapAnimationNamestoAnimations";
import { mapEffectsToAnimationNames } from "../cascade/mapEffectsToAnimationNames";
import { mapInputToKeys } from "../cascade/mapInputToKeys";
import { mapKeysToEffects } from "../cascade/mapKeysToEffects";
import type { Input } from "../typings/Input";
import type { ActionKey } from "../typings/input/ActionKey";
import type { ModifierKey } from "../typings/input/ModifierKey";
import type { MovementKey } from "../typings/input/MovementKey";
import type { RelevantKey } from "../typings/input/RelevantKey";
import type { RelevantMouseButton } from "../typings/input/RelevantMouseButton";
import type { TurnKey } from "../typings/input/TurnKey";
import type { TestSetPair } from "../typings/TestSetPair";
import { isActionKey } from "../utils/type-predicates/isActionKey";
import { isModifierKey } from "../utils/type-predicates/isModifierKey";
import { isMovementKey } from "../utils/type-predicates/isMovementKey";
import { isRelevantMouseButton } from "../utils/type-predicates/isRelevantMouseButton";
import { isTurnKey } from "../utils/type-predicates/isTurnKey";

export const input: Input = {
  heldActionKeys: new ObSet<ActionKey>(),
  heldKeys: new ObSet<RelevantKey>(),
  heldModifierKeys: new ObSet<ModifierKey>(),
  heldMouseButtons: new ObSet<RelevantMouseButton>(),
  heldMovementKeys: new ObSet<MovementKey>(),
  heldTurnKeys: new ObSet<TurnKey>(),
} as const;

//////////////////////////////////////////////////////////////////////

const testSetPairs: readonly TestSetPair<any>[] = [
  //
  [isActionKey, input.heldActionKeys],
  [isModifierKey, input.heldModifierKeys],
  [isMovementKey, input.heldMovementKeys],
  [isTurnKey, input.heldTurnKeys],
  [isRelevantMouseButton, input.heldMouseButtons],
] as const;

//////////////////////////////////////////////////////////////////////

/** Congratulations! Here are some essential side effects. Enjoy! */
mapInputToKeys(testSetPairs);
mapKeysToEffects();
mapEffectsToAnimationNames();
mapAnimationNamesToAnimations();
