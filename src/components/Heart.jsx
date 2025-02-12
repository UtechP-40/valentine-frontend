import * as THREE from "three";
import { Float } from "@react-three/drei";

function Heart() {
  const heartShape = new THREE.Shape();

  // Generate a mathematically accurate heart shape
  for (let t = 0; t < Math.PI * 2; t += 0.1) {
    const x = 0.16 * Math.pow(Math.sin(t), 3);
    const y =
      0.13 * Math.cos(t) -
      0.05 * Math.cos(2 * t) -
      0.02 * Math.cos(3 * t) -
      0.01 * Math.cos(4 * t);
    heartShape.lineTo(x * 8, y * 8); // Adjusted scaling
  }

  // Create extruded 3D shape
  const geometry = new THREE.ExtrudeGeometry(heartShape, {
    depth: 0.5, // Reduced depth
    bevelEnabled: true,
    bevelSize: 0.2,
    bevelThickness: 0.2,
  });

  // Define material with a glowing effect
  const material = new THREE.MeshStandardMaterial({
    color: "#ff4d6d",
    roughness: 0.3,
    metalness: 0.6,
    emissive: "#ff2a55",
    emissiveIntensity: 0.7,
  });

  return (
    <Float speed={1.5} rotationIntensity={0.6} floatIntensity={1.5}>
      <mesh
        geometry={geometry}
        material={material}
        scale={1.5} // Adjusted to fit better
        position={[0, -1, 0]} // Centered heart
      />
    </Float>
  );
}

export default Heart;
