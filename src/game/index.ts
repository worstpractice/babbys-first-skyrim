import { ONCE_PASSIVE } from 'src/constants/event-listener-options/ONCE_PASSIVE';
import { main } from 'src/game/main';
import type { RunningGame } from 'src/game/typings/RunningGame';
import { defer } from 'src/game/utils/defer';
import { detectLongTasks } from 'src/game/utils/detectLongTasks';

let runningGame: RunningGame | null = null;

const loadApp = async (): Promise<void> => {
  runningGame = await main();

  defer(detectLongTasks);
};

window.addEventListener(
  'DOMContentLoaded',
  () => {
    void loadApp().catch(console.error);
  },
  ONCE_PASSIVE,
);
