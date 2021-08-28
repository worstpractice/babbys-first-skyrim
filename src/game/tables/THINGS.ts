import { ObSet } from 'obset';
import type { Thing } from 'src/game/typings/Thing';

// prettier-ignore
export const THINGS = new ObSet<Thing>()
  .on('add', console.log)
  .on('delete', console.log);
