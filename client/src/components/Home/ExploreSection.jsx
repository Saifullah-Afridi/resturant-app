import React, { useEffect, useState } from "react";
import Container from "../navbar/container/Container";
import { Element } from "react-scroll";
import axios from "axios";
import MenuSkeleton from "./MenuSkeleton";

const ExploreSection = ({ selectedCategory, setSelectedCategory }) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setError(false);
    axios
      .get("http://localhost:3000/api/v1/categories")
      .then((res) => {
        setData(res.data.categories);
        setLoading(false);
        setError(false);
      })
      .catch((error) => {
        console.log(error);

        setError(error.response.data.message);
        setLoading(false);
      });
  }, []);

  return (
    <Element name="menu">
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
        {loading && <div className="text-3xl">loading</div>}
        <div className=" mt-6 flex-col flex-wrap  lg:flex-nowrap    sm:flex sm:flex-row  gap-4">
          {data?.map((menu) => (
            <div
              key={menu._id}
              onClick={() => setSelectedCategory(menu.name)}
              className={`inline-block  md:flex  flex-col items-center mb-4  hover:scale-105 transition-all duration-300  overflow-hidden  cursor-pointer`}
            >
              <img
                src={menu.image.url}
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
    </Element>
  );
};

export default ExploreSection;
