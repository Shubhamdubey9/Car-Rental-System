import React, { useState, useEffect } from "react";
import CarCard from "../components/CarCard";
import Titlle from "../components/Titlle";
import api from "../Api/Axios";
import { toast } from "sonner";

const Cars = () => {
  const [cars, setCars] = useState([]);
  const [searchCity, setSearchCity] = useState(""); 
  const [loading, setLoading] = useState(false);

  
  const fetchCars = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/user/cars"); 
      if (data.success) {
        setCars(data.cars);
      } else {
        toast.error(data.message);
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Failed to fetch cars");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  // Filter cars by city
  const filteredCars = cars.filter((car) =>
    car.location?.toLowerCase().includes(searchCity.toLowerCase())
  );

  if (loading) {
    return (
      <div className="text-center text-gray-500 py-16">Loading cars...</div>
    );
  }

  return (
    <div>
      <section className="w-full py-16 px-5 sm:px-10 md:px-16 lg:px-24 xl:px-32 bg-light">
        <div className="flex flex-col items-center w-full max-w-6xl mx-auto">
          <Titlle
            title="Available Cars"
            subTitle="Browse our selection of premium vehicles available in your city"
          />
      
          <input
            type="text"
            value={searchCity}
            onChange={(e) => setSearchCity(e.target.value)}
            placeholder="Search by city..."
            className="mt-6 w-full max-w-md px-6 py-3 rounded-full border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm placeholder-gray-500"
          />
        </div>
      </section>

      <section className="py-16 px-5 sm:px-10 md:px-16 lg:px-24 xl:px-32 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Result Heading */}
          <h2 className="text-lg sm:text-xl text-gray-700 mb-6">
            Showing{" "}
            <span className="font-semibold text-black">
              {filteredCars.length}
            </span>{" "}
            {filteredCars.length === 1 ? "Car" : "Cars"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCars.map((car) => (
              <CarCard key={car._id} car={car} />
            ))}
          </div>
          {filteredCars.length === 0 && (
            <p className="text-center text-gray-500 mt-12">
              No cars available in "{searchCity}"
            </p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Cars;
