import { assets } from "../assets/assets";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../Api/Axios";
import { toast } from "sonner";

const CarDetails = () => {
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [car, setCar] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  // Fetch car details
  useEffect(() => {
    const fetchCar = async () => {
      try {
        const res = await api.get(`/user/cars/${id}`);
        if (res.data.success) setCar(res.data.car);
        else toast.error(res.data.message || "Car not found");
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch car details");
      }
    };
    fetchCar();
  }, [id]);

  // Handle booking
  const handleBooking = async (e) => {
    e.preventDefault();
    if (!pickupDate || !returnDate) {
      toast.error("Please select both pickup and return dates");
      return;
    }

    try {
      const res = await api.post("/booking/create", {
        carId: id,
        pickupDate,
        returnDate,
      });

      if (res.data.success) {
        toast.success("Booking successful!");
        navigate("/my-bookings"); 
      } else {
        toast.error(res.data.message || "Booking failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to create booking. Try again later.");
    }
  };

  if (!car) return <p className="text-center mt-20">Loading car details...</p>;

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32">
      <button
        onClick={() => navigate(-1)}
        className="flex gap-2 text-gray-500 text-xl mb-6 items-center mt-20"
      >
        <img src={assets.arrow_icon} alt="" className="rotate-180 opacity-65" />
        Back to all cars
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        {/* Left side */}
        <div className="lg:col-span-2">
          <img
            src={car.image}
            alt={`${car.brand} ${car.model}`}
            className="w-full h-auto md:max-h-100 object-cover rounded-xl mb-6 shadow-md"
          />
          <div>
            <h1 className="text-3xl font-bold">
              {car.brand} {car.model}
            </h1>
            <p className="text-gray-500 text-xl">
              {car.category} • {car.year}
            </p>
          </div>

          <hr className="mt-10 borde-borderColor mb-6" />

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              {
                icon: assets.users_icon,
                label: `${car.seating_Capacity} Seats`,
              },
              { icon: assets.car_icon, label: `Car Type: ${car.category}` },
              {
                icon: assets.location_icon,
                label: `Location: ${car.location}`,
              },
              { icon: assets.fuel_icon, label: `Fuel: ${car.fuel_Type}` },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center border border-gray-200 rounded-lg p-4 shadow-sm bg-gray-100"
              >
                <img src={item.icon} alt="" className="w-8 h-8 mb-2" />
                <span className="text-gray-700 text-sm text-center">
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          <div>
            <h1 className="mt-6 text-xl font-medium">Description</h1>
            <p className="text-gray-500 text-xl mb-8 mt-3">{car.description}</p>
          </div>
        </div>

        {/* Right side - booking form */}
        <form className="w-full" onSubmit={handleBooking}>
          <div className="w-full bg-white rounded-xl shadow-md p-5 sm:p-6">
            <div className="flex items-baseline justify-between mb-4">
              <h2 className="text-2xl font-bold text-black">
                ₹{car.pricePerDay}
              </h2>
              <span className="text-sm text-gray-400">per day</span>
            </div>

            <hr className="mb-4" />

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Pickup Date
              </label>
              <input
                type="date"
                value={pickupDate}
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) => setPickupDate(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Return Date
              </label>
              <input
                type="date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                min={pickupDate || new Date().toISOString().split("T")[0]}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2 rounded-md transition-all duration-200"
            >
              Book Now
            </button>

            <p className="text-xs text-center text-gray-400 mt-3">
              No credit card required to reserve
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CarDetails;
