import React, { useState } from "react";
import { FaXmark } from "react-icons/fa6";
import axios from "axios";

const CategoriesModal = ({ openFormModal, setOpenFormModal }) => {
  const [imagePreview, setImagePreview] = useState(null);
  const [image, setImage] = useState(null);
  const [categroyName, setCategoryName] = useState("");
  const [error, setError] = useState("");
  const handleChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
      if (file) {
        setImage(file);
        const reader = new FileReader();
        reader.onload = (e) => {
          setImagePreview(e.target.result);
        };
        reader.readAsDataURL(file);
      }
  };

  const formData = new FormData();
  formData.append("name", categroyName);
  formData.append("image", image);

  //handle submit funtion
  const handleSumbit = (e) => {
    e.preventDefault();

    if (!image && !categroyName) {
      setError("Please provide both Category Name and Image");
      return;
    }
    axios
      .post("http://localhost:3000/api/v1/categories", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        setOpenFormModal(false);
      })
      .catch((err) => setError(err?.response?.data?.messaage));

    setOpenFormModal(false);
    setCategoryName("");
    setImage(null);
    setImagePreview(null);
  };

  return (
    <div className="z-50">
      {openFormModal && (
        <div className="absolute z-[90] top-0 right-0 h-full w-full bg-black opacity-80  "></div>
      )}
      {openFormModal && (
        <div className="bg-white z-[99] h-[90vh] w-[900px] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-60 rounded-sm">
          <div className=" relative flex justify-center items-center p-3  ">
            <div className="flex flex-col items-center justify-center gap-[2px]  mb-4">
              <h2 className="text-2xl font-semibold tracking-wide text-[#2C3E50]">
                Add Category
              </h2>
              <div className="h-[3px]  bg-[#2C3E50] w-[170px]"></div>
            </div>
            <FaXmark
              className="absolute right-3 top-2  rounded-full cursor-pointer"
              size={22}
              onClick={() => setOpenFormModal(false)}
            />
          </div>
          <div>
            {/* form to add new Category  */}
            {error && (
              <div className="bg-red-200 w-3/5 mx-auto p-3 ">!!!{error}</div>
            )}
            <form
              className="flex flex-col gap-4   mt-5 w-1/2 mx-auto"
              onSubmit={handleSumbit}
            >
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Name of Category"
                className="h-9 outline-none focus:ring-2 focus:ring-amber-400  p-2 rounded-sm ring-1 ring-black"
                value={categroyName}
                onChange={(e) => {
                  setCategoryName(e.target.value);
                  setError("");
                }}
              />

              <button
                type="button"
                className="relative ring-1 ring-black h-9 rounded-sm p-2 hover:bg-amber-300 "
              >
                Upload an image
                <input
                  type="file"
                  name="image"
                  id="mage"
                  onChange={handleChange}
                  className=" absolute top-0 right-0 opacity-0 cursor-pointer flex-1 w-full  border-2 border-black h-full"
                  onChangeCapture={handleChange}
                />
              </button>
              {imagePreview && (
                <img src={imagePreview} alt="image" width="200px" />
              )}
              <button className="py-2  border-2 border-amber-400 mt-2 rounded-sm   hover:bg-amber-400 hover:shadow-lg transition-all duration-200">
                Create New Category
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoriesModal;
