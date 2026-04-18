"use client";

import { Suspense, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { AdaptiveDpr, Center, Preload, useGLTF } from "@react-three/drei";
import type { Mesh } from "three";
import { Loader2 } from "lucide-react";

type ModelPreviewProps = {
  modelUrl: string;
  autoRotate?: boolean;
};

function PreviewModel({ modelUrl, autoRotate = true }: ModelPreviewProps) {
  const { scene } = useGLTF(modelUrl, "https://www.gstatic.com/draco/versioned/decoders/1.5.5/");
  
  // Clone scene so it doesn't affect other instances
  const clonedScene = useMemo(() => scene.clone(true), [scene]);

  useFrame((state) => {
    if (autoRotate && clonedScene) {
      clonedScene.rotation.y = state.clock.getElapsedTime() * 0.4;
    }
  });

  return <primitive object={clonedScene} />;
}

function PreviewFallback() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-zinc-900/20 backdrop-blur-sm">
      <Loader2 className="size-5 animate-spin text-cyan-500/50" />
    </div>
  );
}

export function ModelPreview({ modelUrl, autoRotate = true }: ModelPreviewProps) {
  return (
    <div className="h-full w-full">
      <Canvas
        camera={{ position: [0, 0, 4], fov: 40 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={1.2} />
          <pointLight position={[10, 10, 10]} intensity={1.5} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} />
          <Center top>
            <PreviewModel modelUrl={modelUrl} autoRotate={autoRotate} />
          </Center>
          <Preload all />
        </Suspense>
        <AdaptiveDpr pixelated />
      </Canvas>
    </div>
  );
}
