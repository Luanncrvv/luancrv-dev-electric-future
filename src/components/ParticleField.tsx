import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function Particles() {
  const ref = useRef<THREE.Points>(null);
  const mouse = useRef({ x: 0, y: 0 });

  const { positions, count } = useMemo(() => {
    const count = 1800;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return { positions, count };
  }, []);

  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.04;
    ref.current.rotation.x += delta * 0.015;
    mouse.current.x = state.pointer.x;
    mouse.current.y = state.pointer.y;
    ref.current.rotation.y += (mouse.current.x * 0.3 - ref.current.rotation.y * 0.05) * 0.02;
    ref.current.rotation.x += (-mouse.current.y * 0.2 - ref.current.rotation.x * 0.05) * 0.02;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.025} color="#00AAFF" transparent opacity={0.85} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  );
}

function WireShape({ position, scale, geo }: { position: [number, number, number]; scale: number; geo: "box" | "octa" }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, d) => {
    if (!ref.current) return;
    ref.current.rotation.x += d * 0.3;
    ref.current.rotation.y += d * 0.2;
  });
  return (
    <mesh ref={ref} position={position} scale={scale}>
      {geo === "box" ? <boxGeometry args={[1, 1, 1]} /> : <octahedronGeometry args={[1, 0]} />}
      <meshBasicMaterial color="#0066FF" wireframe transparent opacity={0.5} />
    </mesh>
  );
}

export function ParticleField() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 70 }} dpr={[1, 1.5]}>
      <Particles />
      <WireShape position={[-3, 1.5, -2]} scale={0.7} geo="octa" />
      <WireShape position={[3, -1.5, -1]} scale={0.5} geo="box" />
      <WireShape position={[2.5, 2, -3]} scale={0.4} geo="octa" />
    </Canvas>
  );
}
