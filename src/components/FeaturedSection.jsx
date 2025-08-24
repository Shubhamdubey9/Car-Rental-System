import React, { useEffect, useState } from "react";
import Titlle from "./Titlle";
import CarCard from "./CarCard";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import api from "../Api/Axios";
import { toast } from "sonner";

const FeaturedSection = () => {
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch cars from backend
  const fetchCars = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/user/cars"); 
      if (data.success) {
        setCars(data.cars.slice(0, 4)); 
      } else {
        toast.error(data.message);
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch cars");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-24 text-gray-500">
        Loading featured cars...
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center py-24 px-5 md:px-16 lg:px-24 xl:px-32">
      <div>
        <Titlle
          title="Featured Vehicles"
          subTitle="Explore our selection of premium vehicles available for your next adventure."
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-18">
        {cars.map((car) => (
          <div key={car._id}>
            <CarCard car={car} />
          </div>
        ))}
        {cars.length === 0 && (
          <p className="text-center text-gray-500 col-span-full mt-6">
            No cars available
          </p>
        )}
      </div>
      <button
        onClick={() => {
          navigate("/cars");
          window.scrollTo(0, 0);
        }}
        className="flex items-center justify-center gap-2 bg-primary text-white px-7 py-3 rounded-lg font-semibold shadow-lg hover:bg-primary-dull hover:scale-105 active:scale-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 mt-18"
      >
        <span className="tracking-wide text-base">Explore ALL cars</span>
        <img src={assets.arrow_icon} alt="" className="w-5 h-5" />
      </button>
    </div>
  );
};

export default FeaturedSection;
