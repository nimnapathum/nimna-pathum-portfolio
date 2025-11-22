"use client";
import React, { Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls, Center } from "@react-three/drei";

function FellowshipModel() {
  useEffect(() => {
    console.log("FellowshipModel component mounted");
    console.log("Attempting to load: /fellowship.glb");
  }, []);

  const gltf = useGLTF("/fellowship.glb", true, true, () => {
    console.log("GLTF Loader initialized");
  });

  useEffect(() => {
    if (gltf.scene) {
      console.log("Model loaded successfully:", gltf);
    }
  }, [gltf]);

  return (
    <Center>
      <primitive object={gltf.scene} scale={2} />
    </Center>
  );
}

// Preload the model
if (typeof window !== "undefined") {
  console.log(
    "Preloading fellowship.glb from:",
    window.location.origin + "/fellowship.glb"
  );
  useGLTF.preload("/fellowship.glb");
}

const LoadingComponent: React.FC = () => {
  useEffect(() => {
    console.log("LoadingComponent mounted");
  }, []);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "var(--background)",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          color: "white",
          zIndex: 1000,
          fontSize: "24px",
        }}
      >
        Loading Component Active
      </div>
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} />
        <directionalLight position={[-5, -5, -5]} intensity={0.5} />
        <Suspense
          fallback={
            <mesh>
              <boxGeometry args={[1, 1, 1]} />
              <meshStandardMaterial color="hotpink" />
            </mesh>
          }
        >
          <FellowshipModel />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default LoadingComponent;
