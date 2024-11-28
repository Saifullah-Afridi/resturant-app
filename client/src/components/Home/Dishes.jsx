import React, { useEffect, useState } from "react";
import Container from "./../navbar/container/Container";
import { food_list } from "./ExploreSectionImages";
import DashCard from "./DashCard";
import Skeleton from "../Skeleton";
import axios from 'axios';

const Dishes = ({ selectedCategory }) => {
  const [dishes, setDishes] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    setLoading(true)
    const fetchDishes = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/dishes")
        setDishes(response.data.dishes)
      } catch (error) {
        setError(error.response.data.message)
      } finally {
        setLoading(false)
      }
    }
    fetchDishes()
  }, [])

  const filteredDishes = selectedCategory ? dishes.filter(dish => dish.category.name === selectedCategory) : dishes;



  return (
    <Container>
      <h2 className="text-2xl mt-8 mb-6 font-semibold">
        Thes dishes we offer{" "}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {loading ? <Skeleton count={8} /> : <>

          {filteredDishes.length > 0 ? filteredDishes?.map((foodItem) => (
            <DashCard key={foodItem._id} {...foodItem} />
          )) : <h3 className="text-xl text-center  text-red-500" >No dishes found </h3>}
        </>

        }

      </div>
    </Container>
  );
};

export default Dishes;
