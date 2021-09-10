import { GSSolver, NaiveBroadphase, SAPBroadphase, SplitSolver, World } from 'cannon-es';
import { GRAVITY_OF_YOLO } from 'src/game/constants/GRAVITY_OF_YOLO';

export const createWorld = () => {
  const subSolver = new GSSolver();
  subSolver.iterations = 7;
  subSolver.tolerance = 0.1;

  const solver = new SplitSolver(subSolver);

  const world = new World({
    broadphase: new NaiveBroadphase(),
    gravity: GRAVITY_OF_YOLO,
    solver,
  });

  // Contact stiffness - use to make softer/harder contacts
  world.defaultContactMaterial.contactEquationStiffness = 1e9;

  // Stabilization time in number of timesteps
  world.defaultContactMaterial.contactEquationRelaxation = 4;

  // Disable friction by default
  world.defaultContactMaterial.friction = 0;

  // Sweep and prune broadphase
  world.broadphase = new SAPBroadphase(world);

  return world;
};
