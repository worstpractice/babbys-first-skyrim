import { ONCE_PASSIVE } from "../constants/event-listener-options/ONCE_PASSIVE";
import { main } from "./main";
import type { App } from "./typings/App";

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
