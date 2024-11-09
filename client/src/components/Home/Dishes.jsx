import React from "react";
import Container from "./../navbar/container/Container";
import { food_list } from "./ExploreSectionImages";
import DashCard from "./DashCard";

const Dishes = ({ selectedCategory }) => {
  let filteredList;
  if (selectedCategory) {
    filteredList = food_list.filter(
      (item) => item.category === selectedCategory
    );
  } else {
    filteredList = food_list;
  }

  return (
    <Container>
      <h2 className="text-2xl mt-8 mb-6 font-semibold">Top dishes near you </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
        {filteredList?.map((foodItem) => (
          <DashCard key={foodItem._id} {...foodItem} />
        ))}
      </div>
    </Container>
  );
};

export default Dishes;
