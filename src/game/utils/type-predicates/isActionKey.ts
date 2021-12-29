import { ACTION_KEYS } from 'src/game/constants/input/ACTION_KEYS';
import type { ActionKey } from 'src/game/typings/keys/ActionKey';

export const isActionKey = (t: any): t is ActionKey => ACTION_KEYS.has(t);
