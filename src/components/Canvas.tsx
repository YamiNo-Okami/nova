
import { ChevronLeft } from "lucide-react";
import Sidebar from "./Sidebar";
import MainCanvas from "./MainCanvas";

type SidebarProps = {
  collapse: boolean;
  onToggle: () => void;
};

export default function Canvas({ collapse, onToggle }: SidebarProps) {
  return (
    <>
      <div className="relative">
        <div  className="">
          {!collapse && <Sidebar collapse={collapse} onClose={onToggle} />}
          <div className="absolute bottom-6 left-4">
            {collapse && (
              <div className="float-left p-5">
                <button
                  onClick={onToggle}
                  className="sidebar-white hover:border-1 rounded-xl flex justify-center items-center text-white "
                >
                    <div className="m-3">
                  <ChevronLeft/>
                    </div>
                </button>
              </div>
)}  
          </div>
          <div className="w-screen h-screen grid-dot flex items-center justify-center text-6xl">
            <MainCanvas/>
            </div>
        </div>
      </div>
    </>
  );
}
