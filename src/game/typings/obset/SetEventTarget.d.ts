import type { SetEventListener } from "./SetEventListener";
import type { SetOperation } from "./SetOperation";

export interface SetEventTarget<T extends string> {
  readonly addEventListener: (this: this, type: SetOperation, value: T, listener: SetEventListener<T>) => this;
  readonly removeEventListener: (this: this, type: SetOperation, value: T, listener: SetEventListener<T>) => this;
}
