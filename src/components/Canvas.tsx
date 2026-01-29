import { ChevronLeft } from "lucide-react";
import Sidebar from "./Sidebar";
import MainCanvas from "./MainCanvas";
import { gridsData } from "../types";
import { useState } from "react";

type SidebarProps = {
  collapse: boolean;
  onToggle: () => void;
};

export default function Canvas({ collapse, onToggle }: SidebarProps) {
  const [datas, setDatas] = useState(gridsData);

  function getGridsIdandNames(): [string, string, boolean][] {
    return datas.map((data) => [data.id, data.name, data.active]);
  }

  const [grids, setGrids] =
    useState<[string, string, boolean][]>(getGridsIdandNames());

  function setActiveGrid(gridId: string) {
    const updatedDatas = datas.map((data) => ({
      ...data,
      active: data.id === gridId,
    }));
    console.log("Updated Datas:", updatedDatas);
    setDatas(updatedDatas);
  }

  return (
    <>
      <div className="fixed">
        <div className=" w-screen h-screen grid-dot flex items-center justify-center ">
          {datas.map((data) => {
            if (data.active) {
              return <MainCanvas key={data.id} data={data} />;
            }
          })}
        </div>
        <div className="">
          {!collapse && (
            <Sidebar
              collapse={collapse}
              onClose={onToggle}
              grids={grids}
              setActiveGrid={setActiveGrid}
              key={`datas.map((data)=>{
            if (data.active){
              return data.id
            }
           })`}
            />
          )}
          <div className="absolute bottom-6 left-4">
            {collapse && (
              <div className="float-left p-5">
                <button
                  onClick={onToggle}
                  className="sidebar-white hover:border rounded-xl flex justify-center items-center text-white "
                >
                  <div className="m-3">
                    <ChevronLeft />
                  </div>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
