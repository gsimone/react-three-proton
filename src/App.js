import React, { Suspense, useState } from "react";
import { Canvas } from "react-three-fiber";
import { OrbitControls } from "drei";

import Particles from './Particles'

function App() {

  return (
    <Canvas
      camera={{ position: [0, 0, 500], far: 1000 }}
      gl={{
        powerPreference: 'high-performance',
        alpha: false,
        antialias: false,
        stencil: false,
        depth: false,
      }}
    >
      <color args={["#010101"]} attach="background" />
      <Effects />
      <OrbitControls />
      <Suspense fallback={null}>
        <Particles />
      </Suspense>
      <ambientLight />
      <pointLight position={[0, 200, 200]} />
    </Canvas>
  );
}

export default App;
