import { Canvas } from "@react-three/fiber";
import "./App.css";
import Experience from "./Experience";
import * as THREE from "three";

function App() {
  // const created = ({ gl }) => {
  //   gl.setClearColor("#242424", 1);
  // };
  // const created = ({ scene }) => {
  //   scene.background = new THREE.Color("red");
  // };

  return (
    <>
      <Canvas
        // shadows //Commented for using Contact Shadow
        dpr={[1, 2]} //Pixel Ratio an array can also be passed to limit the range like [1,2]
        camera={{
          fov: 55,
          near: 0.1,
          far: 200,
          position: [0, 2, 9],
        }}
        // onCreated={created}
      >
        <Experience />
      </Canvas>
    </>
  );
}

export default App;
