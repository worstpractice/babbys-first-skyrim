import type { Input } from 'src/game/typings/Input';
import { isRelevantKey } from 'src/game/utils/type-predicates/isRelevantKey';

export const createHandleKeydown = ({ heldKeys }: Input) => {
  const handleKeyDown = ({ code }: KeyboardEvent): void => {
    if (!isRelevantKey(code)) return;

    heldKeys.add(code);
  };

  return handleKeyDown;
};
