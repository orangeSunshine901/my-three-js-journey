import { Canvas } from "@react-three/fiber";
import "./App.css";
import Experience from "./Experience";
import * as THREE from "three";
import { Leva } from "leva";

function App() {
  return (
    <>
      <Leva collapsed />
      <Canvas>
        <Experience />
      </Canvas>
    </>
  );
}

export default App;
