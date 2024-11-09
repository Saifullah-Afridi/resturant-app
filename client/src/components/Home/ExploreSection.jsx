import React, { useState } from "react";
import Container from "../navbar/container/Container";
import { menus } from "./ExploreSectionImages";
const ExploreSection = ({ selectedCategory, setSelectedCategory }) => {
  return (
    <Container>
      <div className="md:w-[60%] pt-3 ">
        <h2 className=" text-2xl md:text-2xl font-semibold my-2 ">
          Explore our menu
        </h2>
        <p className="text-sm font-medium text-gray-700">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Debitis ea
          nesciunt aliquam ratione neque? Vero in nisi veritatis eligendi
          aliquam!
        </p>
      </div>
      <div className=" mt-6 flex-col flex-wrap  lg:flex-nowrap    sm:flex sm:flex-row  gap-4">
        {menus?.map((menu) => (
          <div
            key={menu.id}
            onClick={() => setSelectedCategory(menu.name)}
            className={`inline-block  md:flex  flex-col items-center mb-4  hover:scale-105 transition-all duration-300  overflow-hidden  cursor-pointer`}
          >
            <img
              src={menu.image}
              alt="menu-image"
              className={` p-1 ${
                selectedCategory === menu.name
                  ? "border-4 border-amber-600  rounded-full"
                  : ""
              }`}
            />
            <h5 className="mt-2 inline-block ">{menu.name}</h5>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default ExploreSection;
