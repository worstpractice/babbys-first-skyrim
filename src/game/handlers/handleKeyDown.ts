import { input } from 'src/game/input/input';
import { isRelevantKey } from 'src/game/utils/type-predicates/isRelevantKey';

export const handleKeyDown = ({ code }: KeyboardEvent): void => {
  if (!isRelevantKey(code)) return;

  input.heldKeys.add(code);
};
