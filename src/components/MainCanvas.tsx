
import { useRef, useState } from "react";
import Card from "./Card";

// TODO : Add logic for loading different grids

export default function MainCanvas() {
  const LIMITS = {
    minY: -2000, // how far up you allow
  };
  const containerRef = useRef<HTMLDivElement>(null);
  const [offSet, setOffSet] = useState({ y: 0 });
  const [scale, setScale] = useState(1);

  const [isPanning, setIsPanning] = useState(false);
  const lastPos = useRef({ y: 0 });

  function onMouseDown(e: React.MouseEvent) {
    if (e.button !== 0) return;
    setIsPanning(true);
    lastPos.current = { y: e.clientY };
  }

  function onMouseMove(e: React.MouseEvent) {
    if (!isPanning) return;
    // const dx = e.clientX-lastPos.current.x
    const dy = e.clientY - lastPos.current.y;
    

    setOffSet((o) => ({ y: Math.min(
         0,
        Math.max(LIMITS.minY,o.y + dy)
    )}));

    lastPos.current = { y: e.clientY };
    console.log("panning", offSet.y);
  }

  function onMouseUp() {
    setIsPanning(false);
  }

  function onWheel(e: React.WheelEvent) {
    if (!e.ctrlKey) return; // only zoom when ctrl is pressed for electron apps
    e.preventDefault();

    const delta = -e.deltaY * 0.001;
    setScale((s) => Math.min(Math.max(s + delta, 0.2), 3));
  }

  return (
    <div
      ref={containerRef}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onWheel={onWheel}
      style={{
        flex: 1,
        overflow: "hidden",
        cursor: isPanning ? "grabbing" : "grab",
        backgroundColor: "var(--color-canvas-bg)",
      }}
      className="h-screen"
    >
      <div
        style={{
          position: "relative",
          height: 4000,
          transform: `translate(0px,${offSet.y}px) scale(${scale})`,
          transformOrigin: "0 0",
          backgroundImage: "radial-gradient(#222 1px, transparent 2px)",
          backgroundSize: "20px 20px",
        }}
      >{" "}
      <Card /> 
      </div>
      {/* the dot grid */}
    </div>
  );
}
