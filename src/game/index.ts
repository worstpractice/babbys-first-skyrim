import { main } from "src/game/main";
import type { App } from "src/game/typings/App";
import { ONCE_PASSIVE } from "src/constants/event-listener-options/ONCE_PASSIVE";

let app: App | null = null;

const loadApp = async (): Promise<void> => {
  app = await main();
};

window.addEventListener(
  "DOMContentLoaded",
  () => {
    loadApp().catch(console.error);
  },
  ONCE_PASSIVE,
);
