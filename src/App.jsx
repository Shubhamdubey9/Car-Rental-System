import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./components/Auth/Login";

import Home from "./Pages/Home";
import Cars from "./Pages/Cars";
import CarDetails from "./Pages/CarDetails";
import MyBooking from "./Pages/MyBooking";
import Layout from "./Pages/Owner/Layout";
import DashBoard from "./Pages/Owner/DashBoard";
import AddCar from "./Pages/Owner/AddCar";
import ManageCar from "./Pages/Owner/ManageCar";
import ManageBooking from "./Pages/Owner/ManageBooking";

import { useAppContext } from "./AppContext/useAppContext";
import { Toaster } from "sonner";

const App = () => {
  const { showLogin, fetchUser } = useAppContext();
  const location = useLocation();
  const isOwnerPath = location.pathname.startsWith("/owner");

  
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <Toaster />
      {showLogin && <Login />}

      
      {!isOwnerPath && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/car-details/:id" element={<CarDetails />} />
        <Route path="/my-bookings" element={<MyBooking />} />

        <Route path="/owner" element={<Layout />}>
          <Route index element={<DashBoard />} />
          <Route path="add-car" element={<AddCar />} />
          <Route path="manage-cars" element={<ManageCar />} />
          <Route path="manage-bookings" element={<ManageBooking />} />
        </Route>
      </Routes>

      {!isOwnerPath && <Footer />}
    </>
  );
};

export default App;
