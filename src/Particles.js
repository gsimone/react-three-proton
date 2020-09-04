import Proton from 'three.proton.js'
import * as THREE from 'three';

import React, { useEffect, useRef, useContext } from 'react'
import { useFrame, useResource, useThree } from 'react-three-fiber';

import dot from './dot'
import { useTextureLoader } from 'drei';


import { 
  myCtx,
  Emitter,
  Body,
  Mass,
  Velocity,
  Radius,
  Life,
  Position
 } from './stuff'

function CustomSettings() {
    
  const { scene } = useThree()
  const { emitter } = useContext(myCtx)

  useEffect(() => {
    emitter.addBehaviour(new Proton.RandomDrift(30, 30, 30, .05));
    emitter.addBehaviour(new Proton.Scale(1, 0.5));
    emitter.addBehaviour(new Proton.Alpha(1, 0, Infinity, Proton.easeInQuart));
  
    emitter.addBehaviour(
      new Proton.Color(0xff0000, "random", Infinity, Proton.easeOutQuart)
    );

  }, [scene, emitter])
  return null
}
  
export default function ParticleSystem() {
  const dotMap = useTextureLoader(dot)
  const [$sprite, sprite] = useResource()

  const $emitter = useRef()

  useFrame(({ mouse }) => {
    $emitter.current.p.x = mouse.x * 500
    $emitter.current.p.y = mouse.y * 500
  })

  return (
    <>
    <sprite ref={$sprite}>
      <spriteMaterial map={dotMap} color={0xff00000} blending={THREE.AdditiveBlending} />
    </sprite>
    <Emitter 
      ref={$emitter} 
      renderer={Proton.SpriteRender} 
      position={[0, 0, 0]}
      rate={[[4,5], [0.01, 0.02]]}
    >
      {/*  Init */}
      {sprite && <Body args={[sprite]} />}
      <Position args={[new Proton.SphereZone(20)]} />
      <Mass args={[1]} />
      <Velocity args={[200, new Proton.Vector3D(0, 0, -1), 15]} />
      <Radius radius-a={1} radius-b={40} />
      <Life args={[0.1, 1]} />
      <CustomSettings  />
    </Emitter>
    </>
  )
}
