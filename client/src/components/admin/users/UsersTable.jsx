import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import DeleteUserModal from './DeleteUserModal';
import EditUserModal from './EditUserModal';

const UsersTable = ({ users, refetchUsers }) => {
    const [selectedUser, setSelectedUser] = useState({});
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);

    const handleOpenModal = (data, modal) => {
        if (modal === "edit") {
            setOpenEditModal(true);
        }
        if (modal === "delete") {
            setOpenDeleteModal(true);
        }
        setSelectedUser(data);
    };


    const handleCloseModal = () => {
        setOpenEditModal(false);
        setOpenDeleteModal(false);
        setSelectedUser({});
    };

    const columnDefs = [
        { headerName: "Name", field: "name", width: 200 },
        { headerName: "Email", field: "email", width: 250 },
        { headerName: "Role", field: "role", width: 150 },
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
            flex: 1,
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
            flex: 1,
        },
    ];

    return (
        <div className="ag-theme-quartz" style={{ height: "400px", width: "100%" }}>
            <AgGridReact
                rowData={users}
                columnDefs={columnDefs}
                rowHeight={60}
                rowSelection="single"
                pagination
                paginationPageSize={10}
            />
            {openEditModal && (
                <EditUserModal
                    openEditModal={openEditModal}
                    handleCloseModal={handleCloseModal}
                    selectedUser={selectedUser}
                    refetchUsers={refetchUsers}
                />
            )}
            {openDeleteModal && (
                <DeleteUserModal
                    openDeleteModal={openDeleteModal}
                    handleCloseModal={handleCloseModal}
                    selectedUser={selectedUser}
                    refetchUsers={refetchUsers}
                />
            )}

        </div>
    );
};

export default UsersTable;
