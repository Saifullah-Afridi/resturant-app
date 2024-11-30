import React, { useState } from "react";
import axios from "axios";
import Spinner from "../categories/Spinner";

const DeleteUserModal = ({ openDeleteModal, handleCloseModal, selectedUser, refetchUsers }) => {
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        setLoading(true);
        try {
            await axios.delete(`http://localhost:3000/api/v1/users/${selectedUser.id}`);
            await refetchUsers();
            setOpenDeleteModal(false);
        } catch (error) {
            console.error("Error deleting user:", error?.response?.data?.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {openDeleteModal && (
                <>
                    <div className="absolute z-[999] top-0 left-0 w-full h-full bg-black opacity-70"></div>
                    {/* Modal */}
                    <div className="bg-white z-[9999] w-[600px] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-lg overflow-hidden">
                        {loading ? (
                            <div className="flex items-center justify-center h-full">
                                <Spinner size={16} color="red-500" />
                            </div>
                        ) : (
                            <div className="p-6 text-center">
                                <h3 className="text-lg font-semibold text-gray-700 mb-4">
                                    Are you sure you want to delete user: {selectedUser?.name}?
                                </h3>
                                <div className="flex justify-center gap-4">
                                    <button
                                        onClick={handleDelete}
                                        className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                    <button
                                        onClick={() => handleCloseModal()}
                                        className="bg-gray-300 px-6 py-2 rounded hover:bg-gray-400"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </>
            )}
        </>
    );
};

export default DeleteUserModal;
