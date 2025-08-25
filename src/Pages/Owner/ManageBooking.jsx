import React, { useEffect, useState } from "react";
import api from "../../Api/Axios";

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
      const res = await api.get("/booking/user/"); // Your endpoint
      if (res.data.success) setBookings(res.data.bookings);
      else setBookings([]);
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

  if (loading)
    return (
      <div className="text-center py-16 text-gray-500">Loading bookings...</div>
    );

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
      <div className="hidden sm:block bg-white rounded-lg sm:rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs sm:text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 font-medium">
                  Car
                </th>
                <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 font-medium">
                  Date Range
                </th>
                <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 font-medium">
                  Total
                </th>
                <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 font-medium">
                  Status
                </th>
                <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 font-medium">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {bookings.length > 0 ? (
                bookings.map((booking) => {
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
                        <span className="font-medium text-sm sm:text-base">
                          ₹{booking.price}
                        </span>
                      </td>
                      <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4">
                        <span
                          className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${
                            statusColors[statusKey] ||
                            "bg-gray-100 text-gray-600"
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
                })
              ) : (
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

      {/* Mobile  */}
      <div className="sm:hidden flex flex-col gap-4">
        {bookings.length > 0 ? (
          bookings.map((booking) => {
            const statusKey =
              booking.status.charAt(0).toUpperCase() + booking.status.slice(1);
            return (
              <div
                key={booking._id}
                className="bg-gray-50 rounded-xl p-4 shadow-sm border border-gray-100"
              >
                <div className="flex items-center gap-3 mb-2">
                  <img
                    src={booking.car.image}
                    alt={`${booking.car.brand} ${booking.car.model}`}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="font-medium text-base truncate">
                      {booking.car.brand} {booking.car.model}
                    </h3>
                    <p className="text-gray-500 text-xs">
                      {new Date(booking.pickupDate).toLocaleDateString()} -{" "}
                      {new Date(booking.returnDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm">₹{booking.price}</span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      statusColors[statusKey] || "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {statusKey}
                  </span>
                </div>
                <div className="mt-2">
                  <select className="w-full border border-gray-300 rounded-md px-2 py-1 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option>Cancel</option>
                    <option>Approve</option>
                    <option>Complete</option>
                  </select>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center text-gray-500 py-6">No bookings found</p>
        )}
      </div>
    </div>
  );
};

export default ManageBooking;
