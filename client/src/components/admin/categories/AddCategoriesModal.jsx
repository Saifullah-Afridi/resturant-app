import React, { useState } from "react";
import { FaXmark } from "react-icons/fa6";
import axios from "axios";
import Spinner from "./Spinner";

const AddCategoriesModal = ({ openFormModal, setOpenFormModal, refetchCategories }) => {
  const [imagePreview, setImagePreview] = useState(null);
  const [image, setImage] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image || !categoryName) {
      setError("Please provide both Category Name and Image");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("name", categoryName);
    formData.append("image", image);

    try {
      await axios.post("http://localhost:3000/api/v1/categories", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      await refetchCategories();
      setCategoryName("");
      setImage(null);
      setImagePreview(null);
      setOpenFormModal(false);
    } catch (error) {
      setError(error?.response?.data?.message || "An error occurred while adding the category.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="z-50">
      {openFormModal && (
        <>
          <div className="absolute z-[999] top-0 left-0 w-full h-full bg-black opacity-70"></div>
          {/* Modal */}
          <div className="bg-white z-[9999] h-[90vh] w-[900px] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-lg overflow-auto">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <Spinner size={16} color="blue-500" />
              </div>
            ) : (
              <>
                <div className="relative flex justify-center items-center p-3">
                  <div className="flex flex-col items-center justify-center gap-2 mb-4">
                    <h2 className="text-2xl font-semibold tracking-wide text-[#2C3E50]">Add Category</h2>
                    <div className="h-[3px] bg-[#2C3E50] w-[170px]"></div>
                  </div>
                  <FaXmark
                    aria-label="Close Modal"
                    className="absolute right-3 top-2 rounded-full cursor-pointer"
                    size={22}
                    onClick={() => setOpenFormModal(false)}
                  />
                </div>
                <div>
                  {/* Error Message */}
                  {error && (
                    <div className="bg-red-500 text-white text-center rounded p-2 mx-auto mb-4 w-4/5">
                      {error}
                    </div>
                  )}

                  {/* Form */}
                  <form
                    className="flex flex-col gap-4 mt-5 w-3/5 mx-auto mb-5"
                    onSubmit={handleSubmit}
                  >
                    <input
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Name of Category"
                      className="h-9 outline-none focus:ring-2 focus:ring-amber-400 p-2 rounded-sm ring-1 ring-black"
                      value={categoryName}
                      onChange={(e) => {
                        setCategoryName(e.target.value);
                        setError("");
                      }}
                    />

                    <button
                      type="button"
                      className="relative ring-1 ring-black h-9 rounded-sm p-2 hover:bg-amber-300"
                    >
                      Upload an image
                      <input
                        type="file"
                        name="image"
                        id="image"
                        onChange={handleChange}
                        className="absolute top-0 right-0 opacity-0 cursor-pointer flex-1 w-full h-full"
                      />
                    </button>

                    {/* Image Preview */}
                    {imagePreview && (
                      <div className="flex justify-center">
                        <img src={imagePreview} alt="Preview" className="mt-3 rounded shadow-lg" width="200px" />
                      </div>
                    )}

                    <button
                      type="submit"
                      className="py-2 border-2 border-amber-400 mt-2 rounded-sm hover:bg-amber-400 hover:shadow-lg transition-all duration-200"
                    >
                      Create New Category
                    </button>
                  </form>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default AddCategoriesModal;
