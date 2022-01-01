export const disableSaveShortcut = (event: KeyboardEvent): void => {
  const { ctrlKey, code } = event;

  if (!ctrlKey) return;

  if (code !== 'KeyS') return;

  event.preventDefault();
  event.stopImmediatePropagation();
};
