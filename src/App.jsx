import { Canvas } from "@react-three/fiber";
import "./App.css";
import Experience from "./Experience";
import * as THREE from "three";
import { Leva } from "leva";

function App() {
  return (
    <>
      <Leva collapsed />
      <Canvas
        dpr={[1, 2]}
        gl={{
          toneMapping: THREE.CineonToneMapping, //Tone Mapping default
          outputColorSpace: THREE.SRGBColorSpace, //Output Encoding
        }}
        camera={{
          position: [0, 2, 9],
        }}
      >
        <Experience />
      </Canvas>
    </>
  );
}

export default App;
