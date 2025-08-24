import React from "react";
import Titlle from "./Titlle";
import { assets } from "../assets/assets";

const Banner = () => {
  return (
    <section className="w-ma bg-gradient-to-r from-blue-700 via-blue-500 to-blue-300 py-20 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 flex items-center justify-center">
      <div className="w-full max-w-6xl bg-white/90 rounded-3xl shadow-2xl p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-10 border border-gray-100 backdrop-blur-md">
        {/* Left: Text Content */}
        <div className="md:w-1/2 space-y-7 text-center md:text-left">
          <Titlle
            title={<span className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-700">Do You Own a Luxury Car?</span>}
            subTitle={<span className="text-base sm:text-lg text-gray-700 leading-relaxed">Monetize your vehicle effortlessly by listing on CarRental.<br />We take care of insurance, driver verification, and secure payments — so you can earn passive income, stress-free.</span>}
          />
          <button className="ml-7 mt-6 inline-block bg-blue-600 text-white text-base sm:text-lg font-bold px-8 py-3 rounded-xl shadow-xl hover:-translate-y-1 hover:shadow-2xl hover:bg-blue-700 transition-all duration-200">
            List Your Car
          </button>
        </div>

        {/* Right: Car Image */}
        <div className="md:w-1/2 flex justify-center items-center">
          <img
            src={assets.banner_car_image}
            alt="Luxury Car"
            className="w-full max-w-md md:max-w-lg object-contain drop-shadow-2xl rounded-2xl transform md:-rotate-3"
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;
