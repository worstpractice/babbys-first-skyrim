export const defer = (task: (this: void) => void, ms?: number) => {
  window.setTimeout((): void => {
    window.setTimeout(task, ms ?? 0);
  });
};
