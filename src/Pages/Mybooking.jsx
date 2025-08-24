import { assets } from "../assets/assets";
import React, { useEffect, useState } from "react";
import api from "../Api/Axios";
import { toast } from "sonner";

const Mybooking = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user's bookings
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await api.get("/booking/user");
        if (res.data.success) {
          setBookings(res.data.bookings);
        } else {
          toast.error(res.data.message || "Failed to fetch bookings");
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch bookings. Try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleCancel = async (bookingId) => {
    if (!window.confirm("Are you sure you want to cancel this booking?"))
      return;

    try {
      // If your backend supports status update to "cancelled"
      const res = await api.put("/booking/cancel", { bookingId });
      if (res.data.success) {
        setBookings((prev) =>
          prev.map((b) =>
            b._id === bookingId ? { ...b, status: "cancelled" } : b
          )
        );
        toast.success("Booking cancelled successfully");
      } else {
        toast.error(res.data.message || "Failed to cancel booking");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error cancelling booking. Try again later.");
    }
  };

  if (loading) return <p className="text-center mt-20">Loading bookings...</p>;

  if (!bookings.length)
    return <p className="text-center mt-20">No bookings found.</p>;

  return (
    <div className="px-5 md:px-16 lg:px-24 xl:px-32 py-16 bg-white min-h-screen">
      <h1 className="text-3xl font-bold mb-1">My Bookings</h1>
      <p className="text-gray-500 mb-10">
        View and manage all your car bookings
      </p>

      {bookings.map((booking) => (
        <div
          key={booking._id}
          className="flex flex-col md:flex-row justify-between items-start md:items-center border rounded-lg shadow-sm p-5 gap-6 mb-6"
        >
          {/* Left Side */}
          <div className="flex gap-5 w-full md:w-auto">
            <div>
              <img
                src={booking.car.image}
                alt={`${booking.car.brand} ${booking.car.model}`}
                className="w-32 h-24 sm:w-40 sm:h-28 rounded-md object-cover"
              />
              <div className="mt-3">
                <h2 className="text-lg sm:text-xl font-semibold text-black">
                  {booking.car.brand} {booking.car.model}
                </h2>
                <p className="text-sm text-gray-500">
                  {booking.car.year} &bull; {booking.car.location}
                </p>
              </div>
            </div>

            {/* Booking Details */}
            <div className="flex flex-col justify-between">
              <div className="flex gap-2 items-center mb-2">
                <span className="text-sm px-3 py-1 bg-gray-100 rounded-full text-gray-700 font-medium">
                  Booking #{booking._id.slice(-6)}
                </span>
                <span className="text-xs bg-red-100 text-red-500 px-2 py-1 rounded-full capitalize">
                  {booking.status}
                </span>
              </div>

              <div className="text-sm text-gray-700 space-y-1">
                <div className="flex items-center gap-2">
                  <img
                    src={assets.calendar_icon}
                    alt="calendar"
                    className="w-4 h-4"
                  />
                  <span>
                    Rental Period:{" "}
                    <strong>
                      {new Date(booking.pickupDate).toLocaleDateString()} to{" "}
                      {new Date(booking.returnDate).toLocaleDateString()}
                    </strong>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <img
                    src={assets.location_icon}
                    alt="location"
                    className="w-4 h-4"
                  />
                  <span>Pick-up Location: {booking.car.location}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex flex-col items-end justify-between w-full md:w-auto gap-2 text-right">
            <div>
              <p className="text-sm text-gray-500">Total Price</p>
              <h2 className="text-xl font-bold text-blue-600">
                ${booking.price}
              </h2>
              <p className="text-sm text-gray-400 mt-1">
                Booked on {new Date(booking.createdAt).toLocaleDateString()}
              </p>
            </div>

            {booking.status !== "cancelled" && (
              <button
                onClick={() => handleCancel(booking._id)}
                className="mt-2 px-4 py-1 text-sm font-medium text-red-600 border border-red-500 rounded hover:bg-red-50 transition"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Mybooking;
