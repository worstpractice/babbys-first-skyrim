import type { SetEvent } from "./SetEvent";

export type SetEventListener<T extends string> = (event: SetEvent<T>) => void;
