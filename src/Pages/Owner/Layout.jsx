import SideBar from "../../components/Owner/SideBar";
import NavbarOwner from "../../components/Owner/NavbarOwner";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppContext } from "../../AppContext/useAppContext";

const Layout = () => {
  const { isOwner, loadingUser } = useAppContext();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (!loadingUser && !isOwner) {
      navigate("/");
    }
  }, [isOwner, loadingUser, navigate]);

  if (loadingUser) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <NavbarOwner onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div className="flex flex-1">
        <div
          className={`fixed inset-y-0 left-0 z-40 w-64 transform bg-white border-r shadow-lg transition-transform duration-300 lg:static lg:translate-x-0
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <SideBar closeSidebar={() => setIsSidebarOpen(false)} />
        </div>
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/30 z-30 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        
        <main className="flex-1 p-4 bg-gray-50 lg:ml-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
