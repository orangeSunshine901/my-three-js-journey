// import CustomObject from "./CustomObject";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import {
  OrbitControls,
  Html,
  MeshReflectorMaterial,
  useHelper,
  BakeShadows,
  SoftShadows,
  AccumulativeShadows,
  RandomizedLight,
  ContactShadows,
  Sky,
  Environment,
  Lightformer,
  Sparkles,
  Stage,
} from "@react-three/drei";
import { Perf } from "r3f-perf";
import * as THREE from "three";
import { useControls } from "leva";

export default function Experience() {
  const directionalLight = useRef();
  useHelper(directionalLight, THREE.DirectionalLightHelper, 1);

  const cube = useRef();
  const sphere = useRef();

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;
    cube.current.rotation.y += delta * 0.2;
    // cube.current.position.x = Math.sin(time) + 2;
  });

  const { color, opacity, blur } = useControls("contact shadows", {
    color: "red",
    blur: {
      value: 4,
      min: 0,
      max: 10,
      step: 0.01,
    },
    opacity: {
      value: 0.6,
      min: 0,
      max: 1,
      step: 0.01,
    },
  });

  const { sunPosition } = useControls("sky", {
    sunPosition: { value: [1, 2, 3] },
  });

  const { envMapIntensity, envMapHeight, envMapRadius, envMapScale } =
    useControls("environment map", {
      envMapIntensity: { value: 7, min: 0, max: 12 },
      envMapHeight: { value: 7, min: 0, max: 100 },
      envMapRadius: { value: 28, min: 10, max: 1000 },
      envMapScale: { value: 100, min: 10, max: 1000 },
    });

  return (
    <>
      {/* <BakeShadows /> */}
      {/* <SoftShadows
        frustum={3.75}
        size={50}
        near={9.5}
        samples={17}
        rings={11}
      /> */}

      {/* <Environment
        // This is how you import env maps
        // files={"./environmentMaps/the_sky_is_on_fire_2k.hdr"}
        preset="sunset"
        // background
        ground={{
          height: envMapHeight,
          radius: envMapRadius,
          scale: envMapScale,
        }}
        // resolution={16}
      > */}
      {/* <color args={["black"]} attach="background" />
        <Lightformer
          intensity={1.25}
          rotation-x={Math.PI / 2}
          position={[0, 4, 2]}
          scale={[10, 10, 1]}
        />
        <Lightformer
          intensity={1.25}
          color="white"
          form="ring"
          position={[-1, 0, 0]}
          scale={[3, 3, 0]}
          target={[25, 0, 0]}
        /> */}
      {/* <mesh position-z={-5} scale={10}>
          <planeGeometry />
          <meshBasicMaterial color={[4, 0, 0]} />
        </mesh> */}
      {/* </Environment> */}

      <Perf position="top-left" />
      {/* <color args={["#242424"]} attach="background" /> */}
      <OrbitControls enableDamping={true} makeDefault />
      {/* <ContactShadows
        position={[0, 0, 0]}
        scale={10}
        resolution={512}
        far={5}
        color={color}
        blur={blur}
        opacity={opacity}
        // frames={1}
      /> */}
      {/* <AccumulativeShadows
        position={[0, -0.99, 0]}
        scale={10}
        color="#316d39"
        opacity={0.8}
        frames={Infinity}
        temporal
        blend={100}
      >
        <RandomizedLight
          amount={8}
          radius={1}
          ambient={0.5}
          intensity={1}
          position={[1, 2, 3]}
          bias={0.001}
        />
      </AccumulativeShadows> */}
      {/* <directionalLight
        ref={directionalLight}
        position={sunPosition}
        intensity={1.9}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={1}
        shadow-camera-far={10}
        shadow-camera-top={10}
        shadow-camera-right={10}
        shadow-camera-bottom={-10}
        shadow-camera-left={-10}
      />
      <ambientLight intensity={0.1} /> */}
      {/* <Sky sunPosition={sunPosition} /> */}
      {/* <mesh position={[2, 1, 0]} scale={1.2} ref={cube} castShadow>
        <boxGeometry />
        <meshPhysicalMaterial
          emissive="pink"
          color="pink"
          envMapIntensity={envMapIntensity}
          roughness={0}
        />
        <Sparkles
          count={3}
          scale={1 * 3}
          position-y={0.2}
          size={10}
          speed={0.01}
        />
      </mesh>
      <mesh position-x={-2} position-y={1.3} ref={sphere} castShadow>
        <sphereGeometry args={[1, 50, 50]} />
        <meshStandardMaterial
          color="#ff0000"
          envMapIntensity={envMapIntensity}
        />
        <Html
          position={[1, 1, 0]}
          wrapperClass="label"
          center
          distanceFactor={6}
          occlude={[sphere, cube]}
        >
          That's a sphere
        </Html>
      </mesh> */}
      <color args={["lightblue"]} attach="background" />
      <Stage
        shadows={{
          type: "contact",
          opacity: 0.1,
          blur: 3,
        }}
        environment="night"
        preset="portrait"
      >
        <mesh position={[2, 1, 0]} scale={1.2} ref={cube} castShadow>
          <boxGeometry />
          <meshPhysicalMaterial
            emissive="blue"
            color="blue"
            envMapIntensity={envMapIntensity}
            roughness={0}
          />
          <Sparkles
            count={3}
            scale={1 * 3}
            position-y={0.2}
            size={10}
            speed={0.01}
          />
        </mesh>
        <mesh position-x={-2} position-y={1.3} ref={sphere} castShadow>
          <sphereGeometry args={[1, 50, 50]} />
          <meshStandardMaterial
            color="#ff0000"
            envMapIntensity={envMapIntensity}
          />
        </mesh>
      </Stage>
      {/* <mesh
        position-y={0}
        scale={10}
        rotation-x={-Math.PI * 0.5}
        // receiveShadow
      >
        <planeGeometry />
        <meshStandardMaterial />
        <MeshReflectorMaterial
          color="greenyellow"
          resolution="512"
          blur={[1000, 1000]}
          mixBlur={1}
          mirror={0.75}
          envMapIntensity={envMapIntensity}
        />
      </mesh> */}
    </>
  );
}
