import { useRef } from "react";
import { OrbitControls, MeshReflectorMaterial } from "@react-three/drei";
import { Perf } from "r3f-perf";

export default function Experience() {
  const cube = useRef();
  const sphere = useRef();

  return (
    <>
      <Perf position="top-left" />
      <OrbitControls enableDamping={true} makeDefault />
      <directionalLight position={[1, 2, 3]} color="pink" intensity={1.9} />
      <ambientLight intensity={0.1} />
      <mesh position={[1, 0, 0]} scale={1.2} ref={cube}>
        <boxGeometry />
        <meshStandardMaterial color="pink" />
      </mesh>
      <mesh position-x={-2} ref={sphere}>
        <sphereGeometry args={[1.4, 32, 32]} />
        <meshStandardMaterial color="#ff0000" />
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
