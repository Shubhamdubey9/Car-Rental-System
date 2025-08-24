import { Link } from "react-router-dom";
import { assets, dummyUserData } from "../../assets/assets";

import React from 'react'
import { useAppContext } from "@/AppContext/useAppContext";

const NavbarOwner = () => {
    const {user} = useAppContext();
    console.log(user)

  return (
    <div className="flex items-center justify-between  px-8 md:px-10 py-4 mb-3 text-gray-500 border-b border-borderColor relative transition-all">
      <Link to="/">
        <img src={assets.logo} alt="" className="h-9" />
      </Link>
      <p className="ml-4">Welcome {user?.name || "Owner"}</p>
     
    </div>
  );
}

export default NavbarOwner