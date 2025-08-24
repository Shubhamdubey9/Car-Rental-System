import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { assets, menuLinks } from "../assets/assets.js";
import { useAppContext } from "../AppContext/useAppContext.js";
import { toast } from "sonner";
import api from "../Api/Axios";

const Navbar = () => {
  const { user, setUser, isOwner, setIsOwner, open, setOpen, setShowLogin } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await api.post("/user/logout");
      setUser(null);
      setIsOwner(false);
      toast.success("Logged out successfully");
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong during logout");
    }
  };

  const handleAuthButtonClick = () => {
    if (user) handleLogout();
    else setShowLogin(true);
  };

  return (
    <div className="flex items-center justify-between px-4 sm:px-6 md:px-16 lg:px-24 xl:px-32 py-3 sm:py-4 text-gray-600 border-b border-borderColor bg-white relative transition-all z-50">
      <Link to="/">
        <img src={assets.logo} alt="Logo" className="h-8 sm:h-10" />
      </Link>

      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 sm:hidden"
          onClick={() => setOpen(false)}
        ></div>
      )}

      <div
        className={`fixed sm:static top-0 right-0 h-full w-4/5 max-w-xs sm:max-w-none sm:w-auto bg-white sm:bg-transparent border-l sm:border-0 border-borderColor flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 p-6 sm:p-0 transition-transform duration-300 z-50 shadow-2xl sm:shadow-none ${
          open ? "translate-x-0" : "translate-x-full"
        } sm:translate-x-0`}
        style={{ minHeight: open ? "100vh" : "auto" }}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-8 w-full">
          {menuLinks.map((link, idx) => (
            <Link
              to={link.path}
              key={idx}
              className="w-full sm:w-auto py-1 sm:py-0 px-2 rounded-lg text-lg sm:text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 sm:hover:bg-transparent transition"
              onClick={() => setOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-2 border border-borderColor rounded-full px-3 max-w-56 ml-4">
          <input
            type="text"
            className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
            placeholder="Search product"
          />
          <img src={assets.search_icon} alt="search" />
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 w-full sm:w-auto mt-1.5 sm:mt-0">
          {(user?.role === "owner" || user?.role === "admin") && (
            <button
              onClick={() => navigate("/owner")}
              className="cursor-pointer bg-blue-500 px-6 py-2 sm:px-8 sm:py-2 hover:bg-blue-600 transition-all text-white rounded-lg text-lg sm:text-base font-semibold shadow"
            >
              Dashboard
            </button>
          )}

          <button
            onClick={handleAuthButtonClick}
            className="cursor-pointer bg-blue-500 px-6 py-2 sm:px-8 sm:py-2 hover:bg-blue-600 transition-all text-white rounded-lg text-lg sm:text-base font-semibold shadow"
          >
            {user ? "Logout" : "Login"}
          </button>
        </div>
      </div>

      <button
        className="sm:hidden cursor-pointer z-50 p-2 rounded-md hover:bg-blue-100 transition"
        aria-label="menu"
        onClick={() => setOpen(!open)}
      >
        <img
          src={open ? assets.close_icon : assets.menu_icon}
          alt="menu"
          className="h-7 w-7"
        />
      </button>
    </div>
  );
};

export default Navbar;
