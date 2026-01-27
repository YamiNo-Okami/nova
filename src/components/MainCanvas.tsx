import React, { useEffect, useRef, useState } from "react";
import Card from "./Card";
import type { CardData } from "../types";

// TODO : Add logic for loading different grids

export default function MainCanvas() {
  // Canvas Logics
  const LIMITS = {
    minY: -2000, // how far up you allow
  };
  const containerRef = useRef<HTMLDivElement>(null);
  const [offSet, setOffSet] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);

  const [isPanning, setIsPanning] = useState(false);
  const lastPos = useRef({ y: 0 });

  function onMouseDown(e: React.MouseEvent) {
    if (e.button !== 0) return;
    setIsPanning(true);
    lastPos.current = { y: e.clientY };
  }

  function onMouseMove(e: React.MouseEvent) {
    if (resizeCard) {
      setCards((cards) =>
        cards.map((card) =>
          card.id === resizeCard
            ? {
                ...card,
                width: Math.max(150, (e.clientX - offSet.x - card.x * scale) / scale),
                height: Math.max(200, (e.clientY - offSet.y - card.y * scale) / scale),
              }
            : card,
        ),
      );
      return;
    }

    if (draggingCard) {
      setCards((cards) =>
        cards.map((card) =>
          card.id === draggingCard
            ? {
                ...card,
                x: (e.clientX - offSet.x - dragOffset.current.x) / scale,
                y: (e.clientY - offSet.y - dragOffset.current.y) / scale,
              }
            : card,
        ),
      );
      return;
    }

    if (!isPanning) return;
    // const dx = e.clientX-lastPos.current.x
    const dy = e.clientY - lastPos.current.y;

    setOffSet((o) => ({
      x: o.x,
      y: Math.min(0, Math.max(LIMITS.minY, o.y + dy)),
    }));

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

  // Cards Logics
  useEffect(() => {
  const stopAll = (e: MouseEvent) => {
    if (e.button !== 0) return;
    setDraggingCard(null);
    setResizeCard(null);
  };

  window.addEventListener("mouseup", stopAll);
  return () => window.removeEventListener("mouseup", stopAll);
}, []);




  const [cards, setCards] = useState<CardData[]>([
    {
      id: "1",
      title: "Card One",
      x: 200,
      y: 200,
      width: 200,
      height: 400,
      content: "# Card One\n\nThis is **Markdown**.",
    },
    {
      id: "2",
      title: "Card Two",
      x: 600,
      y: 300,
      width: 200,
      height: 400,
      content: "## Card Two\n\n- Item 1\n- Item 2",
    },
  ]);

  const [draggingCard, setDraggingCard] = useState<string | null>(null);
  const dragOffset = useRef({ x: 0, y: 0 });

  const [resizeCard, setResizeCard] = useState<string | null>(null);
  const resizeOffset = useRef({ x: 0, y: 0 });

  function onCardMouseDown(e: React.MouseEvent, card: CardData) {
    e.stopPropagation(); // prevent canvas pan
    setDraggingCard(card.id);

    dragOffset.current = {
      x: e.clientX - card.x * scale - offSet.x,
      y: e.clientY - card.y * scale - offSet.y,
    };
  }
  function onCardResizeMouseDown(e: React.MouseEvent, card: CardData) {
    e.stopPropagation(); // prevent canvas pan
    setResizeCard(card.id);

    resizeOffset.current = {
      x: (e.clientX - offSet.x - resizeOffset.current.x) / scale,
      y: (e.clientY - offSet.y - resizeOffset.current.y) / scale,
    };

    
  }

  function handleSave(updatedCard: CardData) {
    setCards((cards) =>
      cards.map((card) => (card.id === updatedCard.id ? updatedCard : card)),
    );

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
      className="h-screen "
    >
      <div
        style={{
          position: "relative",
          width:4000,
          height: 4000,
          transform: `translate(0px,${offSet.y}px) scale(${scale})`,
          transformOrigin: "0 0",
          backgroundImage: "radial-gradient(#222 1px, transparent 2px)",
          backgroundSize: "20px 20px",
        }}
      >
        {cards.map((card) => (
          <Card
            key={card.id}
            onSave={handleSave}
            card={card}
            onMouseDown={(e) => onCardMouseDown(e, card)}
            isPanning={draggingCard}
            onResizeMouseDown={(e) => onCardResizeMouseDown(e, card)}
            isResizeing={resizeCard}
          />
        ))}
      </div>
      {/* the dot grid */}
    </div>
  );
}
