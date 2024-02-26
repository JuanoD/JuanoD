import { Suspense, lazy } from "react";

const Experience = lazy(() => import("./Experience").then((m) => ({ default: m.Experience })));

export default function ExperienceLoader() {
  return (
    <Suspense fallback={null}>
      <Experience />
    </Suspense>
  );
}
