import React, { useEffect, useState } from "react";
import CategoriesModal from "./CategoriesModal";

import CategoriesTable from "./CategoriesTable";
import axios from "axios";
const Categories = () => {
  const [openFormModal, setOpenFormModal] = useState(false);
  const [categories,setCategories] = useState([])

  useEffect(()=>{
    axios.get('http://localhost:3000/api/v1/categories').then((res)=>setCategories(res?.data?.categories)
    ).catch(err=>console.log(err)
    )
  },[])
  return (
    <div className="mt-5 mr-4">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-2xl font-bold text-center tracking-wide text-[#2C3E50]">
          Categories Mangement
        </h1>
        <div className="h-1  bg-[#2C3E50] w-[300px]"></div>
      </div>
      <div className="flex justify-end mt-2 mr-3 ">
        <button
          className="bg-[#F39C12] px-8 py-[10px] rounded-md text-[#2C3E50] font-semibold  shadow-sm transition-all duration-300 hover:bg-[#D68910] hover:shadow-lg hover:text-[#555] hover:-translate-y-[1px]"
          onClick={() => setOpenFormModal(true)}
        >
          Add Category
        </button>
      </div>
      <CategoriesModal
        openFormModal={openFormModal}
        setOpenFormModal={setOpenFormModal}
      />
   {categories && <CategoriesTable categories ={categories}/>}

    </div>
  );
};

export default Categories;
