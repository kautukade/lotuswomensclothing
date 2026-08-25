import { Suspense, Component, useMemo, useRef, type ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

class CanvasBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

function usePetalGeometry() {
  return useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.bezierCurveTo(0.44, 0.16, 0.52, 0.92, 0, 1.52);
    shape.bezierCurveTo(-0.52, 0.92, -0.44, 0.16, 0, 0);
    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: 0.012,
      bevelEnabled: true,
      bevelThickness: 0.008,
      bevelSize: 0.01,
      bevelSegments: 2,
      steps: 1,
    });
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const t = Math.min(1, Math.max(0, y / 1.52));
      pos.setZ(i, pos.getZ(i) + Math.sin(t * Math.PI) * 0.14 - x * x * 0.6);
    }
    geo.computeVertexNormals();
    return geo;
  }, []);
}

function PetalRing({ count, tilt, scale, color, y = 0, jitter = 0 }: {
  count: number; tilt: number; scale: number; color: string; y?: number; jitter?: number;
}) {
  const geo = usePetalGeometry();
  const petals = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        angle: (i / count) * Math.PI * 2 + (jitter ? ((i * 137.5) % 10) / 40 : 0),
        s: scale * (1 - jitter + (((i * 31) % 7) / 100) * jitter * 3),
      })),
    [count, scale, jitter]
  );
  return (
    <group position={[0, y, 0]}>
      {petals.map((p, i) => (
        <group key={i} rotation={[0, p.angle, 0]}>
          <group rotation={[tilt, 0, 0]} scale={p.s}>
            <mesh geometry={geo}>
              <meshStandardMaterial color={color} roughness={0.42} metalness={0.1} side={THREE.DoubleSide} />
            </mesh>
          </group>
        </group>
      ))}
    </group>
  );
}

function SeedPod() {
  return (
    <group position={[0, 0.42, 0]}>
      <mesh>
        <sphereGeometry args={[0.19, 24, 24]} />
        <meshStandardMaterial color="#d8a94f" roughness={0.28} metalness={0.85} />
      </mesh>
      {Array.from({ length: 8 }, (_, i) => {
        const a = (i / 8) * Math.PI * 2;
        return (
          <mesh key={i} position={[Math.cos(a) * 0.13, 0.14, Math.sin(a) * 0.13]}>
            <sphereGeometry args={[0.045, 12, 12]} />
            <meshStandardMaterial color="#e9c377" roughness={0.3} metalness={0.9} />
          </mesh>
        );
      })}
    </group>
  );
}

function LotusBloom() {
  const group = useRef<THREE.Group>(null);
  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    g.rotation.y += delta * 0.16;
    g.position.y = Math.sin(t * 0.55) * 0.13;
    g.rotation.x += (-state.pointer.y * 0.16 - g.rotation.x) * 0.045;
    g.rotation.z += (state.pointer.x * 0.1 - g.rotation.z) * 0.045;
  });
  return (
    <group ref={group} position={[0, -0.55, 0]}>
      <PetalRing count={12} tilt={1.22} scale={1.06} color="#d18ca2" jitter={1} />
      <PetalRing count={8} tilt={0.88} scale={0.88} color="#e2a5b7" jitter={1} />
      <PetalRing count={5} tilt={0.52} scale={0.66} color="#f3cbD6" />
      <SeedPod />
    </group>
  );
}

function GoldenDust({ count }: { count: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 2.1 + Math.random() * 1.9;
      const theta = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.35) * 3.4;
      arr[i * 3] = Math.cos(theta) * r;
      arr[i * 3 + 1] = y;
      arr[i * 3 + 2] = Math.sin(theta) * r;
    }
    return arr;
  }, [count]);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.03;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.035} color="#e3bd85" transparent opacity={0.75} sizeAttenuation depthWrite={false} />
    </points>
  );
}

export default function LotusHero({ className }: { className?: string }) {
  const isMobile = useMemo(() => (typeof window !== "undefined" ? window.innerWidth < 768 : false), []);
  return (
    <div className={className} aria-hidden>
      <CanvasBoundary>
        <Canvas dpr={[1, 1.8]} camera={{ position: [0, 0.9, 5.4], fov: 36 }} gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.9} color="#fff3e6" />
            <directionalLight position={[4, 6, 3]} intensity={1.2} color="#ffe7cd" />
            <pointLight position={[-3.5, 2.5, -2]} intensity={0.9} color="#e8b877" />
            <pointLight position={[0, -1.5, 2.6]} intensity={0.4} color="#d98ba3" />
            <LotusBloom />
            <GoldenDust count={isMobile ? 70 : 150} />
          </Suspense>
        </Canvas>
      </CanvasBoundary>
    </div>
  );
}
