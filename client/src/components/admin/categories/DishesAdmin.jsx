import React, { useEffect, useState } from 'react'
import AddDishModal from './AddDishModal'
import DishesAdminTable from './DishesAdminTable'
import axios from 'axios';

const DishesAdmin = () => {

const [openModal,setOpenModal]  = useState(false)
const [dishes,setDishes] =   useState([]);
const [error,setError]  =useState("")
const fetchDishes = async()=>{
  try {
    const response = await axios.get('http://localhost:3000/api/v1/dishes');
    setDishes(response.data.dishes);
  } catch (error) {
    setError(error.response.data.message)
  }
}

useEffect(()=>{
  fetchDishes()
},[])
console.log(dishes);

  return (
    <>
      <div  className='text-[#2C3E50]  font-bold text-2xl tracking-wide  flex flex-col gap-1 items-center py-4 ' >
        
        <h1>Dishes Mangemenent</h1>
        <div className='h-1 bg-[#2C3E50] w-64 ' ></div>
      </div>
      <div className='flex justify-end mr-3 mt-1'>
        <button className='bg-amber-500 hover:bg-amber-600 px-12 py-[10px] rounded-md text-[#2C3E50] font-semibold tracking-normal hover:-translate-y-[1px] hover:shadow-md duration-200 ' onClick={()=>setOpenModal(true)}> Add Dish</button>
      </div>
     {openModal && <AddDishModal openModal={openModal} setOpenModal={setOpenModal} refetchDishes={fetchDishes} />}

{dishes ? 
     <DishesAdminTable dishes={dishes}/>
:<div>
  <h1>loading.....</h1>
</div>

}

    </>
  )
}

export default DishesAdmin