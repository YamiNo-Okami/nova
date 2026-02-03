import { ChevronRight, PlusIcon, Trash2, LogOut } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type SidebarProps = {
  collapse: boolean;
  onClose: () => void;
  grids?: [string, string, boolean][];
  setActiveGrid?: (gridId: string) => void;
};

export default function Sidebar({
  collapse,
  onClose,
  grids,
  setActiveGrid,
}: SidebarProps) {
  const [username, setUsername] = useState(localStorage.getItem('username') || 'User');
  const [gridsState, setGridsState] = useState<[string, string, boolean][]>(
    grids || [],
  );
  const navigate = useNavigate();

  // TODO: If some data about grid is in local storage or backend, fetch that data here
  // and use it to populate the grids list. Else, use the default grids above.

  const onClickAdd = () => {
    const gridId = `grid-${gridsState.length + 1}`;
    const newGridName: [string, string, boolean] = [
      gridId,
      `Grid ${String.fromCharCode(65 + gridsState.length)}`,
      false,
    ];
    setGridsState([...gridsState, newGridName]);
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('username');
    navigate('/login');
  };

  return (
    <div
      className={`fixed top-4 left-4
          h-[calc(100vh-2rem)] w-72
          sidebar rounded-2xl shadow-2xl text-white border-5 
          transition-transform duration-300 ease-in-out ${!collapse ? "translate-x-0" : "-translate-x-[110%]"}`}
    >
      <div>
        <div className="text-3xl flex justify-center items-center pr-5">
          <img src="/logo.png" alt="Nova Logo" className="w-20 h-20" />
          <p className="playfair-display">My Nova</p>
        </div>


        <div className="rounded-full h-10 m-2 ms-4  ">
          <div className="flex justify-center text-2xl mb-1 mt-1">
            Hi {username}!
          </div>
          </div>
        <hr className="w-full border-3 sidebar" />
        <div className="m-3 p-2">
          <div className="flex justify-between items-center pb-4 pt-4">
            <div className="text-3xl ">Grids</div>
            <button
              className=" bg-blue-800 rounded-lg mr-4 hover:bg-blue-600"
              onClick={onClickAdd}
            >
              <div className="m-2">
                <PlusIcon />
              </div>
            </button>
          </div>
          <div className="">
            <div className=" list-none flex flex-col max-h-[50vh] overflow-y-auto panel panel-soft border-2 rounded-lg ms-2 me-2 scrollbar-hide">
              {gridsState.map((gridName) => (
                <div
                  key={gridName[0]}
                  onClick={() => {
                    console.log("Setting active grid to:", gridName[0]);
                    setActiveGrid?.(gridName[0]);
                  }}
                  className={`flex justify-between pt-2 pb-1 ps-2 pe-2  panel-hover 
                   {/*${gridName[2] ? "active" : ""}*/}
                  `}
                >
                  <div className="m-2">
                    <li
                      key={gridName[0]}
                      className="list-item rounded-md cursor-pointer"
                    >
                      {gridName[1]}
                    </li>
                  </div>
                  {/* <div className="">
                    <button className=" bg-red-600 rounded-lg mr-2 hover:bg-red-400">
                      <div className="m-2">
                        <Trash2 />
                      </div>
                    </button>
                  </div> */}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      

      <hr className="w-full  border-3 absolute bottom-25 sidebar" />

      <div className="absolute bottom-4 p-4 pb-2 flex items-center w-full">
        <button
          className="panel hover:border    rounded-xl flex justify-center items-center"
          onClick={onClose}
        >
          <div className="m-3 ">
            <ChevronRight />
          </div>
          
        </button>
        {/* create a logout button */}
        <button
          className="panel hover:border rounded-xl flex justify-center items-center ml-3 flex-1"
          onClick={handleLogout}
          style={{ background: 'var(--color-danger)' }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
          onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
        >
          <div className="m-3 flex items-center gap-2">
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </div>
        </button>
        
      </div>
    </div>
  );
}
