import React, { useEffect, useState } from "react";
import Container from "../navbar/container/Container";
import { useParams } from "react-router-dom";
import { food_list, foodDetails } from "../Home/ExploreSectionImages";
import DashCard from "../Home/DashCard";

const DishDetail = () => {
  const [dishDetail, setDishDetail] = useState({});
  const [relatedDishes, setRelatedDishes] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    const dish = foodDetails?.find((food) => food._id === id);
    setDishDetail(dish);
  }, [id]);
  useEffect(() => {
    setRelatedDishes(
      food_list?.filter((food) => food.category === dishDetail.category)
    );
  }, [id, dishDetail]);
  console.log(relatedDishes);

  return (
    <Container>
      <div className=" flex flex-col md:flex-row gap-10   mt-10 h-[70vh]">
        <div className="h-full">
          <img
            src={dishDetail?.image}
            alt="food image"
            className="h-full w-full rounded-xl"
          />
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="text-3xl w-fit border-b-2 border-black ">
            {dishDetail?.name}
          </h2>
          <p>{dishDetail?.description}</p>
          <div className="flex gap-4  w-fit p-2 rounded-lg  ">
            <h4 className="text-xl font-semibold text-amber-600">Flavour:</h4>
            {dishDetail?.flavorProfile?.split(",").map((flavour, index) => (
              <span
                className=" flex items-center   justify-center  border-2 border-amber-600  p-1 px-3     rounded-full "
                key={index}
              >
                {flavour}
              </span>
            ))}
          </div>
          <div className="flex items-center justify-center  flex-wrap gap-2">
            <h4 className="text-xl font-semibold text-amber-600">
              ingredients:
            </h4>
            {dishDetail?.ingredients?.map((inde, index) => (
              <span
                className=" flex items-center   justify-center  border-2 border-amber-600   px-3     rounded-full mt-2 "
                key={index}
              >
                {inde}
              </span>
            ))}
          </div>
          <div className="mt-4 flex justify-between items-center">
            <span className="text-xl">
              Price:{" "}
              <span className="text-amber-600">{dishDetail?.price}$</span>
            </span>
            <button className="bg-amber-400 p-2 px-6 rounded-lg shadow-xl hover:translate-y-[-1px] hover:shadow-md ">
              Add To Cart
            </button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 my-[4rem]  items-center">
        <span className="h-2 bg-red-600 "></span>
        <h3 className="text-2xl text-center">Related Dishes</h3>
        <span className="h-2 bg-red-600"></span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-16 gap-5 ">
        {relatedDishes?.map((relatedDish) => (
          <DashCard key={relatedDish._id} {...relatedDish} />
        ))}
      </div>
    </Container>
  );
};

export default DishDetail;
