import type { SetOperationEvent } from "src/game/typings/obset/SetOperationEvent";

export type SetOperationEventListener<T extends PropertyKey> = (event: SetOperationEvent<T>) => void;
