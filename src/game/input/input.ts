import { ObSet } from "../abstract-data-types/ObSet";
import { mapAnimationNamesToAnimations } from "../cascade/mapAnimationNamestoAnimations";
import { mapEffectsToAnimationNames } from "../cascade/mapEffectsToAnimationNames";
import { mapInputToKeys } from "../cascade/mapInputToKeys";
import { mapKeysToEffects } from "../cascade/mapKeysToEffects";
import type { Input } from "src/typings/Input";
import type { ActionKey } from "src/typings/input/ActionKey";
import type { ModifierKey } from "src/typings/input/ModifierKey";
import type { MovementKey } from "src/typings/input/MovementKey";
import type { RelevantKey } from "src/typings/input/RelevantKey";
import type { RelevantMouseButton } from "src/typings/input/RelevantMouseButton";
import type { TurnKey } from "src/typings/input/TurnKey";
import type { TestSetPair } from "src/typings/TestSetPair";
import { isActionKey } from "src/utils/type-predicates/isActionKey";
import { isModifierKey } from "src/utils/type-predicates/isModifierKey";
import { isMovementKey } from "src/utils/type-predicates/isMovementKey";
import { isRelevantMouseButton } from "src/utils/type-predicates/isRelevantMouseButton";
import { isTurnKey } from "src/utils/type-predicates/isTurnKey";

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
