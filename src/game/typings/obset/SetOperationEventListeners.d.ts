import type { SetOperation } from "src/game/typings/obset/SetOperation";
import type { SetOperationEventListener } from "src/game/typings/obset/SetOperationEventListener";

export type SetOperationEventListeners<T extends PropertyKey> = {
  readonly [key in SetOperation]: Set<SetOperationEventListener<T>>;
};
