import { X } from "lucide-react";
import type { CardData } from "../types";
import { useState } from "react";

export default function Card({
  card,
  onMouseDown,
  isPanning,
  onResizeMouseDown,
  isResizeing,
  onSave
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

  function handleSave(){
    const updatedCard = { ...card, title: title, content: content };
    onSave(updatedCard);
  }





  return (
    <div
      key={card.id}
      onMouseDown={(e) => onResizeMouseDown(e, card)}
      style={{
        width: card.width,
        height: card.height,
        minWidth: 150,
        minHeight: 200,
        borderRadius: 8,
        translate: `${card.x}px ${card.y}px`,
        cursor: isResizeing ? "nwse-resize" : "pointer",
      }}
      className="border text-white border-white"
    >
      {/*  Top Section  */}
      <div
        key={card.id}
        onMouseDown={(e) => onMouseDown(e, card)}
        style={{
          backgroundColor: "rgba(0,0,0,0.7)",
          cursor: isPanning ? "move" : "pointer",
        }}
        className="flex justify-between items-center pt-3 px-3 pb-2 rounded-t-lg"
      >
        <div className="text-2xl">
          {editing ? (
            <input 
            key={card.id} 
            
            onChange={
              (e) => handleUpdatedTitle(e.target.value)
            }
            defaultValue={title}></input>
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
      <div className="overflow-hidden h-auto w-auto max-h-80 ">
        {/*scrollbar-hide */}
        <div className="p-4  ">
          {/* Markdown content later */}
          {editing ? (
            <textarea
              key={card.id}
              style={{ width: "100%", height: "auto" }}
              defaultValue={card.content}
              onChange={
                (e) => handleUpdatedContent(e.target.value)
              }
            ></textarea>
          ) : (
            card.content
          )}
        </div>
      </div>
      {/* buttons edit save */}
      <div className="fixed bottom-0 bg-black w-full rounded-b-lg">
        <hr />
        <div className="bottom-0 w-full flex justify-between p-3">
          {!editing ? (
            <button
              onClick={() => {
                setEditing(true);
              }}
              className=" p-1 border border-white hover:bg-white hover:text-black rounded"
            >
              Edit
            </button>
          ) : (
            <button
              onClick={() => {
                setEditing(false);
                handleSave();
              }}
              className=" p-1 border border-white hover:bg-white hover:text-black rounded"
            >
              Preview
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
