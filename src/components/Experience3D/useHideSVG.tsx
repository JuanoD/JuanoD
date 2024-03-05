import { useEffect } from "react";

export function useHideSVG() {
  useEffect(() => {
    const svg = document.querySelector<SVGAElement>("#plague");
    if (!svg) return;
    svg.classList.add("hidden");
    return () => svg.classList.remove("hidden");
  }, []);
}
