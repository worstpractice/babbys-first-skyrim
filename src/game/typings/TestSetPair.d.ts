import type { ObSet } from "../abstract-data-types/ObSet";
import type { TypePredicate } from "./TypePredicate";

export type TestSetPair<T extends string> = readonly [TypePredicate<T>, ObSet<T>];
