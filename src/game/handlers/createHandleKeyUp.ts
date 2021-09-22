import type { Input } from 'src/game/typings/Input';
import { isRelevantKey } from 'src/game/utils/type-predicates/isRelevantKey';

export const createHandleKeyUp = ({ heldKeys }: Input) => {
  const handleKeyUp = ({ code }: KeyboardEvent): void => {
    if (!isRelevantKey(code)) return;

    heldKeys.delete(code);
  };

  return handleKeyUp;
};
