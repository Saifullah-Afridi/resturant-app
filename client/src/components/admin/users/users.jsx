import React, { useEffect, useState } from "react";
import UsersTable from "./UsersTable";
import axios from "axios";
import AddUserModal from "./AddUserModal";

const Users = () => {
    const [openFormModal, setOpenFormModal] = useState(false);
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        try {
            const res = await axios.get('http://localhost:3000/api/v1/users');
            setUsers(res?.data?.users);
        } catch (error) {
            console.log(error.response.data.message);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className="mt-5 mr-4">
            <div className="flex flex-col items-center gap-2">
                <h1 className="text-2xl font-bold text-center tracking-wide text-[#2C3E50]">User Management</h1>
                <div className="h-1 bg-[#2C3E50] w-[300px]"></div>
            </div>
            <div className="flex justify-end mt-2 mr-3 ">
                <button
                    className="bg-[#F39C12] px-8 py-[10px] rounded-md text-[#2C3E50] font-semibold shadow-sm transition-all duration-300 hover:bg-[#D68910] hover:shadow-lg hover:text-[#555] hover:-translate-y-[1px] mb-5"
                    onClick={() => setOpenFormModal(true)}
                >
                    Add User
                </button>
            </div>
            <div className="z-19">
                <AddUserModal
                    openFormModal={openFormModal}
                    setOpenFormModal={setOpenFormModal}
                    refetchUsers={fetchUsers}
                />
            </div>
            {users && <UsersTable users={users} refetchUsers={fetchUsers} />}
        </div>
    );
};

export default Users;
