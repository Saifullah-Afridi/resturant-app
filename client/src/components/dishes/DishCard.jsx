import React from "react";

const DishCard = () => {
  return (
    <div className="w-[26%]">
      <img src={"/food_8.png"} alt="" />
      <div className="flex justify-between items-center">
        <h5>Greek Salad</h5>
        <p>starstarstar</p>
      </div>
    </div>
  );
};

export default DishCard;
