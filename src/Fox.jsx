import { useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useControls } from "leva";

export default function Fox() {
  const fox = useGLTF("./Fox/glTF/Fox.gltf");
  const animations = useAnimations(fox.animations, fox.scene);

  const { animationsName } = useControls({
    animationsName: {
      options: animations.names,
    },
  });

  useEffect(() => {
    const action = animations.actions[animationsName];
    action.reset().fadeIn(1.5).play();

    return () => {
      action.fadeOut(1.5);
    };
  }, [animationsName]);

  // window.setTimeout(() => {
  //   animations.actions.Walk.play();
  //   animations.actions.Walk.crossFadeFrom(animations.actions.Run, 1);
  // }, 2000);

  return (
    <primitive object={fox.scene} scale={0.04} position-x={0} position-y={-1} />
  );
}
