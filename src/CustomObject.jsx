import { useRef, useMemo, useEffect } from "react";
import * as THREE from "three";

export default function CustomObject() {
  const verticesCount = 10 * 3;

  const geometryRef = useRef();

  const positions = useMemo(() => {
    const positions = new Float32Array(verticesCount * 3);

    for (let i = 0; i < verticesCount * 3; i++) {
      positions[i] = (Math.random() - 0.1) * 3;
    }

    return positions;
  }, []);

  useEffect(() => {
    geometryRef.current.computeVertexNormals();
  }, []);

  return (
    <>
      <mesh>
        <bufferGeometry ref={geometryRef}>
          <bufferAttribute
            attach="attributes-position"
            count={verticesCount}
            itemSize={3}
            array={positions}
          />
        </bufferGeometry>
        <meshStandardMaterial side={THREE.DoubleSide} color="yellow" />
      </mesh>
      <mesh position-y={3}>
        <boxGeometry />
        <meshStandardMaterial color="magenta" />
      </mesh>
    </>
  );
}
