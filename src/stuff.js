import Proton from 'three.proton.js'

import React, { useEffect, useMemo, createContext, useContext, forwardRef } from 'react'
import { useFrame, useThree } from 'react-three-fiber';

export const myCtx = createContext()

export const Emitter = forwardRef(function Emitter({ renderer, rate, children }, ref) {
  const proton = useMemo(() => new Proton(), [])
  const emitter = useMemo(() => new Proton.Emitter(), [])

  const { scene } = useThree()
  useEffect(() => {
    emitter.emit()
    Proton.Debug.drawEmitter(proton, scene, emitter)

    //add emitter
    proton.addEmitter(emitter);

    //add renderer
    proton.addRender(new renderer(scene));
  })

  useFrame(() => {
    proton.update();
  })

  useEffect(() => {
    emitter.rate = new Proton.Rate(...rate)
  }, [emitter, rate])

  return <>
    <myCtx.Provider value={{proton, emitter}}>{children}</myCtx.Provider>
    <primitive object={emitter} ref={ref} />
    </>
})

function makeInitializer(name) {

   return forwardRef(({ args, ...props }, ref) => {
        const { emitter } = useContext(myCtx)
        const initializer = useMemo(() => {

            if (args)  return new Proton[name](...args)
            return new Proton[name]()
            
        }, [args])
        
        useEffect(() => {
            emitter.addInitialize(initializer)
            
            return () => emitter.removeInitialize(initializer)
        }, [emitter, initializer])
        
        return <primitive object={initializer} ref={ref} {...props} />
    })

}

export const Radius = makeInitializer("Radius")
export const Mass = makeInitializer("Mass")
export const Velocity = makeInitializer("Velocity")
export const Body = makeInitializer("Body")
export const Life = makeInitializer("Life")
export const Position = makeInitializer("Position")
