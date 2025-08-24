import React, { useEffect, useState } from "react";
import api from "../../Api/Axios"; // Your Axios instance

const statusColors = {
  Confirmed: "bg-green-100 text-green-700",
  Completed: "bg-blue-100 text-blue-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Available: "bg-green-100 text-green-700",
};

const ManageBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await api.get("/booking/user/"); // Replace with your actual endpoint
      if (res.data.success) {
        setBookings(res.data.bookings);
      } else {
        setBookings([]);
      }
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
      setBookings([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-16 text-gray-500">Loading bookings...</div>
    );
  }

  return (
    <div className="w-full mx-auto p-3 sm:p-6 md:p-8 bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl border border-gray-100 mb-6 sm:mb-8">
      <div className="mb-6">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-2">
          Manage Bookings
        </h2>
        <p className="text-sm sm:text-base text-gray-500 max-w-xl">
          Track all customer bookings, approve or cancel requests, and manage
          booking statuses
        </p>
      </div>

      <div className="bg-white rounded-lg sm:rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs sm:text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 font-medium">Car</th>
                <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 font-medium hidden sm:table-cell">Date Range</th>
                <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 font-medium">Total</th>
                <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 font-medium">Status</th>
                <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => {
                const statusKey =
                  booking.status.charAt(0).toUpperCase() +
                  booking.status.slice(1);
                return (
                  <tr
                    key={booking._id}
                    className="border-t border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4">
                      <div className="flex items-center gap-2 sm:gap-4">
                        <img
                          src={booking.car.image}
                          alt={`${booking.car.brand} ${booking.car.model}`}
                          className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg object-cover"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="font-medium text-sm sm:text-base truncate">
                            {booking.car.brand} {booking.car.model}
                          </div>
                          <div className="text-gray-500 text-xs sm:hidden">
                            {new Date(booking.pickupDate).toLocaleDateString()} - {new Date(booking.returnDate).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 hidden sm:table-cell">
                      <span className="text-sm">
                        {new Date(booking.pickupDate).toLocaleDateString()} -{" "}
                        {new Date(booking.returnDate).toLocaleDateString()}
                      </span>
                    </td>
                    <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4">
                      <span className="font-medium text-sm sm:text-base">${booking.price}</span>
                    </td>
                    <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4">
                      <span
                        className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${
                          statusColors[statusKey] || "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {statusKey}
                      </span>
                    </td>
                    <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4">
                      <select className="border border-gray-300 rounded-md px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                        <option>Cancel</option>
                        <option>Approve</option>
                        <option>Complete</option>
                      </select>
                    </td>
                  </tr>
                );
              })}
              {bookings.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-gray-500">
                    No bookings found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageBooking;
