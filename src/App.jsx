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
        flat //(Tone Mapping)
        dpr={[1, 2]} //Pixel Ratio an array can also be passed to limit the range like [1,2]
        gl={{
          toneMapping: THREE.CineonToneMapping, //Tone Mapping default
          outputColorSpace: THREE.SRGBColorSpace, //Output Encoding
        }}
      >
        <Experience />
      </Canvas>
    </>
  );
}

export default App;
