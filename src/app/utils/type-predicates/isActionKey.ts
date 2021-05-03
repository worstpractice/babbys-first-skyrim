import { ACTION_KEYS } from "../../constants/input/ACTION_KEYS";
import type { ActionKey } from "../../typings/input/ActionKey";

export const isActionKey = (t: any): t is ActionKey => {
  return ACTION_KEYS.has(t);
};
