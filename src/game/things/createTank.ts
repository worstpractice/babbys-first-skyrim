import type { World } from 'cannon-es';
import { Body, Box, ContactMaterial, Cylinder, Material, Quaternion, RaycastVehicle, Vec3 } from 'cannon-es';
import { PASSIVE } from 'src/constants/event-listener-options/PASSIVE';
import { FACING_UPRIGHT } from 'src/game/constants/FACING_UPRIGHT';

type Props = {
  readonly groundMaterial: Material;
  readonly world: World;
};

export const createTank = ({ groundMaterial, world }: Props) => {
  const chassis = new Body({
    angularVelocity: new Vec3(0, 0.5, 0),
    mass: 150,
    position: new Vec3(0, 4, 0),
    shape: new Box(new Vec3(2, 0.5, 1)),
  });

  world.addBody(chassis);

  // Create the tank
  const tank = new RaycastVehicle({
    chassisBody: chassis,
  });

  const wheelOptions = {
    axleLocal: new Vec3(0, 0, 1),
    chassisConnectionPointLocal: new Vec3(-1, 0, 1),
    customSlidingRotationalSpeed: -30,
    dampingCompression: 4.4,
    dampingRelaxation: 2.3,
    directionLocal: new Vec3(0, -1, 0),
    frictionSlip: 1.4,
    maxSuspensionForce: 100_000,
    maxSuspensionTravel: 0.3,
    radius: 0.5,
    rollInfluence: 0.01,
    suspensionRestLength: 0.3,
    suspensionStiffness: 30,
    useCustomSlidingRotationalSpeed: true,
  };

  wheelOptions.chassisConnectionPointLocal.set(-1, 0, 1);
  tank.addWheel(wheelOptions);

  wheelOptions.chassisConnectionPointLocal.set(-1, 0, -1);
  tank.addWheel(wheelOptions);

  wheelOptions.chassisConnectionPointLocal.set(1, 0, 1);
  tank.addWheel(wheelOptions);

  wheelOptions.chassisConnectionPointLocal.set(1, 0, -1);
  tank.addWheel(wheelOptions);

  tank.addToWorld(world);

  // Add the wheel bodies
  const wheelBodies: Body[] = [];
  const wheelMaterial = new Material('wheel');

  for (const wheel of tank.wheelInfos) {
    const cylinderShape = new Cylinder(wheel.radius, wheel.radius, wheel.radius / 2, 20);
    const wheelBody = new Body({
      collisionFilterGroup: 0, // turn off collisions
      mass: 0,
      material: wheelMaterial,
      quaternion: new Quaternion().setFromEuler(FACING_UPRIGHT, 0, 0),
      type: Body.KINEMATIC,
    });

    wheelBody.addShape(cylinderShape, new Vec3(), wheelBody.quaternion);

    wheelBodies.push(wheelBody);

    world.addBody(wheelBody);
  }

  // Define interactions between wheels and ground
  const wheel_ground = new ContactMaterial(wheelMaterial, groundMaterial, {
    contactEquationStiffness: 1000,
    friction: 0.3,
    restitution: 0,
  });

  world.addContactMaterial(wheel_ground);

  // Update the wheel bodies
  world.addEventListener('postStep', () => {
    for (let i = 0; i < tank.wheelInfos.length; i++) {
      tank.updateWheelTransform(i);

      const wheelInfo = tank.wheelInfos[i] as typeof tank.wheelInfos[number];
      const transform = wheelInfo.worldTransform;
      const wheelBody = wheelBodies[i] as typeof wheelBodies[number];

      wheelBody.position.copy(transform.position);
      wheelBody.quaternion.copy(transform.quaternion);
    }
  });

  // Keybindings
  // Add force on keydown
  document.addEventListener(
    'keydown',
    ({ key }) => {
      const maxSteerVal = 1;
      const maxForce = 1000;
      const brakeForce = 1_000_000;

      switch (key) {
        case 'w': {
          tank.applyEngineForce(-maxForce, 2);
          tank.applyEngineForce(-maxForce, 3);
          break;
        }

        case 's': {
          tank.applyEngineForce(maxForce, 2);
          tank.applyEngineForce(maxForce, 3);
          break;
        }

        case 'a': {
          tank.setSteeringValue(maxSteerVal, 0);
          tank.setSteeringValue(maxSteerVal, 1);
          break;
        }

        case 'd': {
          tank.setSteeringValue(-maxSteerVal, 0);
          tank.setSteeringValue(-maxSteerVal, 1);
          break;
        }

        case 'b': {
          tank.setBrake(brakeForce, 0);
          tank.setBrake(brakeForce, 1);
          tank.setBrake(brakeForce, 2);
          tank.setBrake(brakeForce, 3);
          break;
        }

        default: {
          //
        }
      }
    },
    PASSIVE,
  );

  // Reset force on keyup
  document.addEventListener(
    'keyup',
    ({ key }) => {
      switch (key) {
        case 'w': {
          tank.applyEngineForce(0, 2);
          tank.applyEngineForce(0, 3);
          break;
        }

        case 's': {
          tank.applyEngineForce(0, 2);
          tank.applyEngineForce(0, 3);
          break;
        }

        case 'a': {
          tank.setSteeringValue(0, 0);
          tank.setSteeringValue(0, 1);
          break;
        }

        case 'd': {
          tank.setSteeringValue(0, 0);
          tank.setSteeringValue(0, 1);
          break;
        }

        case 'b': {
          tank.setBrake(0, 0);
          tank.setBrake(0, 1);
          tank.setBrake(0, 2);
          tank.setBrake(0, 3);
          break;
        }
        default: {
          //
        }
      }
    },
    PASSIVE,
  );

  return tank;
};
