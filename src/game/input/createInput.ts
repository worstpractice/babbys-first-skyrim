import { ObSet } from 'obset';
import type { Input } from 'src/game/typings/Input';
import type { ActionKey } from 'src/game/typings/keys/ActionKey';
import type { ModifierKey } from 'src/game/typings/keys/ModifierKey';
import type { MovementKey } from 'src/game/typings/keys/MovementKey';
import type { RelevantKey } from 'src/game/typings/keys/RelevantKey';
import type { TurnKey } from 'src/game/typings/keys/TurnKey';
import type { RelevantMouseButton } from 'src/game/typings/RelevantMouseButton';

export const createInput = () => {
  const input: Input = {
    heldActionKeys: new ObSet<ActionKey>(),
    heldKeys: new ObSet<RelevantKey>(),
    heldModifierKeys: new ObSet<ModifierKey>(),
    heldMouseButtons: new ObSet<RelevantMouseButton>(),
    heldMovementKeys: new ObSet<MovementKey>(),
    heldTurnKeys: new ObSet<TurnKey>(),
  } as const;

  return input;
};
