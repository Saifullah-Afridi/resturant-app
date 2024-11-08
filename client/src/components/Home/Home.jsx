import React, { useState } from "react";
import HeroSection from "./HeroSection";
import ExploreSection from "./ExploreSection";
import Dishes from "./Dishes";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  return (
    <div>
      <HeroSection />
      <ExploreSection
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <Dishes selectedCategory={selectedCategory} />
    </div>
  );
};

export default Home;
