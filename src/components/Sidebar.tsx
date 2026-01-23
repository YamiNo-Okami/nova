import { ChevronRight, PlusIcon } from "lucide-react";

type SidebarProps = {
  collapse : boolean;
  onClose: () => void;
};

export default function Sidebar({ collapse,onClose }: SidebarProps) {
  return (
    <div
      className={`fixed top-4 left-4 z-50
          h-[calc(100vh-2rem)] w-72
          sidebar rounded-2xl shadow-2xl text-white border-5 
          transition-transform duration-300 ease-in-out ${!collapse ? "translate-x-0" : "-translate-x-[110%]"}`}
    >
      <div>
        <div className="pt-7" />
        <div className="text-3xl flex justify-center items-center pr-5">
          <img src="/logo.png" alt="Nova Logo" className="w-20 h-20" />
          <p className="playfair-display">My Nova</p> 
          </div>

        <hr className="w-full border-3 sidebar" />

        <div className="m-3 p-2">
          <div className="flex justify-between items-center pb-4 pt-4">
            <div className="text-3xl ">Grids</div>
            <button className=" bg-blue-800 rounded-lg mr-4 hover:bg-blue-600">
              <div className="m-2">
                <PlusIcon />
              </div>
            </button>
          </div>
          <div className=" bg-gray-800 p-2 mt-2 rounded-lg">
            <ol>
              <li>Grid A</li>
              <li>Grid B</li>
              <li>Grid C</li>
              <li>Grid D</li>
            </ol>
          </div>
        </div>
      </div>

      <hr className="w-full  border-3 absolute bottom-25 sidebar" />

      <div className="absolute bottom-4  p-4 pb-2">
        <button
          className="bg-gray-800 rounded-xl flex justify-center items-center"
          onClick={onClose}
        >
          <div className="m-3">
            <ChevronRight />
          </div>
        </button>
      </div>
    </div>
  );
}
