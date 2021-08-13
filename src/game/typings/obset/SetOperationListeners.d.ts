import type { SetEventListener } from "src/game/typings/obset/SetEventListener";
import type { SetOperation } from "src/game/typings/obset/SetOperation";

export type SetOperationListeners<T extends PropertyKey> = {
  [key in SetOperation]?: Set<SetEventListener<T>>;
};
