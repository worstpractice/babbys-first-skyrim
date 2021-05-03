import type { SetEvent } from "./SetEvent";

export type SetOperationEvent<T extends string> = Omit<SetEvent<T>, "operation">;
