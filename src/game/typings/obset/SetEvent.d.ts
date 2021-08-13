import type { SetOperation } from "src/game/typings/obset/SetOperation";

export type SetEvent<T extends PropertyKey> = {
  readonly operation: SetOperation;
  readonly value: T;
};
