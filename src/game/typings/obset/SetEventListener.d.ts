import type { SetEvent } from "src/game/typings/obset/SetEvent";

export type SetEventListener<T extends PropertyKey> = (event: SetEvent<T>) => void;
