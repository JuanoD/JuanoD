import { Suspense, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

const present: string[] = [];
export function Model() {
  useEffect(() => {
    const iobs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(...present);
          } else {
            entry.target.classList.remove(...present);
          }
        });
      },
      {
        threshold: 0.5,
      }
    );
    document.querySelectorAll("section").forEach((element) => {
      iobs.observe(element);
    });

    return () => {
      iobs.disconnect();
    };
  }, []);

  return (
    <div className="w-screen h-screen -z-10 fixed">
      <Canvas
        camera={{ position: [0, 0, -5] }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, -5]} decay={0.25} />
        <Suspense fallback={null}>
          <Plague />
        </Suspense>
      </Canvas>
    </div>
  );
}

function Plague() {
  const { scene, animations } = useGLTF("/plague.glb");
  const mixer = new THREE.AnimationMixer(scene);
  mixer.clipAction(animations[0]).play();
  useFrame((state,delta) => {
    mixer.update(delta);
  })
  return <primitive object={scene} />;
}
