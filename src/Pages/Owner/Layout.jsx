import SideBar from "../../components/Owner/SideBar";
import NavbarOwner from "../../components/Owner/NavbarOwner";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppContext } from "../../AppContext/useAppContext";

const Layout = () => {
  const { isOwner, loadingUser } = useAppContext();
  const navigate = useNavigate();

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
      <NavbarOwner />
      <div className="flex flex-1">
        <SideBar />
        <main className="flex-1 p-4 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
