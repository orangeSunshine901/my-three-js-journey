import { useRef } from "react";
import {
  OrbitControls,
  Html,
  Text,
  Float,
  MeshReflectorMaterial,
} from "@react-three/drei";
import { useControls } from "leva";
import { Perf } from "r3f-perf";

export default function Experience() {
  const cube = useRef();

  return (
    <>
      <Perf position="top-left" />
      <OrbitControls enableDamping={true} makeDefault />
      <directionalLight position={[1, 2, 3]} color="pink" intensity={1.9} />
      <ambientLight intensity={0.1} />

      <mesh position={[0, 0, 0]} scale={1.2} ref={cube}>
        <boxGeometry />
        <meshNormalMaterial />
      </mesh>
    </>
  );
}
