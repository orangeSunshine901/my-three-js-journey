import React from "react";
// import { useLoader } from "@react-three/fiber";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { Clone, useGLTF } from "@react-three/drei";

export default function Model() {
  // Importing models using drei also supports DRACO
  const model = useGLTF("./hamburger-draco.glb");

  // Importing model using Three JS
  // const model = useLoader(GLTFLoader, "./hamburger.glb", (loader) => {
  //   const dracoLoader = new DRACOLoader();
  //   dracoLoader.setDecoderPath("./draco/");
  //   loader.setDRACOLoader(dracoLoader);
  // });
  return (
    <>
      <Clone object={model.scene} scale={0.35} position-x={-4} />
      <Clone object={model.scene} scale={0.35} position-x={0} />
      <Clone object={model.scene} scale={0.35} position-x={4} />
    </>
  );
}
