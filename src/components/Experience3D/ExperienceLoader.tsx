import { Suspense, lazy, type PropsWithChildren } from "react";
import { useMediaQuery } from "@/utils/hooks/useMediaQuery";

const Experience = lazy(() =>
  import("./Experience").then((m) => ({ default: m.Experience }))
);

export default function ExperienceLoader() {
  const prefersReducedMotion = useMediaQuery(
    "(prefers-reduced-motion: reduce)"
  );
  if (prefersReducedMotion) return null;
  return (
    <Suspense fallback={null}>
      <Experience />
    </Suspense>
  );
}
