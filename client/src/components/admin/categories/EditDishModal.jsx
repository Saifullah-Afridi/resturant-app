// import React from 'react';

// const EditDishModal = ({ openEditModal, setOpenEditModal }) => {

//   const handleSubmit = (e) => {
//     e.preventDefault();
//   }
//   return (
//     <div
//       className="fixed top-0 left-0 h-full w-full bg-black bg-opacity-60 flex flex-col items-center justify-center z-[99]"
//       onClick={() => setOpenEditModal(false)}
//     >
//       <div
//         className="bg-white h-[520px] w-3/5 rounded-lg p-3"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <div className='flex flex-col items-center gap-1' >
//           <h2 className="text-2xl font-bold text-gray-800">Edit Dish</h2>
//           <div className='h-1 bg-gray-800 w-24' ></div>
//         </div>

//         <form onSubmit={handleSubmit} className='flex flex-col gap-3 w-[90%] mx-auto'>
//           <div className='flex gap-2'  >
//             <div className='flex flex-col flex-1'>
//               <label htmlFor="name" className='cursor-pointer' >Name</label>
//               <input type="text" name="name" id="name" className='outline-none ring-1 ' />
//             </div>
//             <div className='flex flex-col flex-1' >
//               <label htmlFor="category" className='cursor-pointer' >Category</label>
//               <input type="text" name="category" id="category" className='outline-none ring-1 ' />
//             </div>
//             <div className='flex flex-col flex-1' >
//               <label htmlFor="price" className='cursor-pointer' >Price</label>
//               <input type="number" name="price" id="price" className='outline-none ring-1 ' />
//             </div>
//           </div>
//           <div className='flex flex-col'  >
//             <label htmlFor="description" className='cursor-pointer' >Description</label>
//             <textarea name="description" id="description" className='outline-none ring-1 '></textarea>
//           </div>
//           <div className='flex flex-col' >
//             <label htmlFor="ingrediants" className='cursor-pointer' >Ingrediants</label>
//             <textarea name="ingrediants" id="ingrediants" className='outline-none ring-1 '></textarea>
//           </div>
//           <div className='flex flex-col' >
//             <label htmlFor="flavours" className='cursor-pointer' >Flavours</label>
//             <textarea name="flavours" id="flavours" className='outline-none ring-1 '></textarea>
//           </div>
//           <div className='relative flex flex-col mt-2 bg-amber-400 cursor-pointer hover:bg-amber-500 rounded-lg '  >
//             <button type='button' className='h-10  cursor-pointer'> Upload Image</button>
//             <input type="file" name="image" id="image" className='absolute top-0 left-0 h-full w-full opacity-0 cursor-pointer  ' />
//           </div>
//           <button className='ring-1 ring-amber-500 h-10 mt-2 rounded-md hover:bg-amber-300 '  >Edit Dish</button>
//         </form>
//       </div>
//     </div>

//   );
// };

// export default EditDishModal;


import React from 'react';

const EditDishModal = ({ openEditModal, setOpenEditModal }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div
      className="fixed top-0 left-0 h-full w-full bg-black bg-opacity-60 flex items-center justify-center z-[99]"
      onClick={() => setOpenEditModal(false)}
    >
      <div
        className="bg-white max-h-[90vh] w-full sm:w-4/5 md:w-3/5 rounded-lg shadow-lg p-6 overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setOpenEditModal(false)}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
        >
          ✕
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-semibold text-gray-800">Edit Dish</h2>
          <div className="h-1 bg-amber-500 w-16 mx-auto mt-2"></div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Name */}
            <div className="flex flex-col">
              <label htmlFor="name" className="text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                placeholder="Enter dish name"
              />
            </div>
            {/* Category */}
            <div className="flex flex-col">
              <label htmlFor="category" className="text-sm font-medium text-gray-700">
                Category
              </label>
              <input
                type="text"
                name="category"
                id="category"
                className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                placeholder="Enter category"
              />
            </div>
            {/* Price */}
            <div className="flex flex-col">
              <label htmlFor="price" className="text-sm font-medium text-gray-700">
                Price
              </label>
              <input
                type="number"
                name="price"
                id="price"
                className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                placeholder="Enter price"
              />
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-col">
            <label htmlFor="description" className="text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              id="description"
              rows="3"
              className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
              placeholder="Enter description"
            ></textarea>
          </div>

          {/* Ingredients */}
          <div className="flex flex-col">
            <label htmlFor="ingredients" className="text-sm font-medium text-gray-700">
              Ingredients
            </label>
            <textarea
              name="ingredients"
              id="ingredients"
              rows="3"
              className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
              placeholder="Enter ingredients"
            ></textarea>
          </div>

          {/* Flavours */}
          <div className="flex flex-col">
            <label htmlFor="flavours" className="text-sm font-medium text-gray-700">
              Flavours
            </label>
            <textarea
              name="flavours"
              id="flavours"
              rows="3"
              className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
              placeholder="Enter flavours"
            ></textarea>
          </div>

          {/* Upload Image */}
          <div className="flex flex-col items-center">

            <div className="relative w-full">
              <button
                type="button"
                className="w-full py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 focus:ring focus:ring-amber-300"
              >
                Upload Image
              </button>
              <input
                type="file"
                name="image"
                id="image"
                className="absolute inset-0 h-full w-full opacity-0 cursor-pointer"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 focus:ring focus:ring-amber-300"
          >
            Edit Dish
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditDishModal;
