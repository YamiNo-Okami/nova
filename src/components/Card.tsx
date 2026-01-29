import { X } from "lucide-react";
import type { CardData } from "../types";
import { useState } from "react";

export default function Card({
  card,
  onMouseDown,
  isPanning,
  onResizeMouseDown,
  isResizeing,
  onSave,
}: {
  card: CardData;
  onMouseDown: (e: React.MouseEvent, card: CardData) => void;
  isPanning: string | null;
  onResizeMouseDown: (e: React.MouseEvent, card: CardData) => void;
  isResizeing: string | null;
  onSave: (updatedCard: CardData) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(card.title);
  const [content, setContent] = useState(card.content);

  function handleUpdatedTitle(newTitle: string) {
    setTitle(newTitle);
    const updatedCard = { ...card, title: newTitle };
    onSave(updatedCard);
  }

  function handleUpdatedContent(newContent: string) {
    setContent(newContent);
    const updatedCard = { ...card, content: newContent };
    onSave(updatedCard);
  }

  function handleSave() {
    const updatedCard = { ...card, title: title, content: content };
    onSave(updatedCard);
  }

  return (
    <>
      <div
        onMouseDown={(e) => {
          e.stopPropagation();
        }}
        style={{
          width: card.width,
          height: card.height,
          position: "absolute",
          borderRadius: 8,
          left: Math.max(card.x, 0),
          top: Math.max(card.y, 0),
          display: "flex",
          flexDirection: "column",
        }}
        className="border text-white border-white height-auto no-select "
      >
        {/*  Header Section  */}
        <div
          onMouseDown={!editing ? (e) => onMouseDown(e, card) : () => {}}
          style={{
            backgroundColor: "rgba(0,0,0,0.7)",
            cursor: isPanning ? "move" : "pointer",
          }}
          className="flex justify-between items-center pt-3 px-3 pb-2 rounded-t-lg "
        >
          <div className="text-2xl">
            {editing ? (
              <input
                className="input-box"
                onChange={(e) => handleUpdatedTitle(e.target.value)}
                style={{
                  width: `${card.width - 80}px`,
                }}
                defaultValue={title}
              ></input>
            ) : (
              card.title
            )}
          </div>
          <div>
            {/* Button  */}{" "}
            <button
              style={{
                width: "30px",
                height: "30px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              className=" bg-red-500 hover:bg-red-400 rounded-xl"
            >
              {" "}
              <X />{" "}
            </button>
          </div>
        </div>
        <hr />

        {/*  Content  dynamic later */}
        <div className="card-body">
          {" "}
          {/* Content Section */}
          {/*scrollbar-hide */}
          <div className="p-4 w-100 ">
            {/* Markdown content later */}
            {editing ? (
              <textarea
                className="input-box"
                defaultValue={card.content}
                onChange={(e) => handleUpdatedContent(e.target.value)}
              ></textarea>
            ) : (
              card.content
            )}
          </div>
        </div>

        {/* buttons edit save */}
        <div
          onMouseDown={!editing ? (e) => onResizeMouseDown(e, card) : () => {}}
          style={{
            cursor: isResizeing ? "nwse-resize" : "pointer",
          }}
          className=" bottom-0 bg-black w-full rounded-b-lg"
        >
          <hr />
          <div className="bottom-0 w-full flex justify-between p-3">
            {" "}
            {/* Footer section*/}
            <button
              onClick={() => {
                setEditing(!editing);
                if (!editing) handleSave();
              }}
              className=" p-1 border border-white hover:bg-white hover:text-black rounded"
            >
              {editing ? "Save" : "Edit"}
            </button>
          </div>
        </div>
      </div>{" "}
    </>
  );
}
