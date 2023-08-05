import { useRef } from "react";
import {
  OrbitControls,
  Html,
  Text,
  Float,
  MeshReflectorMaterial,
} from "@react-three/drei";
import silkScreen from "/silkscreen-v1-latin-regular.woff?url";
import { useControls } from "leva";
import { Perf } from "r3f-perf";

console.log(silkScreen);

// Traditional way of using Orbit Controls
// extend({ OrbitControls });

export default function Experience() {
  // Traditional way of using Orbit Controls
  // const { camera, gl } = useThree();
  // const plane = useRef();
  /* *********************************** */
  // useFrame((state, delta) => {
  //   /* ************************************ */
  //   // Animating the plane
  //   // plane.current.rotation.y += delta;
  //   /* ************************************ */
  //   // Camera movement
  //   // const angle = state.clock.elapsedTime; //or getElapsedTime
  //   // state.camera.position.x = Math.sin(angle) * 8;
  //   // state.camera.position.z = Math.cos(angle) * 8;
  //   // state.camera.lookAt(0, 0, 0);
  //   /* ************************************ */
  // });

  const cube = useRef();
  const sphere = useRef();

  const { position, color, visible } = useControls({
    position: {
      value: { x: 2, y: 0 },
      min: 0,
      max: 9,
      step: 0.01,
      joystick: "invertY",
    },
    color: "pink",
    visible: true,
  });

  const { perfVisibility } = useControls({
    perfVisibility: true,
  });

  return (
    <>
      {perfVisibility && <Perf position="top-left" visible={perfVisibility} />}
      {/* 
      Traditional way of using Orbit Controls
      <orbitControls args={[camera, gl.domElement]} /> */}
      <OrbitControls enableDamping={true} makeDefault />
      <directionalLight
        position={[1, 2, 3]}
        color="pink"
        intensity={1.9}
        castShadow
      />
      {/* <group
      // ref={plane}
      ></group> */}
      <ambientLight intensity={0.1} />

      <mesh
        position={[position.x, position.y, 0]}
        scale={1.2}
        ref={cube}
        castShadow
      >
        <boxGeometry />
        <meshStandardMaterial color={color} />
      </mesh>

      <mesh
        position-x={-2}
        position-y={0.4}
        ref={sphere}
        visible={visible}
        castShadow
      >
        <sphereGeometry args={[1.4, 32, 32]} />
        <meshStandardMaterial color="#ff0000" />
        <Html
          position={[1, 1, 0]}
          wrapperClass="label"
          center
          distanceFactor={6}
          occlude={[sphere, cube]}
        >
          That's a sphere
        </Html>
      </mesh>

      <mesh
        position-y={-1}
        scale={10}
        rotation-x={-Math.PI * 0.5}
        receiveShadow
      >
        <planeGeometry />
        {/* <meshStandardMaterial /> */}
        <MeshReflectorMaterial
          color="greenyellow"
          resolution="512"
          blur={[1000, 1000]}
          mixBlur={1}
          mirror={0.75}
        />
      </mesh>
    </>
  );
}
