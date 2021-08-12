import { input } from "../input/input";
import { isRelevantKey } from "src/utils/type-predicates/isRelevantKey";

export const handleKeyUp = ({ code }: KeyboardEvent): void => {
  if (!isRelevantKey(code)) return;

  input.heldKeys.delete(code);
};
