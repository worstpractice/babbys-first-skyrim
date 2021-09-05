import { ONCE_PASSIVE } from 'src/constants/event-listener-options/ONCE_PASSIVE';
import { main } from 'src/game/main';
import type { App } from 'src/game/typings/App';
import { defer } from 'src/game/utils/defer';
import { detectLongTasks } from 'src/game/utils/detectLongTasks';

let app: App | null = null;

const loadApp = async (): Promise<void> => {
  app = await main();

  defer(detectLongTasks);
};

window.addEventListener(
  'DOMContentLoaded',
  () => {
    void loadApp().catch(console.error);
  },
  ONCE_PASSIVE,
);
