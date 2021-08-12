import type { SetEvent } from "src/game/typings/obset/SetEvent";

export type SetOperationEvent<T extends string> = Omit<SetEvent<T>, "operation">;
