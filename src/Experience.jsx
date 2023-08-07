import { Suspense } from "react";
import { OrbitControls, MeshReflectorMaterial } from "@react-three/drei";
import { useControls } from "leva";
import { Perf } from "r3f-perf";
import Model from "./Model";
import Placeholder from "./Placeholder";
import Hamburger from "./Hamburger";
import Fox from "./Fox";

export default function Experience() {
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
      <OrbitControls enableDamping={true} makeDefault />
      <directionalLight
        position={[1, 2, 3]}
        color="pink"
        intensity={1.9}
        castShadow
        shadow-normalBias={0.04}
      />

      <ambientLight intensity={0.1} />

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
      <Suspense fallback={<Placeholder position-y={0.5} scale={[2, 3, 2]} />}>
        {/* <Model /> */}
        <Hamburger scale={0.35} />
        <Fox />
      </Suspense>
    </>
  );
}
