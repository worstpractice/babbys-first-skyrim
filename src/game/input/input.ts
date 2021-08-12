import { ObSet } from "src/game/abstract-data-types/ObSet";
import { mapAnimationNamesToAnimations } from "src/game/cascade/mapAnimationNamestoAnimations";
import { mapEffectsToAnimationNames } from "src/game/cascade/mapEffectsToAnimationNames";
import { mapInputToKeys } from "src/game/cascade/mapInputToKeys";
import { mapKeysToEffects } from "src/game/cascade/mapKeysToEffects";
import type { Input } from "src/game/typings/Input";
import type { ActionKey } from "src/game/typings/keys/ActionKey";
import type { ModifierKey } from "src/game/typings/keys/ModifierKey";
import type { MovementKey } from "src/game/typings/keys/MovementKey";
import type { RelevantKey } from "src/game/typings/keys/RelevantKey";
import type { TurnKey } from "src/game/typings/keys/TurnKey";
import type { RelevantMouseButton } from "src/game/typings/RelevantMouseButton";
import type { TestSetPair } from "src/game/typings/TestSetPair";
import { isActionKey } from "src/game/utils/type-predicates/isActionKey";
import { isModifierKey } from "src/game/utils/type-predicates/isModifierKey";
import { isMovementKey } from "src/game/utils/type-predicates/isMovementKey";
import { isRelevantMouseButton } from "src/game/utils/type-predicates/isRelevantMouseButton";
import { isTurnKey } from "src/game/utils/type-predicates/isTurnKey";

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
