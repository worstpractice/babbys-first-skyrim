import type { SetOperation } from "./SetOperation";

export type SetEvent<T extends string> = {
  readonly operation: SetOperation;
  readonly value: T;
};
