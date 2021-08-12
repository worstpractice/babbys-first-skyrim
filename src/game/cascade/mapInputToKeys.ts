import { input } from "../input/input";
import type { TestSetPair } from "src/typings/TestSetPair";

export const mapInputToKeys = <T extends string>(testSetPairs: readonly TestSetPair<T>[]): void => {
  input.heldKeys.onAny("add", ({ value }) => {
    for (const [test, set] of testSetPairs) {
      if (!test(value)) continue;

      set.add(value);
    }
  });

  input.heldKeys.onAny("delete", ({ value }) => {
    for (const [test, obset] of testSetPairs) {
      if (!test(value)) continue;

      obset.delete(value);
    }
  });
};
