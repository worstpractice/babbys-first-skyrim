import type { Player } from 'src/game/typings/Player';
import type { TestSetPair } from 'src/game/typings/TestSetPair';
import { isActionKey } from 'src/game/utils/type-predicates/isActionKey';
import { isModifierKey } from 'src/game/utils/type-predicates/isModifierKey';
import { isMovementKey } from 'src/game/utils/type-predicates/isMovementKey';
import { isRelevantMouseButton } from 'src/game/utils/type-predicates/isRelevantMouseButton';
import { isTurnKey } from 'src/game/utils/type-predicates/isTurnKey';

export const mapInputToKeys = ({ input }: Player): void => {
  const testSetPairs: readonly TestSetPair<any>[] = [
    //
    [isActionKey, input.heldActionKeys],
    [isModifierKey, input.heldModifierKeys],
    [isMovementKey, input.heldMovementKeys],
    [isTurnKey, input.heldTurnKeys],
    [isRelevantMouseButton, input.heldMouseButtons],
  ] as const;

  input.heldKeys.on('add', (key): void => {
    console.count('add');

    for (const [test, set] of testSetPairs) {
      if (!test(key)) continue;

      set.add(key);
    }
  });

  input.heldKeys.on('delete', (key): void => {
    console.count('delete');

    for (const [test, obset] of testSetPairs) {
      if (!test(key)) continue;

      obset.delete(key);
    }
  });
};
