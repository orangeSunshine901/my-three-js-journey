import { useRef, useState } from "react";
import {
  OrbitControls,
  Html,
  Text,
  Float,
  MeshReflectorMaterial,
  useGLTF,
  useCursor,
  meshBounds,
} from "@react-three/drei";
import { Perf } from "r3f-perf";

export default function Experience() {
  const cube = useRef();
  const [hover, setHover] = useState(false);

  const hamburger = useGLTF("./hamburger.glb");

  const colorRandom = () => {
    cube.current.material.color.set(`hsl(${Math.random() * 360}, 100%, 75%)`);
  };

  useCursor(hover);

  return (
    <>
      <OrbitControls enableDamping={true} makeDefault />
      <directionalLight position={[1, 2, 3]} color="pink" intensity={1.9} />
      <ambientLight intensity={0.1} />

      <mesh
        position-x={-2}
        position-y={0.4}
        raycast={meshBounds}
        onClick={(e) => e.stopPropagation()}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
      >
        <sphereGeometry args={[1.4, 32, 32]} />
        <meshStandardMaterial color="#ff0000" />
      </mesh>

      <mesh position={[2, 0, 0]} scale={1.2} ref={cube} onClick={colorRandom}>
        <boxGeometry />
        <meshStandardMaterial color="pink" />
      </mesh>

      <primitive
        object={hamburger.scene}
        scale={0.4}
        onClick={(e) => {
          e.stopPropagation();
          console.log(e.object.name);
        }}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
      ></primitive>

      <mesh position-y={-1} scale={10} rotation-x={-Math.PI * 0.5}>
        <planeGeometry />
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
