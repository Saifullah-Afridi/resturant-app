import React from "react";
import { FaXmark } from "react-icons/fa6";

const CategoriesModal = ({openFormModal,setOpenFormModal}) => {
  return (
    <div>
      {openFormModal && (
        <div className="absolute top-0 right-0 h-full w-full bg-black opacity-80 flex flex-col items-center justify-center "></div>
      )}
      {openFormModal && (
        <div className="bg-white h-[90vh] w-[900px] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-60 rounded-sm">
          <div className=" relative flex justify-center items-center p-3 ">
            <div className="flex flex-col items-center justify-center gap-[2px]">
              <h2 className="text-xl font-semibold tracking-wide text-[#2C3E50]">
                Add Category
              </h2>
              <div className="h-[3px]  bg-[#2C3E50] w-[170px]"></div>
            </div>
            <FaXmark
              className="absolute right-3 top-2  rounded-full cursor-pointer"
              size={18}
              onClick={()=>setOpenFormModal(false)}
            />
          </div>
          <div>
            {/* form to add new Category  */}
                <form className="flex flex-col gap-3   mt-5 w-1/2 mx-auto">
                <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Name of Category"
                    className="h-9 outline-none focus:ring-2 focus:ring-amber-400  p-2 rounded-sm ring-1 ring-black"
                />
                   <input type="file" name="" id="" />
                
                </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoriesModal;
