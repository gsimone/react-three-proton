import React, { Suspense } from "react";
import { EffectComposer, Noise } from "react-postprocessing";

function Effects() {
  return (
    <Suspense fallback={null}>
      <EffectComposer>
        <Noise opacity={0.02} />
      </EffectComposer>
    </Suspense>
  );
}

export default Effects;
