import { X } from "lucide-react";

export default function Card() {
  return (
    <div
      style={{
        width: 200, // card width dynamic later
        height: 400, // card height dynamic later
        borderRadius: 8,
        translate: "20px 20px", // dynamic later
      }}
      className="border text-white border-white"
    >
      {/*  Top Section  */}
      <div
        style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
        className="flex justify-between items-center pt-3 px-3 pb-2 rounded-t-lg"
      >
        <div className="text-2xl">{/* Title  dynamic later */} title</div> 
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
      <div className="overflow-scroll h-auto w-auto max-h-80 ">  {/*scrollbar-hide */}
      <div className="p-4 ">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus at
        nihil illum delectus amet reprehenderit minima exercitationem, quia
        dolorum inventore maxime sit cumque provident. Dignissimos repudiandae
        suscipit a doloribus molestiae!
      </div>
      </div>
      {/* buttons edit save */}
      <div className="fixed bottom-0 bg-black w-full rounded-b-lg">
        <hr />
        <div className="bottom-0 w-full flex justify-between p-3">
          <button className=" p-1 border border-white hover:bg-white hover:text-black rounded">Edit</button>
          <button className=" p-1 border border-white hover:bg-white hover:text-black rounded">Preview</button>
          <button className=" p-1 border border-white hover:bg-white hover:text-black rounded">Save</button>
        </div>
      </div>
    </div>
  );
}
