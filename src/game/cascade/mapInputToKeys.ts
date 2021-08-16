import { input } from 'src/game/input/input';
import type { TestSetPair } from 'src/game/typings/TestSetPair';

export const mapInputToKeys = <T extends string>(testSetPairs: readonly TestSetPair<T>[]): void => {
  input.heldKeys.on('add', ({ value }) => {
    for (const [test, set] of testSetPairs) {
      if (!test(value)) continue;

      set.add(value);
    }
  });

  input.heldKeys.on('delete', ({ value }) => {
    for (const [test, obset] of testSetPairs) {
      if (!test(value)) continue;

      obset.delete(value);
    }
  });
};
