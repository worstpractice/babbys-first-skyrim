import type { SetOperationEvent } from "src/game/typings/obset/SetOperationEvent";

export type SetOperationEventListener<T extends string> = (event: SetOperationEvent<T>) => void;
