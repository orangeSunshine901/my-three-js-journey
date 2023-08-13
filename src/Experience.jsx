import { useRef, useState } from "react";
import {
  PresentationControls,
  Environment,
  useGLTF,
  OrbitControls,
  Float,
  ContactShadows,
  Html,
  Text,
} from "@react-three/drei";
import { Perf } from "r3f-perf";

export default function Experience() {
  const [mouseEnter, setMousedEnter] = useState(false);
  const macbook = useGLTF(
    "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf",
  );

  return (
    <>
      <color args={["#241a1a"]} attach="background" />
      <Environment preset="city" />

      <Perf position="top-left" />
      <PresentationControls
        global
        rotation={[0.13, 0.1, 0]}
        polar={[-0.4, 0.2]}
        azimuth={[-1, 0.75]}
        config={{ mass: 2, tension: 400 }}
        snap={{ mass: 4, tension: 400 }}
      >
        <Float rotationIntensity={0.4}>
          <rectAreaLight
            width={2.5}
            height={1.65}
            intensity={65}
            color={"FAFAFA"}
            rotation={[0.1, Math.PI, 0]}
            position={[0, 0.55, -1.15]}
          />
          <primitive object={macbook.scene} position-y={-1.2}>
            <Html
              transform
              wrapperClass="htmlScreen"
              distanceFactor={0.85}
              position={[0, 1.56, -1.4]}
              rotation-x={-0.256}
            >
              <iframe
                src="https://audiophile-ecomm-jet.vercel.app/"
                onMouseEnter={() => setMousedEnter(true)}
                onMouseLeave={() => setMousedEnter(false)}
              />
            </Html>
          </primitive>
          <Text
            rotation-y={-1.25}
            position={[2.8, 0.75, 0.75]}
            fontSize={1}
            font="./nunito-v25-latin-regular.woff"
            maxWidth={2}
            textAlign="center"
          >
            Latif Usman
          </Text>
        </Float>
      </PresentationControls>

      <ContactShadows position-y={-1.4} opacity={0.4} scale={5} blur={2.4} />
    </>
  );
}
