
import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import "./CategoriesTable.css";
import DeleteCategoryModal from './DeleteCategoryModal';
import EditCategoryModal from './EditCategoryModal';



const CategoriesTable = ({ categories, refetchCategories }) => {

  const [selectedCategory, setSelectedCategory] = useState({})
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [openEditModal, setOpenEditModal] = useState(false)


  const handleOpenModal = (data, modal) => {
    if (modal === "edit") {
      setOpenEditModal(true)
    }
    if (modal === "delete") {
      setOpenDeleteModal(true)
    }
    setSelectedCategory(data)
  }


  const columnDefs = [
    {
      headerName: "Name",
      field: "name",
      cellStyle: {
        display: "flex",
        justifyContent: "start",
        alignItems: "center",
      },
      width: 200
    },
    {
      headerName: "Image",
      cellStyle: { marginTop: "5px" },
      cellRenderer: (params) => (
        <img width="50px" height="50px" src={params?.data?.image?.url} alt="category image" />
      ),
      sortable: false,
      width: 200
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
          onClick={() => handleOpenModal(params.data, "edit")}
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-md w-full mt-2"
        >
          Edit
        </button>
      ),
      sortable: false,
      flex: 1
    },
    {
      headerName: "Delete",
      cellRenderer: (params) => (
        <button
          onClick={() => handleOpenModal(params.data, "delete")}
          className="bg-red-500 hover:bg-red-700 text-white rounded-md w-full mt-2"
        >
          Delete
        </button>
      ),
      sortable: false,
      flex: 1
    },
  ];
  return (
    <div className="ag-theme-quartz h-[400px] z-10">
      <AgGridReact
        columnDefs={columnDefs}
        rowData={categories}
        pagination={true}
        rowHeight={60}
        paginationPageSize={5}
      />

      {openDeleteModal && <DeleteCategoryModal category={selectedCategory} setOpenDeleteModal={setOpenDeleteModal} refetchCategories={refetchCategories} />}


      {openEditModal && <EditCategoryModal category={selectedCategory} setOpenEditModal={setOpenEditModal} refetchCategories={refetchCategories} />}
    </div>
  );
};

export default CategoriesTable;
