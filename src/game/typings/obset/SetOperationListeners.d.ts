import type { SetEventListener } from "./SetEventListener";
import type { SetOperation } from "./SetOperation";

export type SetOperationListeners<T extends string> = {
  [key in SetOperation]: Set<SetEventListener<T>> | undefined;
};
