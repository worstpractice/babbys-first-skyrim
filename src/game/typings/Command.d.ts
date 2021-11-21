export type Command = {
  readonly start: (this: void) => void;
  readonly stop: (this: void) => void;
};
