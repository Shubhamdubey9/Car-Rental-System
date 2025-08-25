import React, { useEffect, useState } from "react";
import { FaCar, FaClipboardList, FaExclamationTriangle } from "react-icons/fa";
import api from "../../Api/Axios";
import { useAppContext } from "@/AppContext/useAppContext";
import { toast } from "sonner";

const DashBoard = () => {
  const { isOwner } = useAppContext();

  const [data, setData] = useState({
    totalCars: 0,
    totalBookings: 0,
    pendingBookings: 0,
    completedBookings: 0,
    recentBookings: [],
    monthlyRevenue: 0,
  });

  const {
    totalCars,
    totalBookings,
    pendingBookings,
    completedBookings,
    recentBookings,
    monthlyRevenue,
  } = data;

 const fetchDashBoard = async () => {
   try {
     const { data: responseData } = await api.get("/owner/dashboard");
     if (responseData.success) {
       setData(responseData.dashboardData);
     } else {
       toast.error(responseData.message);
       console.error(responseData.message);
     }
   } catch (error) {
     console.error(error.response?.data?.message || "An error occurred");
   }
 };


  useEffect(() => {
      fetchDashBoard();
  }, []);

  return (
    <div className="p-6 md:p-10 bg-white min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Admin Dashboard
        </h1>
        <p className="text-gray-500 max-w-2xl">
          Monitor overall platform performance including total cars, bookings,
          revenue, and recent activities
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <div className="bg-white border rounded-lg p-5 flex items-center justify-between shadow-sm">
          <div>
            <h4 className="text-sm text-gray-500 mb-1">Total Cars</h4>
            <p className="text-xl font-semibold text-gray-800">{totalCars}</p>
          </div>
          <div className="bg-blue-100 text-blue-600 p-3 rounded-full">
            <FaCar size={20} />
          </div>
        </div>
        <div className="bg-white border rounded-lg p-5 flex items-center justify-between shadow-sm">
          <div>
            <h4 className="text-sm text-gray-500 mb-1">Total Bookings</h4>
            <p className="text-xl font-semibold text-gray-800">
              {totalBookings}
            </p>
          </div>
          <div className="bg-blue-100 text-blue-600 p-3 rounded-full">
            <FaClipboardList size={20} />
          </div>
        </div>

        <div className="bg-white border rounded-lg p-5 flex items-center justify-between shadow-sm">
          <div>
            <h4 className="text-sm text-gray-500 mb-1">Pending</h4>
            <p className="text-xl font-semibold text-gray-800">
              {pendingBookings}
            </p>
          </div>
          <div className="bg-blue-100 text-blue-600 p-3 rounded-full">
            <FaExclamationTriangle size={20} />
          </div>
        </div>

        <div className="bg-white border rounded-lg p-5 flex items-center justify-between shadow-sm">
          <div>
            <h4 className="text-sm text-gray-500 mb-1">Confirmed</h4>
            <p className="text-xl font-semibold text-gray-800">
              {completedBookings}
            </p>
          </div>
          <div className="bg-blue-100 text-blue-600 p-3 rounded-full">
            <FaClipboardList size={20} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Recent Bookings
          </h3>
          <p className="text-sm text-gray-500 mb-3">Latest customer bookings</p>
          <ul>
            {recentBookings && recentBookings.length > 0 ? (
              recentBookings.map((booking) => (
                <li key={booking._id} className="mb-2">
                  <span className="font-medium">
                    {booking.car.brand} {booking.car.model}
                  </span>
                  <span className="ml-2 text-xs text-gray-400">
                    ({booking.status})
                  </span>
                </li>
              ))
            ) : (
              <li className="text-gray-400">No recent bookings</li>
            )}
          </ul>
        </div>

        <div className="bg-white border rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Monthly Revenue
          </h3>
          <p className="text-sm text-gray-500 mb-3">
            Revenue for current month
          </p>
          <p className="text-3xl font-bold text-blue-600">₹{monthlyRevenue}</p>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
