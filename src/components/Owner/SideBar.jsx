import React, { useRef, } from "react";
import { NavLink } from "react-router-dom";
import { ownerMenuLinks } from "../../assets/assets";
import { useAppContext } from "@/AppContext/useAppContext";
import { OWNER_API_END_POINT } from "@/lib/Constant";
import axios from "axios";
import { toast } from "sonner";


const SideBar = () => {
  const { user, profilePic, setProfilePic } = useAppContext();
  const fileInputRef = useRef();

  const handleProfileClick = () => {
    fileInputRef.current.click();
  };

  const handleProfileChange = async (e) => {
    try {
      if (user) {
        if (!e.target.files || e.target.files.length === 0) {
          toast.error("No file selected.");
          return;
        }
        const formData = new FormData();
        formData.append("image", e.target.files[0]);
        const response = await axios.post(`${OWNER_API_END_POINT}/update-image`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        });

        if (response.data.success) {
          setProfilePic(response.data.image);
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      }

    } catch (error) {
      toast.error(error?.response?.data?.message || "An error occurred while updating the profile picture.");
      console.log(error)


    }
  };

  return (
    <div className="h-full w-full md:w-64 bg-white border-r border-gray-100 flex flex-col py-6 px-4 md:px-6 ">
      {/* Profile Section */}
      <div className="flex flex-col items-center mb-6">
        <div
          className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden border-2 border-blue-500 cursor-pointer relative group"
          onClick={handleProfileClick}
          title="Click to change profile picture"
        >
          <img
            src={profilePic || "https://ui-avatars.com/api/?name=Owner"}
            alt="Profile"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-200">
            <span className="text-xs text-white">Change</span>
          </div>
        </div>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="hidden"
          onChange={handleProfileChange}
        />
        <span className="mt-3 font-semibold text-blue-700 text-base">
          {user?.name}
        </span>
        <span className="text-xs text-gray-500">{user?.email}</span>
      </div>

      {/* Title */}
      <h2 className="text-lg md:text-xl font-bold text-blue-700 text-center mb-4">
        Owner Panel
      </h2>

      {/* Navigation */}
      <nav className="flex flex-col gap-1">
        {ownerMenuLinks.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/owner"}
            className={({ isActive }) =>
              `flex items-center gap-3 py-2 px-3 rounded-md font-medium text-sm md:text-base transition-all duration-150 ${isActive
                ? "bg-blue-100 text-blue-700"
                : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <img
                  src={isActive ? item.coloredIcon : item.icon}
                  alt={item.name}
                  className="w-5 h-5 md:w-6 md:h-6"
                />
                <span className="hidden md:block truncate">{item.name}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default SideBar;
