import { useRef } from "react";
import { OrbitControls, MeshReflectorMaterial } from "@react-three/drei";
import { Perf } from "r3f-perf";
import {
  Vignette,
  EffectComposer,
  Glitch,
  Noise,
  Bloom,
  DepthOfField,
} from "@react-three/postprocessing";
import { BlendFunction, GlitchMode } from "postprocessing";
import { useControls } from "leva";
import Drunk from "./Drunk";

export default function Experience() {
  const cube = useRef();
  const sphere = useRef();
  const drunkRef = useRef();

  const { blendModes } = useControls({
    blendModes: { options: BlendFunction },
  });

  return (
    <>
      <color args={["#FFFFFF"]} attach="background" />
      <EffectComposer multisampling={4}>
        {/* <Vignette offset={0.3} darkness={0.9} blendFunction={blendModes} /> */}
        {/* <Glitch
          delay={[0.5, 1]}
          duration={[0.1, 0.3]}
          strength={[0.2, 0.4]}
          mode={GlitchMode.CONSTANT_MILD}
          active={false}
          chromaticAberrationOffset={[5, 9]}
        /> */}
        {/* <Noise premultiply blendFunction={blendModes} /> */}
        {/* <Bloom mipmapBlur intensity={2} luminanceThreshold={0.5} />
        <DepthOfField focusDistance={0.02} focalLength={0.08} bokehScale={6} /> */}
        <Drunk
          ref={drunkRef}
          frequency={2}
          amplitude={0.1}
          blendFunction={BlendFunction.MULTIPLY}
        />
      </EffectComposer>
      <Perf position="top-left" />
      <OrbitControls enableDamping={true} makeDefault />
      <directionalLight position={[1, 2, 3]} color="pink" intensity={1.9} />
      <ambientLight intensity={0.1} />
      <mesh position={[1, 0, 0]} scale={1.2} ref={cube}>
        <boxGeometry />
        {/* <meshStandardMaterial
          color="red"
          emissive="orange"
          emissiveIntensity={2}
          toneMapped={false}
        /> */}
        <meshBasicMaterial color={[1.4, 1, 4]} toneMapped={false} />
      </mesh>
      <mesh position-x={-2} ref={sphere}>
        <sphereGeometry args={[1.4, 32, 32]} />
        <meshStandardMaterial color="#ff0000" />
      </mesh>
      <mesh position-y={-1} scale={10} rotation-x={-Math.PI * 0.5}>
        <planeGeometry />
        <MeshReflectorMaterial
          color="greenyellow"
          resolution="512"
          blur={[1000, 1000]}
          mixBlur={1}
          mirror={0.75}
          metalness={0}
        />
      </mesh>
    </>
  );
}
