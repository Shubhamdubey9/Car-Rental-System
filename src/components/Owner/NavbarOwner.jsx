import { useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import React from "react";
import { useAppContext } from "@/AppContext/useAppContext";
import { FaBars } from "react-icons/fa";

const NavbarOwner = ({ onMenuClick }) => {
  const { user } = useAppContext();
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/"); // always go to main homepage
  };

  return (
    <div className="flex items-center justify-between px-4 md:px-10 py-4 mb-3 text-gray-500 border-b border-borderColor relative bg-white z-50">
    
      <button
        className="lg:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-md"
        onClick={onMenuClick}
      >
        <FaBars size={20} />
      </button>

      
      <div className="cursor-pointer" onClick={handleLogoClick}>
        <img src={assets.logo} alt="logo" className="h-9" />
      </div>

      <p className="ml-4 font-semibold text-gray-800 text-base text-end sm:text-lg md:text-xl tracking-wide">
        Welcome {user?.name || "Owner"}
      </p>
    </div>
  );
};

export default NavbarOwner;
