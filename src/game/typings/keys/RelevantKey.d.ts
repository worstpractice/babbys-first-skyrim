import type { ActionKey } from 'src/game/typings/keys/ActionKey';
import type { ModifierKey } from 'src/game/typings/keys/ModifierKey';
import type { MovementKey } from 'src/game/typings/keys/MovementKey';
import type { TurnKey } from 'src/game/typings/keys/TurnKey';

export type RelevantKey = ActionKey | ModifierKey | MovementKey | TurnKey;
