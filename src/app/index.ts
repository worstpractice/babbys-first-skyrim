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
  {
    once: true,
    passive: true,
  },
);
