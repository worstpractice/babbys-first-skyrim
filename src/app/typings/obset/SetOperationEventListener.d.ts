import type { SetOperationEvent } from "./SetOperationEvent";

export type SetOperationEventListener<T extends string> = (event: SetOperationEvent<T>) => void;
