"use client";

import {
  Component,
  type ReactNode,
  type RefObject,
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { AdaptiveDpr, Center, OrbitControls, Preload, useGLTF } from "@react-three/drei";
import type { Group } from "three";

// ─── Error Boundary ──────────────────────────────────────────────────────────
// Prevents a failed useGLTF (e.g. 404) from crashing the entire React tree.

type ErrorBoundaryState = { hasError: boolean };

class PreviewErrorBoundary extends Component<
  { fallback: ReactNode; children: ReactNode },
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch() {
    // Silently absorb — a missing preview model should never crash the page
  }

  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

// ─── Types ───────────────────────────────────────────────────────────────────

type ModelPreviewProps = {
  modelUrl: string;
  autoRotate?: boolean;
};

// ─── 3D Model Component ──────────────────────────────────────────────────────

function PreviewModel({ modelUrl, autoRotate = true }: ModelPreviewProps) {
  const { scene } = useGLTF(modelUrl, "https://www.gstatic.com/draco/versioned/decoders/1.5.5/");
  const groupRef = useRef<Group>(null);

  const clonedScene = useMemo(() => scene.clone(true), [scene]);

  useFrame(() => {
    if (autoRotate && groupRef.current) {
      groupRef.current.rotation.y += 0.01;
    }
  });

  // Cleanup to prevent memory leaks
  useEffect(() => {
    return () => {
      clonedScene.traverse((object) => {
        const mesh = object as any;
        if (mesh.isMesh) {
          mesh.geometry.dispose();
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach((m: any) => m.dispose());
          } else {
            mesh.material.dispose();
          }
        }
      });
    };
  }, [clonedScene]);

  return (
    <group ref={groupRef}>
      <primitive object={clonedScene} />
    </group>
  );
}

// ─── Fallback UI ─────────────────────────────────────────────────────────────

function PreviewUnavailable() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-zinc-950/60">
      <span className="text-xs text-zinc-500">Preview unavailable</span>
    </div>
  );
}

// ─── Main Export ─────────────────────────────────────────────────────────────

export function ModelPreview({ modelUrl, autoRotate = true }: ModelPreviewProps) {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-full w-full bg-zinc-900/10" />;
  }

  return (
    <PreviewErrorBoundary fallback={<PreviewUnavailable />}>
      <div ref={containerRef} className="h-full w-full">
        <Canvas
          camera={{ position: [0, 0, 4], fov: 40 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          frameloop="always"
          eventSource={containerRef as RefObject<HTMLElement>}
          eventPrefix="client"
        >
          <Suspense fallback={null}>
            <ambientLight intensity={1.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} />
            <Center top>
              <PreviewModel modelUrl={modelUrl} autoRotate={autoRotate} />
            </Center>
            <Preload all />
          </Suspense>
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate={false}
          />
          <AdaptiveDpr pixelated />
        </Canvas>
      </div>
    </PreviewErrorBoundary>
  );
}
