
    import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import "./CategoriesTable.css";

// Column Definitions for Ag-Grid
// const columnDefs = [
//   {
//     headerName: "Name", 
//     field: "name", 
//     cellStyle: {
//       display: "flex",
//       justifyContent: "start",
//       alignItems: "center",
//     },
//   },
//   {
//     headerName: "Image",
//     cellStyle: { marginTop: "5px" },
//     cellRenderer: (params) => (
//       <img width="50px" height="50px" src={params?.data?.image?.url} alt="category image" />
//     ),
//     sortable: false,
//   },
//   { 
//     headerName: "Total dishes", 
//     cellRenderer: (params) => (
//       <span>{params?.data?.dishes?.length || 0}</span>
//     ),
//   },
//   {
//     headerName: "Edit",
//     cellRenderer: (params) => (
//       <button 
//         onClick={() => handleEdit(params.data)} 
//         className="bg-red-500 text-white rounded-md w-full mt-2"
//       >
//         Edit
//       </button>
//     ),
//     sortable: false,
//   },
//   {
//     headerName: "Delete",
//     cellRenderer: (params) => (
//       <button 
//         onClick={() => handleDelete(params.data)} 
//         className="bg-red-500 text-white rounded-md w-full mt-2"
//       >
//         Delete
//       </button>
//     ),
//     sortable: false,
//   },
// ];

// Handle delete functionality
const handleDelete = (data) => {
  console.log("Deleting item:", data);
};

const CategoriesTable = ({ categories }) => {
  const [isOpen, setIsOpen] = useState(false); // Modal visibility state
  const [selectedCategory, setSelectedCategory] = useState(null); // Selected category for editing
  const [categoryName, setCategoryName] = useState('');
  const [categoryImage, setCategoryImage] = useState('');

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setCategoryName(category.name);
    setCategoryImage(category.image.url);
    setIsOpen(true);
  };

  const handleSave = () => {
    // Save the edited category (replace with API call to backend)
    const updatedCategory = {
      ...selectedCategory,
      name: categoryName,
      image: {
        ...selectedCategory.image,
        url: categoryImage,
      },
    };
    console.log('Saving updated category:', updatedCategory);
    setIsOpen(false); // Close the modal after saving
  };
const columnDefs = [
  {
    headerName: "Name", 
    field: "name", 
    cellStyle: {
      display: "flex",
      justifyContent: "start",
      alignItems: "center",
    },
  },
  {
    headerName: "Image",
    cellStyle: { marginTop: "5px" },
    cellRenderer: (params) => (
      <img width="50px" height="50px" src={params?.data?.image?.url} alt="category image" />
    ),
    sortable: false,
  },
  { 
    headerName: "Total dishes", 
    cellRenderer: (params) => (
      <span>{params?.data?.dishes?.length || 0}</span>
    ),
  },
  {
    headerName: "Edit",
    cellRenderer: (params) => (
      <button 
        onClick={() => handleEdit(params.data)} 
        className="bg-red-500 text-white rounded-md w-full mt-2"
      >
        Edit
      </button>
    ),
    sortable: false,
  },
  {
    headerName: "Delete",
    cellRenderer: (params) => (
      <button 
        onClick={() => handleDelete(params.data)} 
        className="bg-red-500 text-white rounded-md w-full mt-2"
      >
        Delete
      </button>
    ),
    sortable: false,
  },
];
  return (
    <div className="ag-theme-quartz h-[550px] z-10">
      <AgGridReact
        columnDefs={columnDefs}
        rowData={categories}
        pagination={true}
        rowHeight={60}
      />
      
      {/* Modal for editing category */}
      {selectedCategory && (
        <div 
          className={`fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center ${isOpen ? 'block' : 'hidden'}`}
          onClick={() => setIsOpen(false)} // Close modal when clicking outside
        >
          <div 
            className="bg-white rounded-lg shadow-xl w-[400px] p-6" 
            onClick={(e) => e.stopPropagation()} // Prevent modal closing when clicking inside
          >
            <h2 className="text-xl font-semibold mb-4">Edit Category</h2>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700" htmlFor="categoryName">Category Name</label>
              <input
                id="categoryName"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                placeholder="Enter category name"
                className="mt-1 px-4 py-2 border rounded-md w-full"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700" htmlFor="categoryImage">Category Image URL</label>
              <input
                id="categoryImage"
                value={categoryImage}
                onChange={(e) => setCategoryImage(e.target.value)}
                placeholder="Enter image URL"
                className="mt-1 px-4 py-2 border rounded-md w-full"
              />
            </div>

            <div className="flex justify-end gap-4">
              <button 
                onClick={() => setIsOpen(false)} 
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
              >
                Cancel
              </button>
              <button 
                onClick={handleSave} 
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoriesTable;
