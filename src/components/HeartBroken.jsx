import * as THREE from "three";
import { Float } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

function HeartBroken() {
  const createHeartShape = (offsetX) => {
    const heartShape = new THREE.Shape();

    for (let t = 0; t < Math.PI * 2; t += 0.1) {
      const x = 0.16 * Math.pow(Math.sin(t), 3) + offsetX;
      const y =
        0.13 * Math.cos(t) -
        0.05 * Math.cos(2 * t) -
        0.02 * Math.cos(3 * t) -
        0.01 * Math.cos(4 * t);
      heartShape.lineTo(x * 8, y * 8);
    }

    return new THREE.ExtrudeGeometry(heartShape, {
      depth: 0.5,
      bevelEnabled: true,
      bevelSize: 0.2,
      bevelThickness: 0.2,
    });
  };

  const leftHeart = createHeartShape(-0.2);
  const rightHeart = createHeartShape(0.2);

  const material = new THREE.MeshStandardMaterial({
    color: "#ff4d6d",
    roughness: 0.3,
    metalness: 0.6,
    emissive: "#ff2a55",
    emissiveIntensity: 0.7,
  });

  return (
    <Canvas className="fixed top-0 left-0 w-full h-full z-0">
      <Float speed={1.5} rotationIntensity={0.6} floatIntensity={1.5}>
        {/* Left half of broken heart */}
        <mesh
          geometry={leftHeart}
          material={material}
          scale={1.5}
          position={[-0.8, -1, 0]}
          rotation={[0, 0, -0.2]} // Tilted away slightly
        />

        {/* Right half of broken heart */}
        <mesh
          geometry={rightHeart}
          material={material}
          scale={1.5}
          position={[0.8, -1, 0]}
          rotation={[0, 0, 0.2]} // Tilted away slightly
        />
      </Float>
    </Canvas>
  );
}

export default HeartBroken;
