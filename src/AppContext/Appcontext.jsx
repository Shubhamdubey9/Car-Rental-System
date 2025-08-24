import api from "../Api/Axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [loadingUser, setLoadingUser] = useState(true); 
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [pickupLocation, setPickupLocation] = useState("");
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [cars, setCars] = useState([]);
  const [profilePic, setProfilePic] = useState("");
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    try {
      const res = await api.get("/user/me");
      setUser(res.data.user);
      setIsLoggedIn(true);
      if (res.data.user?.role === "owner") {
        setIsOwner(true);
      }
    } catch (error) {
      console.log(error);
      setUser(null);
      setIsLoggedIn(false);
    } finally {
      setLoadingUser(false); 
    }
  };

  const fetchAllCars = async () => {
    try {
      setLoading(true);
      const res = await api.get("/user/cars");
      setCars(res.data.cars);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const getOwnerCars = async () => {
    try {
      const { data } = await api.get("/owner/cars");
      if (data.success) {
        setCars(data.cars);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    fetchUser();
    fetchAllCars();
  }, []);

  const value = {
    user,
    setUser,
    navigate,
    loading,
    loadingUser, 
    showLogin,
    setShowLogin,
    showSignup,
    setShowSignup,
    pickupLocation,
    setPickupLocation,
    open,
    setOpen,
    isLoggedIn,
    setIsLoggedIn,
    isOwner,
    setIsOwner,
    profilePic,
    setProfilePic,
    cars,
    setCars,
    fetchUser,
    fetchAllCars,
    getOwnerCars,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContext;
