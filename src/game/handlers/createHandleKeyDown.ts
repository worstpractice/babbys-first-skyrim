import type { Input } from 'src/game/typings/Input';
import { isRelevantKey } from 'src/game/utils/type-predicates/isRelevantKey';

export const createHandleKeydown = (input: Input) => {
  const handleKeyDown = ({ code }: KeyboardEvent): void => {
    if (!isRelevantKey(code)) return;

    input.heldKeys.add(code);
  };

  return handleKeyDown;
};
