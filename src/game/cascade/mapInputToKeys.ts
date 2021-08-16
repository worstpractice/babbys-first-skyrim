import type { Input } from 'src/game/typings/Input';
import type { TestSetPair } from 'src/game/typings/TestSetPair';
import { isActionKey } from 'src/game/utils/type-predicates/isActionKey';
import { isModifierKey } from 'src/game/utils/type-predicates/isModifierKey';
import { isMovementKey } from 'src/game/utils/type-predicates/isMovementKey';
import { isRelevantMouseButton } from 'src/game/utils/type-predicates/isRelevantMouseButton';
import { isTurnKey } from 'src/game/utils/type-predicates/isTurnKey';

export const mapInputToKeys = (input: Input): void => {
  const testSetPairs: readonly TestSetPair<any>[] = [
    //
    [isActionKey, input.heldActionKeys],
    [isModifierKey, input.heldModifierKeys],
    [isMovementKey, input.heldMovementKeys],
    [isTurnKey, input.heldTurnKeys],
    [isRelevantMouseButton, input.heldMouseButtons],
  ] as const;

  input.heldKeys.on('add', ({ value }): void => {
    for (const [test, set] of testSetPairs) {
      if (!test(value)) continue;

      set.add(value);
    }
  });

  input.heldKeys.on('delete', ({ value }): void => {
    for (const [test, obset] of testSetPairs) {
      if (!test(value)) continue;

      obset.delete(value);
    }
  });
};
