import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaXmark } from "react-icons/fa6";

const EditDishModal = ({ setOpenEditModal, dish, categoriesList, refetchDishes }) => {

  const [formData, setFormData] = useState({
    name: dish?.name || "",
    category: dish?.category?.name || "",
    price: dish?.price || 0,
    description: dish?.description || "",
    flavors: dish?.flavors || "",
    ingredients: dish?.ingredients || "",
    image: dish.image.url
  });

  console.log(dish);


  const [imagePreview, setImagePreview] = useState(null)
  const [error, setError] = useState({})

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData, image: file
      })
    }
    const reader = new FileReader();

    reader.onload = (e) => {
      setImagePreview(e.target.result)
    }

    reader.readAsDataURL(file)
  }

  const handleInput = (e) => {
    ``
    setFormData({
      ...formData, [e.target.name]: e.target.value
    })
    if (error[e.target.name]) {
      setError({
        ...error,
        [e.target.name]: null
      });
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();

    const newError = {};
    if (!formData.name.trim()) {
      newError.name = "Name is Required";
    }
    // Safely check if formData.category is a string before trimming
    if (!formData.category || !formData?.category?.trim()) {
      newError.category = "Category is Required";
    }
    if (!formData.price || formData.price <= 0) {
      newError.price = "Price must be greater than 0";
    }
    if (!formData.description.trim()) {
      newError.description = "Description is Required";
    }
    if (!formData.flavors.trim()) {
      newError.flavors = "Flavors is Required";
    }
    if (!formData.ingredients.trim()) {
      newError.ingredients = "Ingredients is Required";
    }
    if (formData.image === null) {
      newError.image = "Image is required";
    }

    if (Object.keys(newError).length > 0) {
      setError(newError);
      return;
    }
    console.log("hello again");

    const FormDataToSend = new FormData()
    Object.keys(formData).forEach((key) => {
      if (key === "image") {
        // Handle image differently
        if (typeof formData.image === "string") {
          // Add previous image URL as a separate field if it's not a file
          FormDataToSend.append("existingImage", formData.image);
        } else {
          // Add new image file
          FormDataToSend.append(key, formData.image);
        }
      } else {
        FormDataToSend.append(key, formData[key]);
      }
    });
    axios.patch(`http://localhost:3000/api/v1/dishes/${dish._id}`, FormDataToSend, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    }).then(res => {
      setOpenEditModal(false)
      refetchDishes()

    }).catch(err => console.log(err)
    )

  }



  return (
    <div
      className="fixed top-0 left-0 h-full w-full bg-black bg-opacity-60 flex flex-col items-center justify-center z-[99] "

    >
      <div
        className="bg-white h-[520px] w-3/5 rounded-lg p-3 overflow-y-auto "
      >
        <div className='flex justify-center items-center relative'>

          <div className='flex flex-col items-center gap-1 ' >
            <h2 className="text-2xl font-bold text-gray-800">Edit Dish</h2>
            <div className='h-1 bg-gray-800 w-24' ></div>
          </div>
          <FaXmark className='absolute top-2 right-2 cursor-pointer' size={22} onClick={() => setOpenEditModal(false)} />
        </div>

        <form onSubmit={handleSubmit} className='flex flex-col gap-3 w-[90%] mx-auto mt-5 '>
          <div className='flex gap-2'  >
            <div className='flex flex-col flex-1 gap-1 '>
              <label htmlFor="name" className='cursor-pointe text-[14px] text-gray-700' >Name <span className='text-red-500'  >*</span> </label>
              <input required type="text" name="name" id="name" className='outline-none ring-1  p-4 h-7 rounded-md' value={formData.name} onChange={handleInput} />
              {error.name && <p className='text-red-500'    >{error.name}</p>}
            </div>
            <div className='flex flex-col flex-1 gap-1' >
              <div className='flex flex-col flex-1 gap-1'>
                <label htmlFor="category" className='cursor-pointer text-[14px] text-gray-700'>
                  Category <span className='text-red-500'>*</span>
                </label>
                <select
                  name="category"
                  id="category"
                  className='outline-none ring-1 p-1 h-8 rounded-md'
                  value={formData.category}
                  onChange={handleInput}
                >
                  <option value="" disabled>Select Category</option>
                  {categoriesList?.map((category) => <option key={category} value={category} >{category}</option>)}
                </select>
                {error.category && <span className="text-red-500 text-sm">{error.category}</span>}
              </div>

              {error.category && <p className='text-red-500'    >{error.category}</p>}

            </div>
            <div className='flex flex-col flex-1 gap-1 ' >
              <label htmlFor="price" className='cursor-pointer text-[14px] text-gray-700' >Price <span className='text-red-500' >*</span> </label>
              <input required type="number" name="price" id="price" className='outline-none p-4 ring-1 h-7 rounded-md ' value={formData.price} onChange={handleInput} />
              {error.price && <p className='text-red-500'  >{error.price}</p>}

            </div>
          </div>
          <div className='flex flex-col gap-1 '  >
            <label htmlFor="description" className='cursor-pointer' >Description <span className='text-red-500' >*</span> </label>
            <textarea name="description" id="description" className='outline-none ring-1 h-16 rounded-md p-2' placeholder='description...S' value={formData.description} onChange={handleInput} ></textarea>
            {error.description && <p className='text-red-500'  >{error.description}</p>}

          </div>
          <div className='flex flex-col gap-2' >
            <label htmlFor="ingredients" className='cursor-pointer' >Ingredients <span className='text-red-500' >*</span> </label>
            <textarea name="ingredients" id="ingredients" className='outline-none ring-1 h-16 rounded-md p-2  ' placeholder='eg.Salt, tomato,....' value={formData.ingredients} onChange={handleInput} ></textarea>
            {error.ingredients && <p className='text-red-500'  >{error.ingredients}</p>}

          </div>
          <div className='flex flex-col gap-1' >
            <label htmlFor="flavors" className='cursor-pointer' > Flavors <span className='text-red-500' >*</span> </label>
            <textarea name="flavors" id="flavors" className='outline-none ring-1 h-16 p-2 rounded-md' placeholder='eg...salaty,etc' value={formData.flavors} onChange={handleInput} ></textarea>
            {error.flavors && <p className='text-red-500' >{error.flavors}</p>}

          </div>
          <div className='flex flex-col mt-2 bg-amber-400 cursor-pointer hover:bg-amber-500 rounded-lg '  >
            {/* <button type='button' className='h-10  cursor-pointer'> Upload Image</button> */}
            <input type="file" name="image" id="image" className=' h-full w-full cursor-pointer  ' onChange={handleFileUpload} />
          </div>
          <div className='flex'>
            <img src={imagePreview || dish.image.url} width={300} height={300} alt="" />
          </div>
          <button type="submit" className='ring-1 ring-amber-500 h-10 mt-2 rounded-md hover:bg-amber-300 '  >Edit Dish</button>
        </form>
      </div>
    </div>

  );
};

export default EditDishModal;



