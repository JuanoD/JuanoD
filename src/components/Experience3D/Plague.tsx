import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import {
  AnimationMixer,
  type AnimationAction,
  type AnimationMixerEventMap,
  LoopOnce,
} from "three";
import { useMediaQuery } from "@/utils/hooks/useMediaQuery";
import { useSection } from "./section";
import { animate } from "popmotion";
import { useHideSVG } from "./useHideSVG";

type AnimationName =
  | "00TipHat"
  | "01Wave"
  | "02GrabFromHat"
  | "03AppearBalls"
  | "04Juggle";

const sectionToClip: Record<number, AnimationName> = {
  0: "01Wave",
  1: "03AppearBalls",
  2: "02GrabFromHat",
};

const sectionNext: Record<number, AnimationName | undefined> = {
  0: undefined,
  1: "04Juggle",
  2: "00TipHat",
};

type ClipsRecord = Record<AnimationName, AnimationAction>;

export function Plague() {
  const { scene, animations } = useGLTF("/plague.glb");
  const mixer = useMemo(() => new AnimationMixer(scene), [scene]);
  const clips = useRef<ClipsRecord>();
  const [loaded, setLoaded] = useState(false);

  const nextAnimation = useRef<AnimationAction>();
  const lastAnimation = useRef<AnimationAction>();

  const groupRef = useRef<THREE.Group>(null);

  useHideSVG();

  useEffect(() => {
    if (animations.length === 0) return;
    const clipsMap = animations
      .map((clip) => mixer.clipAction(clip))
      .reduce((p, clip) => {
        const name = clip.getClip().name;
        p[name as AnimationName] = clip;
        return p;
      }, {} as ClipsRecord);

    clipsMap["02GrabFromHat"].setLoop(LoopOnce, 1);
    clipsMap["03AppearBalls"].setLoop(LoopOnce, 1);

    clips.current = clipsMap;
    setLoaded(true);

    const onFinish = (e: AnimationMixerEventMap["finished"]) => {
      lastAnimation.current?.fadeOut(0.2);

      nextAnimation.current?.reset?.();
      animate({
        from: 0,
        to: 360,
        duration: 500,
        onUpdate(latest) {
          if (!groupRef.current) return;
          groupRef.current.rotation.y = (latest * 2 * Math.PI) / 360;
        },
      });
      nextAnimation.current?.fadeIn?.(0.2);
      nextAnimation.current?.play?.();

      lastAnimation.current = nextAnimation.current;
      nextAnimation.current = undefined;
    };
    mixer.addEventListener("finished", onFinish);

    return () => {
      mixer.removeEventListener("finished", onFinish);
    };
  }, [animations]);

  const section = useSection();

  useEffect(() => {
    if (!loaded || !clips.current) return;

    const newAnimation = clips.current[sectionToClip[section]];

    if (newAnimation === lastAnimation.current) return;
    lastAnimation.current?.fadeOut(0.2);
    newAnimation.reset();
    newAnimation.fadeIn(0.2);
    newAnimation.play();
    lastAnimation.current = newAnimation;
    const nextClipName = sectionNext[section];
    if (nextClipName) nextAnimation.current = clips.current[nextClipName];
  }, [loaded, section]);

  useFrame((state, delta) => {
    mixer.update(delta);
  });
  const matches = useMediaQuery("(min-width: 768px)");

  // const { plaguePosition } = useControls({
  //   plaguePosition: { value: [-3, 0, 0], min: -10, max: 10, step: 0.1 },
  // });
  const plaguePosition = [-3, 0, 0] as const;
  return (
    <group position={matches ? plaguePosition : [-1, 3, 0]} ref={groupRef}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload("/plague.glb");
