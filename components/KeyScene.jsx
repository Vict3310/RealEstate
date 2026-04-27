"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useFBX, useTexture, Stage, OrbitControls, PerspectiveCamera, Html } from "@react-three/drei";
import { Suspense, useRef, useMemo } from "react";
import * as THREE from "three";

function KeyModel() {
  const fbx = useFBX("/SkeletonKey/SkeletonKey.fbx");
  const meshRef = useRef();

  // Load textures using the optimized drei hook
  const textures = useTexture({
    map: "/SkeletonKey/Mat_Base_Color.png",
    roughnessMap: "/SkeletonKey/Mat_Roughness.png",
    metalnessMap: "/SkeletonKey/Mat_Metallic.png",
  });

  // Apply textures to the model
  useMemo(() => {
    fbx.traverse((child) => {
      if (child.isMesh) {
        child.material.map = textures.map;
        child.material.roughnessMap = textures.roughnessMap;
        child.material.metalnessMap = textures.metalnessMap;
        
        // Ensure standard material properties are set for the maps to work
        child.material.metalness = 1; 
        child.material.roughness = 1;
        child.material.needsUpdate = true;
      }
    });
  }, [fbx, textures]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.3;
    }
  });

  return <primitive ref={meshRef} object={fbx} scale={0.01} />;
}

export default function KeyScene() {
  return (
    <div className="w-full h-[600px] cursor-grab active:cursor-grabbing">
      <Canvas shadows dpr={[1, 2]}>
        <Suspense fallback={<Html center><div className="text-offwhite/50 font-sans text-xs uppercase tracking-widest whitespace-nowrap">Unlocking Scene...</div></Html>}>
          <Stage environment="city" intensity={0.5} contactShadow={true} shadowBias={-0.001}>
            <KeyModel />
          </Stage>
        </Suspense>
        <OrbitControls enableZoom={false} autoRotate={false} />
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      </Canvas>
    </div>
  );
}
