import { Suspense } from "react";
import { Canvas, extend } from "@react-three/fiber";
import { Plague } from "./Plague";
import { CameraPosition, useUpdateSection } from "./section";

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
  const intensity = 6

  return (
    <div className="w-screen h-screen -z-10 fixed">
      <Canvas>
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
