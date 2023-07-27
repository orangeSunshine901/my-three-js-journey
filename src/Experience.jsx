import { useRef } from "react";
import { useThree, extend, useFrame } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import CustomObject from "./CustomObject";

extend({ OrbitControls });

export default function Experience() {
  const { camera, gl } = useThree();
  const cube = useRef();

  useFrame((state, delta) => {
    cube.current.rotation.y += delta;
    // const angle = state.clock.elapsedTime; //or getElapsedTime
    // state.camera.position.x = Math.sin(angle) * 8;
    // state.camera.position.z = Math.cos(angle) * 8;
    // state.camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <orbitControls args={[camera, gl.domElement]} />
      <directionalLight position={[1, 2, 3]} color="pink" intensity={1.9} />
      <group ref={cube}>
        <ambientLight intensity={0.1} />

        <mesh
          rotation-y={Math.PI * 0.23}
          position-x={1}
          position-y={-0.38}
          scale={1.2}
        >
          <boxGeometry />
          <meshStandardMaterial color="pink" />
        </mesh>
        <mesh rotation-y={Math.PI * 0.23} position-x={-1} scale={0.7}>
          <sphereGeometry args={[1.4, 32, 32]} />
          <meshBasicMaterial color="#ff0000" />
        </mesh>
      </group>
      <mesh position-y={-1} scale={10} rotation-x={-Math.PI * 0.5}>
        <planeGeometry />
        <meshStandardMaterial />
      </mesh>
      <CustomObject />
    </>
  );
}
