import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { AnimationMixer, type AnimationAction } from "three";
import { useMediaQuery } from "@/utils/hooks/useMediaQuery";
import { useSection } from "./section";

export function Plague() {
  const { scene, animations } = useGLTF("/plague.glb");
  const mixer = useMemo(() => new AnimationMixer(scene), [scene]);
  const [clips, setClips] = useState<AnimationAction[]>();

  const nextAnimation = useRef<AnimationAction>();
  const lastAnimation = useRef<AnimationAction>();

  useEffect(() => {
    if (animations.length === 0) return;
    const sortedClips = animations
      .map((clip) => mixer.clipAction(clip))
      .sort((a, b) => a.getClip().name.localeCompare(b.getClip().name));
      sortedClips[2].repetitions = 1
    setClips(sortedClips);

    lastAnimation.current = sortedClips[0];
    const onFinish = (e) => {
      console.log(e);
      sortedClips[2].reset();
      
      sortedClips[2].play();

    };
    mixer.addEventListener("finished", onFinish);
    sortedClips[2].play();
    return () => {
      mixer.removeEventListener("finished", onFinish);
    };
  }, [animations]);

  const section = useSection();

  useEffect(() => {
    if (!clips) return;
    const newAnimation = clips[section];
    if (newAnimation === lastAnimation.current) return;
    lastAnimation.current?.fadeOut(0.2);
    newAnimation.reset();
    newAnimation.fadeIn(0.2);
    newAnimation.play();
    lastAnimation.current = newAnimation;
  }, [clips, mixer, section]);

  useFrame((state, delta) => {
    mixer.update(delta);
  });
  const matches = useMediaQuery("(min-width: 768px)");

  // const { plaguePosition } = useControls({
  //   plaguePosition: { value: [-3, 0, 0], min: -10, max: 10, step: 0.1 },
  // });
  const plaguePosition = [-3, 0, 0] as const;
  return (
    <group position={matches ? plaguePosition : [0, 0, 0]}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload("/plague.glb");
