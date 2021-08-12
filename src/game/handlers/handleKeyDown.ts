import { input } from "../input/input";
import { isRelevantKey } from "src/utils/type-predicates/isRelevantKey";

export const handleKeyDown = ({ code }: KeyboardEvent): void => {
  if (!isRelevantKey(code)) return;

  input.heldKeys.add(code);
};
