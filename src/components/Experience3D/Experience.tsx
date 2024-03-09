import { Suspense, lazy } from "react";
import { Canvas, extend } from "@react-three/fiber";
import { CameraPosition, useUpdateSection } from "./section";
import { AmbientLight, PointLight, Group } from "three";

const Plague = lazy(() =>
  import("./Plague").then((m) => ({ default: m.Plague }))
);

extend({ AmbientLight, PointLight, Group });

export function Experience() {
  const debug =
    typeof window !== "undefined" && window.location.hash === "#debug";

  return (
    <>
      {/* <Leva hidden={!debug} /> */}
      <UExperience />
    </>
  );
}

function UExperience() {
  useUpdateSection();
  // const { decay, intensity } = useControls({
  //   decay: 0.35,
  //   intensity: 6,
  // });

  const decay = 0.35;
  const intensity = 6;

  return (
    <div className="w-dvw h-dvh z-20 md:-z-10 fixed pointer-events-none">
      <Canvas style={{ "pointerEvents": "none"}}>
        <CameraPosition />
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, -5]} decay={decay} intensity={intensity} />
        <Suspense fallback={null}>
          <Plague />
        </Suspense>
      </Canvas>
    </div>
  );
}
