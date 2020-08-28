import React, { Suspense } from "react";
import { Canvas } from "react-three-fiber";
import { OrbitControls } from "drei";
import Effects from "./Effects";
import Scene from "./Scene";

function App() {
  return (
    <Canvas
      shadowMap
      colorManagement
      camera={{ position: [0, 0, 5], far: 50 }}
      concurrent
    >
      <color args={["red"]} attach="background" />
      <Scene />
      <Effects />
      <OrbitControls />
    </Canvas>
  );
}

export default App;
