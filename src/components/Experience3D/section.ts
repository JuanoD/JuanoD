import { useMediaQuery } from "@/utils/hooks/useMediaQuery";
import { useThree } from "@react-three/fiber";
import { atom, useAtomValue, useSetAtom } from "jotai";
import { useControls } from "leva";
import { useEffect, useLayoutEffect } from "react";

const sectionAtom = atom(0);

export function useSection() {
  return useAtomValue(sectionAtom);
}

export function useUpdateSection() {
  const setSection = useSetAtom(sectionAtom);

  useEffect(() => {
    const iobs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const animationNumber = Number(
            entry.target.getAttribute("data-animation")
          );
          setSection(animationNumber);
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
  }, []);
}

export function CameraPosition() {
  const matches = useMediaQuery("(min-width: 768px)");

  const { camPosition } = useControls({
    camPosition: { value: [-4, 0, -5], min: -10, max: 10, step: 0.1 },
  });

  const camera = useThree((s) => s.camera);

  useLayoutEffect(() => {
    camera.position.set(...camPosition);
    camera.updateProjectionMatrix();
    camera.lookAt(0, 0, 0);
  }, [camera, camPosition]);
  return null;
}
