import { OrbitControls, useGLTF } from "@react-three/drei";
import { Perf } from "r3f-perf";
import {
  BallCollider,
  CuboidCollider,
  CylinderCollider,
  Physics,
  RigidBody,
  InstancedRigidBodies,
} from "@react-three/rapier";
import { useState, useRef, useEffect, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Experience() {
  const cube = useRef();
  const twister = useRef();
  // const cubes = useRef();

  // const [hitSound] = useState(() => new Audio("./hit.mp3"));

  const cubeJump = () => {
    const mass = cube.current.mass();
    cube.current.applyImpulse({ x: 0, y: 5 * mass, z: 0 });
    cube.current.applyTorqueImpulse({ x: 0, y: 1, z: 0 });
    console.log("Hello");
  };

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    const eulerRotation = new THREE.Euler(0, time * 3, 0);
    const quaternionRotation = new THREE.Quaternion();
    quaternionRotation.setFromEuler(eulerRotation);
    twister.current.setNextKinematicRotation(quaternionRotation);

    const angle = time * 0.5;
    const x = Math.cos(angle);
    const z = Math.sin(angle);
    twister.current.setNextKinematicTranslation({ x, y: -0.8, z });
  });

  const collisionEnter = () => {
    hitSound.currentTime = 0;
    hitSound.volume = Math.random();
    hitSound.play();
  };

  const model = useGLTF("./hamburger.glb");

  // R3F way of creating instance meshes

  const cubesCount = 100;

  // useEffect(() => {
  //   for (let i = 0; i < cubesCount; i++) {
  //     const matrix = new THREE.Matrix4();
  //     matrix.compose(
  //       new THREE.Vector3(i * 2, 0, 0),
  //       new THREE.Quaternion(),
  //       new THREE.Vector3(1, 1, 1),
  //     );
  //     cubes.current.setMatrixAt(i, matrix);
  //   }
  // }, []);

  // R3F way of creating instance meshes

  // Creating instances with Rapier

  const instances = useMemo(() => {
    const instances = [];

    for (let i = 0; i < cubesCount; i++) {
      instances.push({
        key: "instance_" + i,
        position: [
          (Math.random() - 0.4) * 8,
          6 + i * 0.2,
          (Math.random() - 0.4) * 8,
        ],
        rotation: [Math.random(), Math.random(), Math.random()],
      });
    }

    return instances;
  }, []);

  return (
    <>
      <Perf position="top-left" />

      <OrbitControls makeDefault />

      <directionalLight castShadow position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />
      <Physics
      // debug
      // gravity={[0, -9.18, 0]}
      >
        <RigidBody colliders="ball">
          <mesh castShadow position={[-1.5, 2, 0]}>
            <sphereGeometry />
            <meshStandardMaterial color="orange" />
          </mesh>
        </RigidBody>
        {/* <RigidBody
          colliders={false}
          position={[0, 1, 0]}
          rotation-x={Math.PI / 2}
        >
          <CuboidCollider args={[1.5, 1.5, 0.5]} />
          <CuboidCollider args={[0.25, 1, 0.25]} />
          <mesh castShadow>
            <torusGeometry args={[1, 0.5, 16, 32]} />
            <meshStandardMaterial color="mediumpurple" />
          </mesh>
        </RigidBody> */}
        <RigidBody
          ref={cube}
          position={[1.5, 2, 0]}
          // gravityScale={0.2}
          colliders={false}
          onCollisionEnter={collisionEnter}
        >
          <mesh castShadow onClick={cubeJump} friction={0.7}>
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" />
          </mesh>
          <CuboidCollider mass={0.5} args={[0.5, 0.5, 0.5]} />
        </RigidBody>

        <RigidBody
          position={[0, -0.8, 0]}
          friction={0}
          type="kinematicPosition"
          ref={twister}
        >
          <mesh castShadow scale={[0.4, 0.4, 3]}>
            <boxGeometry />
            <meshStandardMaterial color="pink" />
          </mesh>
        </RigidBody>

        <RigidBody type="fixed" restitution={1} friction={0.7}>
          <mesh receiveShadow position-y={-1.25}>
            <boxGeometry args={[10, 0.5, 10]} />
            <meshStandardMaterial color="greenyellow" />
          </mesh>
        </RigidBody>

        <RigidBody colliders={false} position={[0, 4, 0]}>
          <primitive scale={0.25} object={model.scene}></primitive>
          <CylinderCollider args={[0.5, 1.25]} />
        </RigidBody>

        <RigidBody type="fixed">
          <CuboidCollider args={[5, 2, 0.5]} position={[0, 1, 5.5]} />
          <CuboidCollider args={[5, 2, 0.5]} position={[0, 1, -5.5]} />
          <CuboidCollider args={[0.5, 2, 5]} position={[5.5, 1, 0]} />
          <CuboidCollider args={[0.5, 2, 5]} position={[-5.5, 1, 0]} />
        </RigidBody>

        {/* // R3F way of creating instance meshes */}
        {/* <instancedMesh ref={cubes} args={[null, null, cubesCount]}>
          <boxGeometry />
          <meshStandardMaterial color="tomato" />
        </instancedMesh> */}
        {/* // R3F way of creating instance meshes */}

        <InstancedRigidBodies instances={instances}>
          <instancedMesh args={[null, null, cubesCount]}>
            <boxGeometry />
            <meshStandardMaterial color="tomato" />
          </instancedMesh>
        </InstancedRigidBodies>
      </Physics>
    </>
  );
}
