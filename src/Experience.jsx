import { useState, useRef, useEffect, Suspense } from "react";
import {
  OrbitControls,
  Text3D,
  Center,
  useMatcapTexture,
} from "@react-three/drei";
import { Perf } from "r3f-perf";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

//// Second way to avoid creating multiple instances of geometry, repeating ourselves, and to optimize.
const torusGeometry = new THREE.TorusGeometry(1, 0.6, 16, 32);
const material = new THREE.MeshMatcapMaterial();

export default function Experience() {
  // One way to avoid creating multiple instances of geometry, repeating ourselves, and to optimize.
  // const [torusGeometry, setTorusGeometry] = useState();
  // const [material, setMaterial] = useState();

  // Solution One for animating the elements by grouping and using it's children
  // const donutsGroup = useRef();

  // Solution Two for animating the elements by grouping and using it's children
  const donuts = useRef([]);

  const [matcapTexture] = useMatcapTexture("617586_23304C_1B1E30_4988CF", 256);
  // console.log(metcapTexture);

  // Second way to avoid creating multiple instances of geometry, repeating ourselves, and to optimize.
  useEffect(() => {
    matcapTexture.colorSpace = THREE.SRGBColorSpace;
    material.needsUpdate = true;

    material.matcap = matcapTexture;
    material.needsUpdate = true;
  }, []);

  useFrame((state, delta) => {
    // Solution One for animating the elements by grouping and using it's children
    // for (const donut of donutsGroup.current.children) {
    //   donut.rotation.y += delta * 0.8;
    // }
    for (const donut of donuts.current) {
      donut.rotation.y += delta * 0.8;
    }
  });

  return (
    <>
      <Perf position="top-left" />
      <OrbitControls enableDamping={true} makeDefault />
      <directionalLight position={[1, 2, 3]} color="pink" intensity={1.9} />
      <ambientLight intensity={0.1} />

      {/* To avoid creating multiple instances of geometry, repeating ourselves,
      and to optimize. */}
      {/* <torusGeometry ref={setTorusGeometry} args={[1, 0.6, 16, 32]} />
      <meshMatcapMaterial ref={setMaterial} matcap={metcapTexture} /> */}

      <Suspense>
        {/* 
        // Solution One for animating the elements by grouping and using it's children
        <group ref={donutsGroup}> */}
        {[...Array(100)].map((item, index) => (
          <mesh
            ref={(el) => (donuts.current[index] = el)}
            geometry={torusGeometry}
            material={material}
            key={index}
            position={[
              (Math.random() - 0.5) * 10,
              (Math.random() - 0.5) * 10,
              (Math.random() - 0.5) * 10,
            ]}
            scale={0.2 + Math.random() * 0.2}
            rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}
          >
            //TorusGeometry(radius : Float, tube : Float, radialSegments :
            Integer, tubularSegments : Integer, arc : Float)
          </mesh>
        ))}
        {/* </group> */}
      </Suspense>
      <Center>
        <Text3D
          font="./fonts/helvetiker_regular.typeface.json"
          size={0.75}
          height={0.2}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}
          material={material}
        >
          Hello You!
        </Text3D>
      </Center>
    </>
  );
}
