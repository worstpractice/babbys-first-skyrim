import type { SetOperation } from "./SetOperation";
import type { SetOperationEventListener } from "./SetOperationEventListener";

export type SetOperationEventListeners<T extends string> = {
  readonly [key in SetOperation]: Set<SetOperationEventListener<T>>;
};
