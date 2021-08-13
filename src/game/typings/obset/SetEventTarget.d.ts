import type { SetEventListener } from "src/game/typings/obset/SetEventListener";
import type { SetOperation } from "src/game/typings/obset/SetOperation";

export interface SetEventTarget<T extends PropertyKey> {
  readonly addEventListener: (this: this, type: SetOperation, value: T, listener: SetEventListener<T>) => this;
  readonly removeEventListener: (this: this, type: SetOperation, value: T, listener: SetEventListener<T>) => this;
}
