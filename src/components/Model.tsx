import { Suspense, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

const present: string[] = [];
export function Model() {
  return (
    <div className="w-screen h-screen -z-10 fixed">
      <Canvas camera={{ position: [0, 0, -5] }}>
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
  const mixer = useMemo(() => new THREE.AnimationMixer(scene), [scene]);
  const clips = useMemo(
    () => animations.map((clip) => mixer.clipAction(clip)),
    [animations, mixer]
  );

  useEffect(() => {
    const iobs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const animationNumber = Number(
            entry.target.getAttribute("data-animation")
          );
          clips.forEach((clip, i) => {
            if (i === animationNumber) {
              clip.play();
            } else {
              clip.stop();
            }
          });
        });
      },
      {
        threshold: 0.5,
      }
    );
    document.querySelectorAll("[data-animation]").forEach((element) => {
      iobs.observe(element);
    });

    return () => {
      iobs.disconnect();
    };
  }, [clips, mixer]);

  clips[0].play();
  useFrame((state, delta) => {
    mixer.update(delta);
  });
  return <primitive object={scene} />;
}
