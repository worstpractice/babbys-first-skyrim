import { LoadingManager } from "three";
import { beginRenderLoop } from "../loop/beginRenderLoop";

export const loadingManager = new LoadingManager(console.log, console.debug, console.error);

loadingManager.onLoad = beginRenderLoop;
