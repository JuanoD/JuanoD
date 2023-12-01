import { useEffect } from "react";

const present = "bg-gray-800";
export function Model() {
  useEffect(() => {
    const iobs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(present);
          } else {
            entry.target.classList.remove(present);
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
    <div className="flex flex-col items-center justify-center fixed -z-10">
      <h1 className="text-6xl font-bold">Model</h1>
    </div>
  );
}
