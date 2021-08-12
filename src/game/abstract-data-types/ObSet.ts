import type { ObSetOptions } from "src/game/typings/obset/ObSetOptions";
import type { SetEvent } from "src/game/typings/obset/SetEvent";
import type { SetEventListener } from "src/game/typings/obset/SetEventListener";
import type { SetEventListenerOptions } from "src/game/typings/obset/SetEventListenerOptions";
import type { SetEventTarget } from "src/game/typings/obset/SetEventTarget";
import type { SetOperation } from "src/game/typings/obset/SetOperation";
import type { SetOperationEvent } from "src/game/typings/obset/SetOperationEvent";
import type { SetOperationEventListener } from "src/game/typings/obset/SetOperationEventListener";
import type { SetOperationEventListeners } from "src/game/typings/obset/SetOperationEventListeners";
import type { SetOperationListeners } from "src/game/typings/obset/SetOperationListeners";
import { swapPop } from "src/game/utils/swapPop";

const ONCE = {
  once: true,
} as const;

const DEFAULT_OPTIONS: ObSetOptions = {
  freeUnusedResources: true,
} as const;

export class ObSet<T extends string> extends Set<T> implements SetEventTarget<T> {
  declare readonly prototype: Set<T>;

  private readonly onValueHandlers: { [key in T]?: SetOperationListeners<T> } = {};

  private readonly toBeRanOnlyOnce: SetEventListener<T>[] = [];

  private readonly onAnyHandlers: SetOperationEventListeners<T> = {
    add: new Set<SetOperationEventListener<T>>(),
    delete: new Set<SetOperationEventListener<T>>(),
  } as const;

  private readonly onEmptyHandlers = new Set<SetOperationEventListener<T>>();

  private readonly options: ObSetOptions = DEFAULT_OPTIONS;

  constructor(values?: readonly T[] | null, options: ObSetOptions = DEFAULT_OPTIONS) {
    super(values);
    this.options = options;
  }

  // @ts-expect-error add `override` keyword here when tools finally support it.
  add(this: this, value: T): this {
    if (super.has(value)) return this;

    super.add(value);

    const event: SetEvent<T> = {
      operation: "add",
      value,
    } as const;

    this.dispatchEvent(event);

    return this;
  }

  private initOperationListenersFor(this: this, value: T): SetOperationListeners<T> {
    const operationListeners: SetOperationListeners<T> = {
      add: undefined,
      delete: undefined,
    } as const;

    this.onValueHandlers[value] = operationListeners;

    return operationListeners;
  }

  private initEventListenersFor(this: this, operation: SetOperation, operationListeners: SetOperationListeners<T>): Set<SetEventListener<T>> {
    const eventListeners = new Set<SetEventListener<T>>();

    operationListeners[operation] = eventListeners;

    return eventListeners;
  }

  addEventListener(this: this, operation: SetOperation, value: T, listener: SetEventListener<T>, options?: SetEventListenerOptions): this {
    const operationListeners = this.onValueHandlers[value] ?? this.initOperationListenersFor(value);

    const eventListeners = operationListeners[operation] ?? this.initEventListenersFor(operation, operationListeners);

    eventListeners.add(listener);

    if (options?.once) this.toBeRanOnlyOnce.push(listener);

    return this;
  }

  // @ts-expect-error add `override` keyword here when tools finally support it.
  delete(this: this, value: T): this {
    if (!this.has(value)) return this;

    super.delete(value);

    const event: SetEvent<T> = {
      operation: "delete",
      value,
    } as const;

    this.dispatchEvent(event);

    if (!this.size) {
      const operationEvent: SetOperationEvent<T> = {
        value: event.value,
      } as const;

      for (const listener of this.onEmptyHandlers) {
        listener.call(this, operationEvent);
      }
    }

    return this;
  }

  private deleteOneTimeListener(this: this, listener: SetEventListener<T> | SetOperationEventListener<T>): void {
    const listenerIndex = this.toBeRanOnlyOnce.indexOf(listener);

    if (listenerIndex === -1) return;

    swapPop(listenerIndex, this.toBeRanOnlyOnce);
  }

  private dispatchEvent(this: this, event: SetEvent<T>): this {
    const { operation, value } = event;

    const anyListeners = this.onAnyHandlers[operation];

    const operationEvent: SetOperationEvent<T> = {
      value,
    } as const;

    for (const listener of anyListeners) {
      listener.call(this, operationEvent);

      if (!this.toBeRanOnlyOnce.includes(listener)) continue;

      anyListeners.delete(listener);
      this.deleteOneTimeListener(listener);
    }

    const eventListeners = this.onValueHandlers[value]?.[operation];

    if (!eventListeners) return this;

    for (const listener of eventListeners) {
      listener.call(this, event);

      if (!this.toBeRanOnlyOnce.includes(listener)) continue;

      eventListeners.delete(listener);
      this.deleteOneTimeListener(listener);
    }

    return this;
  }

  private findOperationsWithoutListenersIn(this: this, operationListeners: SetOperationListeners<T>): readonly SetOperation[] {
    const operationSetPairs = Object.entries(operationListeners);

    const operationsWithoutListeners: SetOperation[] = [];

    for (const [operation, { size }] of operationSetPairs) {
      if (size) continue;

      operationsWithoutListeners.push(operation);
    }

    return operationsWithoutListeners;
  }

  /** NOTE: syntactic sugar for `addEventListener`. */
  readonly on = this.addEventListener;

  onAny(this: this, operation: SetOperation, listener: SetOperationEventListener<T>): this {
    this.onAnyHandlers[operation]?.add(listener);

    return this;
  }

  once(this: this, operation: SetOperation, value: T, listener: SetEventListener<T>): this {
    return this.on(operation, value, listener, ONCE);
  }

  onceAny(this: this, operation: SetOperation, listener: SetOperationEventListener<T>): this {
    this.onAnyHandlers[operation]?.add(listener);

    this.toBeRanOnlyOnce.push(listener);

    return this;
  }

  onEmpty(this: this, listener: SetOperationEventListener<T>): this {
    this.onEmptyHandlers.add(listener);

    return this;
  }

  /** NOTE: keeps memory usage as low as possible, at the cost of some extra cleanup work.
   *
   * See: https://en.wikipedia.org/wiki/Space%E2%80%93time_tradeoff */
  private freeUnusedResourcesIn(this: this, operationListeners: SetOperationListeners<T>, value: T): void {
    const operationsWithoutListeners = this.findOperationsWithoutListenersIn(operationListeners);

    // Free any sets without listeners
    for (const operation of operationsWithoutListeners) {
      operationListeners[operation] = undefined;
    }

    if (Object.keys(operationListeners).length) return;

    // Free any values without sets
    this.onValueHandlers[value] = undefined;
  }

  removeEventListener(this: this, operation: SetOperation, value: T, listener: SetEventListener<T>): this {
    const operationListeners = this.onValueHandlers[value];

    if (!operationListeners) return this;

    const eventListeners = operationListeners[operation];

    if (!eventListeners) return this;

    eventListeners.delete(listener);
    this.deleteOneTimeListener(listener);

    if (this.options.freeUnusedResources) this.freeUnusedResourcesIn(operationListeners, value);

    return this;
  }
}
