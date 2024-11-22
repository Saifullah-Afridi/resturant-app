import axios from 'axios';
import React, { useState } from 'react';

const AddDishModal = ({ openModal, setOpenModal, refetchDishes, categoriesList }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    category: "",
    flavors: "",
    ingredients: "",
    image: null
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState("");

  const handleInput = (e) => {
    setError("");
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "price" ? Number(value) : value, // Ensure price is always a number
    });
  };

  const handleFileUpload = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError("Please select a valid image file.");
        return;
      }

      setFormData({ ...formData, image: file });
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.category.trim() || !formData.description.trim() || !formData.ingredients.trim() || !formData.flavors.trim() || formData.price <= 0 || !formData.image) {
      setError("Please fill all fields");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('category', formData.category);
    formDataToSend.append('price', formData.price);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('ingredients', formData.ingredients);
    formDataToSend.append('flavors', formData.flavors);
    formDataToSend.append('image', formData.image);

    try {
      const res = await axios.post("http://localhost:3000/api/v1/dishes", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      if (res) {
        setOpenModal(false);
        refetchDishes();
      }
    } catch (error) {
      console.log(error);
      setError(error?.response?.data?.message || "An unexpected error occurred.");
    }
  };

  return (
    <>
      {openModal && (
        <div className="z-[98] fixed top-0 right-0 w-full h-full bg-black bg-opacity-60 flex flex-col justify-center items-center" onClick={() => setOpenModal(false)}>
          <div className="h-auto w-3/5 bg-[#f9f9f9] shadow-lg rounded-md opacity-1 p-4 overflow-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center flex-col gap-1">
              <h1 className="text-[#2C3E50] text-2xl font-bold tracking-wide">Add Dish</h1>
              <div className="h-1 bg-[#2C3E50] w-28"></div>
            </div>
            {error && (
              <div className="my-3 bg-red-100 h-14 shadow-lg p-2">
                <p className="text-md font-semi-bold text-red-900 text-center"> !!! {error} !!!</p>
              </div>
            )}
            <form className="flex flex-col gap-3 w-4/5 mt-7 mx-auto p-5" onSubmit={handleSubmit}>
              <div className="flex gap-3">
                <input type="text" className="p-2 rounded-sm border-none outline-none ring-1 flex-1 ring-black shadow-2xl h-10 border border-black ring-opacity-30" name="name" id="name" placeholder="Enter dish name..." value={formData.name} onChange={handleInput} />
                <div>
                  <select value={formData.category} onChange={handleInput} name="category" className="h-10 ring-1 rounded-md">
                    <option value="">Select A Category</option>
                    {categoriesList.map((category, index) => <option key={index} value={category}>{category}</option>)}
                  </select>
                </div>
                <input type="number" className="p-2 rounded-sm border-none outline-none ring-1 flex-1 ring-black shadow-2xl h-10 border border-black ring-opacity-30" name="price" id="price" placeholder="Enter price" value={formData.price} onChange={handleInput} />
              </div>
              <textarea name="description" id="description" className="mt-2 p-2 outline-none ring-1 ring-black rounded-sm shadow-lg ring-opacity-30" placeholder="Enter Description here..." value={formData.description} onChange={handleInput}></textarea>
              <textarea name="ingredients" id="ingredients" className="mt-2 p-2 outline-none ring-1 ring-black rounded-sm shadow-lg ring-opacity-30" placeholder="Enter Ingredients here..." value={formData.ingredients} onChange={handleInput}></textarea>
              <textarea name="flavors" id="flavors" className="mt-2 p-2 outline-none ring-1 ring-black rounded-sm shadow-lg ring-opacity-30" placeholder="Enter Flavours here..." value={formData.flavors} onChange={handleInput}></textarea>
              <div className="flex gap-3 items-center mt-3">
                <input type="file" name="image" id="image" accept="image/*" onChange={handleFileUpload} />
                {imagePreview && <img src={imagePreview} alt="Dish Preview" className="w-20 h-20 object-cover" />}
              </div>
              <div className="flex gap-5 mt-5 items-center justify-between">
                <button type="button" className="px-4 py-2 rounded-md bg-red-600 text-white" onClick={() => setOpenModal(false)}>Cancel</button>
                <button type="submit" className="px-4 py-2 rounded-md bg-blue-600 text-white">Add Dish</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddDishModal;
