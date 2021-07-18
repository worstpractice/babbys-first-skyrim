export const entries = Object.entries as <T extends object>(o: T) => readonly (readonly [keyof T, NonNullable<T[keyof T]>])[];
