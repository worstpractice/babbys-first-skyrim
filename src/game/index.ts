import { ONCE_PASSIVE } from 'src/constants/event-listener-options/ONCE_PASSIVE';
import { main } from 'src/game/main';
import type { RunningGame } from 'src/game/typings/RunningGame';

let runningGame: RunningGame | null = null;

const launchGame = async (): Promise<void> => {
  console.time('game launch');
  runningGame = await main();
  console.timeEnd('game launch');
};

window.addEventListener(
  'DOMContentLoaded',
  launchGame, // eslint-disable-line @typescript-eslint/no-misused-promises
  ONCE_PASSIVE,
);
