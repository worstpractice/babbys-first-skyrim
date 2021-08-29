import { ContactMaterial, GSSolver, Material, NaiveBroadphase, SplitSolver, World } from 'cannon-es';
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

  const physicsMaterial = new Material('physics');
  const contactMaterial = new ContactMaterial(physicsMaterial, physicsMaterial, {
    friction: 0.1, // Create a slippery material (friction coefficient = 0.0)
    restitution: 0.3,
  });

  // We must add the contact materials to the world
  world.addContactMaterial(contactMaterial);

  return {
    physicsMaterial,
    world,
  } as const;
};
