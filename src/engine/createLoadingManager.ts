import { LoadingManager } from 'three';

export const createLoadingManager = () => {
  return new LoadingManager(console.log, console.debug, console.error);
};
