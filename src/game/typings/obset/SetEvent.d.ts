import type { SetOperation } from "src/game/typings/obset/SetOperation";

export type SetEvent<T extends string> = {
  readonly operation: SetOperation;
  readonly value: T;
};
