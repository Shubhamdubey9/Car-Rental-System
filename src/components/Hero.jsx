import React, { useState } from "react";
import { assets, cityList } from "../assets/assets";
import { useAppContext } from "../AppContext/useAppContext";
import api from "../Api/Axios";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const { pickupLocation, setPickupLocation } = useAppContext();
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [availableCars, setAvailableCars] = useState([]);
  const [searched, setSearched] = useState(false); // track if search was done
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!pickupLocation || !pickupDate || !returnDate) {
      alert("Please select location and dates");
      return;
    }

    try {
      const { data } = await api.post("/booking/check-availability-of-car", {
        location: pickupLocation,
        pickupDate,
        returnDate,
      });

      setSearched(true);

      if (data.success) {
        setAvailableCars(data.availableCars || []);
      } else {
        setAvailableCars([]);
        alert(data.message || "No cars available");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong while checking availability");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 text-center gap-10 px-2 sm:px-6 pt-10 pb-6">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-800 mt-10 drop-shadow-sm">
        Luxury Cars On Rent
      </h1>
      <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-2">
        Find the perfect luxury car for your next adventure. Flexible dates, top
        locations, and premium service.
      </p>

    
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-4xl mx-auto bg-white/90 shadow-2xl rounded-3xl px-4 sm:px-8 py-6 sm:py-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between border border-gray-100 backdrop-blur-md"
      >
        <div className="w-full flex flex-col gap-4 md:flex-row md:gap-6">
          
          <div className="flex-1 flex flex-col gap-2">
            <label
              htmlFor="pickup-location"
              className="text-sm font-semibold text-gray-700"
            >
              Pickup Location
            </label>
            <div className="relative">
              <select
                id="pickup-location"
                required
                value={pickupLocation}
                onChange={(e) => setPickupLocation(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary pr-8 appearance-none"
              >
                <option value="">Select Location</option>
                {cityList.map((city, index) => (
                  <option key={index} value={city}>
                    {city}
                  </option>
                ))}
              </select>
              <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                  <path
                    d="M7 10l5 5 5-5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>
          </div>

        
          <div className="flex-1 flex flex-col gap-2">
            <label
              htmlFor="pickup-date"
              className="text-sm font-semibold text-gray-700"
            >
              Pick-up Date
            </label>
            <input
              type="date"
              id="pickup-date"
              onChange={(e) => setPickupDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

        
          <div className="flex-1 flex flex-col gap-2">
            <label
              htmlFor="return-date"
              className="text-sm font-semibold text-gray-700"
            >
              Return Date
            </label>
            <input
              type="date"
              id="return-date"
              onChange={(e) => setReturnDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
        </div>

        
        <button
          type="submit"
          className="flex items-center justify-center gap-2 bg-blue-600 text-white px-10 py-3 rounded-xl text-base font-semibold shadow-lg hover:bg-blue-700 transition-colors mt-4 md:mt-0 w-full md:w-auto"
        >
          <img src={assets.search_icon} alt="" className="h-5 w-5" />
          Search
        </button>
      </form>

      
      {!searched ? (
        <div className="w-full flex justify-center mt-6">
          <img
            src={assets.main_car}
            alt="Luxury Car"
            className="w-full max-w-4xl h-auto object-contain drop-shadow-xl"
          />
        </div>
      ) : availableCars.length > 0 ? (
        <div className="w-full max-w-5xl mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableCars.map((car) => (
            <div
              key={car._id}
              className="bg-white shadow-md rounded-xl p-4 flex flex-col gap-2 cursor-pointer hover:shadow-xl transition"
              onClick={() => navigate(`/car-details/${car._id}`)}
            >
              <img
                src={car.image || assets.main_car}
                alt={car.name}
                className="w-full h-40 object-cover rounded-lg"
              />
              <h3 className="text-lg font-semibold">{car.name}</h3>
              <p className="text-gray-500">Price: ${car.pricePerDay}/day</p>
              <p className="text-gray-500">Location: {car.location}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-6 text-gray-500 text-lg">
          No cars available for selected dates.
        </p>
      )}
    </div>
  );
};

export default Hero;
