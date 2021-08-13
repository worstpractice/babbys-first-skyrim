import type { SetOperationListeners } from "src/game/typings/obset/SetOperationListeners";

export type SetValueHandlers<T extends PropertyKey> = {
  [key in T]?: SetOperationListeners<T>;
};
