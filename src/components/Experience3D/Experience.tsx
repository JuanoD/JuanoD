import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Plague } from "./Plague";
import { CameraPosition, useUpdateSection } from "./section";
import { useControls, Leva } from "leva";

export function Experience() {
  useUpdateSection();
  const { decay, intensity } = useControls({
    decay: 0.35,
    intensity: 6,
  });

  const debug =
    typeof window !== "undefined" && window.location.hash === "#debug";

  return (
    <>
      <Leva hidden={!debug} />
      <div className="w-screen h-screen -z-10 fixed">
        <Canvas>
          <CameraPosition />
          <ambientLight intensity={0.5} />
          <pointLight
            position={[5, 5, -5]}
            decay={decay}
            intensity={intensity}
          />
          <Suspense fallback={null}>
            <Plague />
          </Suspense>
        </Canvas>
      </div>
    </>
  );
}
