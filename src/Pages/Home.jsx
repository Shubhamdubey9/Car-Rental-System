import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAppContext } from "@/AppContext/useAppContext";

import Hero from "../components/Hero";
import FeaturedSection from "../components/FeaturedSection";
import Banner from "../components/Banner";
import NewsLetter from "../components/NewsLetter";

const Home = () => {
  const { fetchAllCars } = useAppContext();
  const location = useLocation();

  // Fetch fresh cars whenever route changes
  useEffect(() => {
    fetchAllCars();
  }, [location.pathname]);

  return (
    <>
      <Hero />
      <FeaturedSection />
      <Banner />
      <NewsLetter />
    </>
  );
};

export default Home;
