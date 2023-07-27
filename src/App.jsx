import { Canvas } from "@react-three/fiber";
import "./App.css";
import Experience from "./Experience";
import * as THREE from "three";

function App() {
  return (
    <Canvas
      // flat (Tone Mapping)
      dpr={[1, 2]} //Pixel Ratio an array can also be passed to limit the range like [1,2]
      gl={{
        // antialias: false
        toneMapping: THREE.CineonToneMapping, //Tone Mapping default is ACESFilmicToneMapping
        outputColorSpace: THREE.SRGBColorSpace, //Output Encoding
      }}
      camera={{
        // fov: 75,
        // near: 0.1,
        // far: 200,
        position: [0, 2, 9],
      }}
    >
      <Experience />
    </Canvas>
  );
}

export default App;
