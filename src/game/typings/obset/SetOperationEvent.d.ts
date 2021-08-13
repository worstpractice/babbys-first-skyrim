import type { SetEvent } from "src/game/typings/obset/SetEvent";

export type SetOperationEvent<T extends PropertyKey> = Omit<SetEvent<T>, "operation">;
