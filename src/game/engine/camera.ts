import { PerspectiveCamera } from "three";

const FOV = 90;
const ASPECT = window.innerWidth / window.innerHeight;
const NEAR = 1.0;
const FAR = 10_000.0;

export const camera = new PerspectiveCamera(FOV, ASPECT, NEAR, FAR);

camera.position.set(75, 20, 0);
