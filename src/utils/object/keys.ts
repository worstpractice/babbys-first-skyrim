export const keys = Object.keys as <T extends object>(o: T) => readonly (string & keyof T)[];
