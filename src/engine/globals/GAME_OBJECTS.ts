import { ObSet } from 'obset';
import type { GameObject } from 'src/engine/GameObject';
import { createSnitch } from 'src/engine/utils/createSnitch';

export const GAME_OBJECTS = new ObSet<GameObject>() //
  .on('add', createSnitch('GAME_OBJECTS'))
  .on('delete', createSnitch('GAME_OBJECTS'));
