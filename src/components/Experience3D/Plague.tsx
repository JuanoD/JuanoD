import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { AnimationMixer, type AnimationAction } from "three";
import { useMediaQuery } from "@/utils/hooks/useMediaQuery";
import { useSection } from "./section";
import { useControls } from "leva";

export function Plague() {
  const { scene, animations } = useGLTF("/plague.glb");
  const mixer = useMemo(() => new AnimationMixer(scene), [scene]);
  const clips = useMemo(
    () => animations.map((clip) => mixer.clipAction(clip)),
    [animations, mixer]
  );

  const lastAnimation = useRef<AnimationAction>(
    (() => {
      clips[0].play();
      return clips[0];
    })()
  );

  const section = useSection();

  useEffect(() => {
    const newAnimation = clips[section];
    if (newAnimation === lastAnimation.current) return;
    lastAnimation.current.fadeOut(0.2);
    newAnimation.reset();
    newAnimation.fadeIn(0.2);
    newAnimation.play();
    lastAnimation.current = newAnimation;
  }, [clips, mixer, section]);

  useFrame((state, delta) => {
    mixer.update(delta);
  });
  const matches = useMediaQuery("(min-width: 768px)");

  const { plaguePosition } = useControls({
    plaguePosition: { value: [-3, 0, 0], min: -10, max: 10, step: 0.1 },
  });

  return (
    <group position={matches ? plaguePosition : [0, 0, 0]}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload("/plague.glb");
