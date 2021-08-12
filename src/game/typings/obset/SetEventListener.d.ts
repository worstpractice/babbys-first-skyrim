import type { SetEvent } from "src/game/typings/obset/SetEvent";

export type SetEventListener<T extends string> = (event: SetEvent<T>) => void;
