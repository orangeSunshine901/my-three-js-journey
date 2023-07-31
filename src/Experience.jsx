// import CustomObject from "./CustomObject";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import {
  PivotControls,
  TransformControls,
  OrbitControls,
  Html,
  Text,
  Float,
  MeshReflectorMaterial,
} from "@react-three/drei";

export default function Experience() {
  const cube = useRef();
  const sphere = useRef();

  return (
    <>
      <OrbitControls enableDamping={true} makeDefault />

      <directionalLight position={[1, 2, 3]} color="pink" intensity={1.9} />

      <ambientLight intensity={0.1} />

      <mesh position={[position.x, position.y, 0]} scale={1.2} ref={cube}>
        <boxGeometry />
        <meshStandardMaterial color={color} />
      </mesh>

      <mesh position-x={-2} ref={sphere} visible={visible}>
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

      <mesh position-y={-1} scale={10} rotation-x={-Math.PI * 0.5}>
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
