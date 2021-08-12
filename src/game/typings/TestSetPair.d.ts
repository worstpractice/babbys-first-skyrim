import type { ObSet } from "src/game/abstract-data-types/ObSet";
import type { TypePredicate } from "src/game/typings/TypePredicate";

export type TestSetPair<T extends string> = readonly [TypePredicate<T>, ObSet<T>];
