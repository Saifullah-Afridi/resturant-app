import React, { useState } from "react";
import Container from "../navbar/container/Container";
import { menus } from "./ExploreSectionImages";
const ExploreSection = () => {
  const [menuSelected, setMenuSelected] = useState("Salad");

  const handleChangeCategory = (selectedMenu) => {
    setMenuSelected(selectedMenu);
  };
  return (
    <Container>
      <div className="md:w-[60%] pt-3 ">
        <h2 className=" text-2xl md:text-xl font-semibold my-2 ">
          {" "}
          Explore our menu
        </h2>
        <p className="text-sm font-medium">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Debitis ea
          nesciunt aliquam ratione neque? Vero in nisi veritatis eligendi
          aliquam!
        </p>
      </div>
      <div className=" mt-6 flex-col flex-wrap  lg:flex-nowrap    sm:flex sm:flex-row  gap-4">
        {menus?.map((menu) => (
          <div
            onClick={() => handleChangeCategory(menu.name)}
            key={menu.id}
            className={`inline-block  md:flex     flex-col items-center mb-4  hover:scale-105 transition-all duration-300   `}
          >
            <img
              src={menu.image}
              alt="menu-image"
              className={` p-1 ${
                menuSelected === menu.name
                  ? "border-2 border-amber-600  rounded-full  "
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
