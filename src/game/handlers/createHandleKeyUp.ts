import type { Input } from 'src/game/typings/Input';
import { isRelevantKey } from 'src/game/utils/type-predicates/isRelevantKey';

export const createHandleKeyUp = async (input: Input) => {
  const handleKeyUp = ({ code }: KeyboardEvent): void => {
    if (!isRelevantKey(code)) return;

    input.heldKeys.delete(code);
  };

  return handleKeyUp;
};
