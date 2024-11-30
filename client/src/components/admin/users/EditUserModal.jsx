import React, { useState } from "react";
import { FaXmark } from "react-icons/fa6";
import axios from "axios";
import Spinner from "../categories/Spinner";

const EditUserModal = ({ openEditModal, handleCloseModal, selectedUser, refetchUsers }) => {
    const [name, setName] = useState(selectedUser?.name || "");
    const [email, setEmail] = useState(selectedUser?.email || "");
    const [phone, setPhone] = useState(selectedUser?.phone || "");
    const [address, setAddress] = useState(selectedUser?.address || "");
    const [role, setRole] = useState(selectedUser?.role || "");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [passwordError, setPasswordError] = useState("");
    const [passwordLoading, setPasswordLoading] = useState(false);
    const [showPasswordSection, setShowPasswordSection] = useState(false);

    const handleUserUpdate = async (e) => {
        e.preventDefault();

        if (!name || !email || !phone || !address || !role) {
            setError("Please provide all fields.");
            return;
        }

        setLoading(true);
        const updatedUser = { name, email, phone, address, role };

        try {
            await axios.put(`http://localhost:3000/api/v1/users/${selectedUser.id}`, updatedUser);
            await refetchUsers();
            handleCloseModal();
        } catch (error) {
            setError(error?.response?.data?.message || "An error occurred while updating the user.");
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordUpdate = async (e) => {
        e.preventDefault();

        if (!password || !confirmPassword) {
            setPasswordError("Please fill out both fields.");
            return;
        }

        if (password !== confirmPassword) {
            setPasswordError("Passwords do not match.");
            return;
        }

        setPasswordLoading(true);

        try {
            await axios.put(`http://localhost:3000/api/v1/users/${selectedUser.id}/password`, { password });
            setPassword("");
            setConfirmPassword("");
            setShowPasswordSection(false);
            setPasswordError("");
        } catch (error) {
            setPasswordError(error?.response?.data?.message || "An error occurred while updating the password.");
        } finally {
            setPasswordLoading(false);
        }
    };

    return (
        <div className="z-50">
            {openEditModal && (
                <>
                    <div className="absolute z-[999] top-0 left-0 w-full h-full bg-black bg-opacity-70"></div>
                    <div className="bg-white z-[9999] h-[90vh] w-[900px] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-lg overflow-auto">
                        {loading ? (
                            <div className="flex items-center justify-center h-full">
                                <Spinner size={16} color="blue-500" />
                            </div>
                        ) : (
                            <>
                                <div className="relative flex justify-center items-center p-3">
                                    <div className="flex flex-col items-center justify-center gap-2 mb-4">
                                        <h2 className="text-2xl font-semibold tracking-wide text-[#2C3E50]">Edit User</h2>
                                        <div className="h-[3px] bg-[#2C3E50] w-[170px]"></div>
                                    </div>
                                    <FaXmark
                                        aria-label="Close Modal"
                                        className="absolute right-3 top-2 rounded-full cursor-pointer"
                                        size={22}
                                        onClick={() => handleCloseModal()}
                                    />
                                </div>
                                {error && (
                                    <div className="bg-red-500 text-white text-center rounded p-2 mx-auto mb-4 w-4/5">
                                        {error}
                                    </div>
                                )}
                                <form
                                    className="flex flex-col gap-4 mt-5 w-3/5 mx-auto mb-5"
                                    onSubmit={handleUserUpdate}
                                >
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Name"
                                        className="h-9 outline-none focus:ring-2 focus:ring-amber-400 p-2 rounded-sm ring-1 ring-black"
                                        value={name}
                                        onChange={(e) => {
                                            setName(e.target.value);
                                            setError("");
                                        }}
                                    />
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email"
                                        className="h-9 outline-none focus:ring-2 focus:ring-amber-400 p-2 rounded-sm ring-1 ring-black"
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                            setError("");
                                        }}
                                    />
                                    <input
                                        type="text"
                                        name="phone"
                                        placeholder="Phone"
                                        className="h-9 outline-none focus:ring-2 focus:ring-amber-400 p-2 rounded-sm ring-1 ring-black"
                                        value={phone}
                                        onChange={(e) => {
                                            setPhone(e.target.value);
                                            setError("");
                                        }}
                                    />
                                    <textarea
                                        name="address"
                                        placeholder="Address"
                                        className="h-20 outline-none focus:ring-2 focus:ring-amber-400 p-2 rounded-sm ring-1 ring-black"
                                        value={address}
                                        onChange={(e) => {
                                            setAddress(e.target.value);
                                            setError("");
                                        }}
                                    ></textarea>
                                    <select
                                        name="role"
                                        className="h-9 outline-none focus:ring-2 focus:ring-amber-400 p-2 rounded-sm ring-1 ring-black"
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                    >
                                        <option value="">Select Role</option>
                                        <option value="Admin">Admin</option>
                                        <option value="User">User</option>
                                    </select>

                                    <button
                                        type="submit"
                                        className="py-2 border-2 border-amber-400 mt-2 rounded-sm hover:bg-amber-400 hover:shadow-lg transition-all duration-200"
                                    >
                                        Update User
                                    </button>
                                </form>

                                <div className="mt-5 w-3/5 mx-auto">
                                    <button
                                        className="py-2 w-full border-2 border-blue-500 mt-2 rounded-sm hover:bg-blue-500 hover:text-white transition-all duration-200"
                                        onClick={() => setShowPasswordSection(!showPasswordSection)}
                                    >
                                        {showPasswordSection ? "Cancel Password Update" : "Update Password"}
                                    </button>
                                    {showPasswordSection && (
                                        <form
                                            className="flex flex-col gap-4 mt-4"
                                            onSubmit={handlePasswordUpdate}
                                        >
                                            {passwordError && (
                                                <div className="bg-red-500 text-white text-center rounded p-2 mx-auto mb-4">
                                                    {passwordError}
                                                </div>
                                            )}
                                            <input
                                                type="password"
                                                name="password"
                                                placeholder="New Password"
                                                className="h-9 outline-none focus:ring-2 focus:ring-blue-400 p-2 rounded-sm ring-1 ring-black"
                                                value={password}
                                                onChange={(e) => {
                                                    setPassword(e.target.value);
                                                    setPasswordError("");
                                                }}
                                            />
                                            <input
                                                type="password"
                                                name="confirmPassword"
                                                placeholder="Confirm Password"
                                                className="h-9 outline-none focus:ring-2 focus:ring-blue-400 p-2 rounded-sm ring-1 ring-black"
                                                value={confirmPassword}
                                                onChange={(e) => {
                                                    setConfirmPassword(e.target.value);
                                                    setPasswordError("");
                                                }}
                                            />
                                            <button
                                                type="submit"
                                                className="py-2 border-2 border-green-500 mt-2 rounded-sm hover:bg-green-500 hover:text-white transition-all duration-200"
                                                disabled={passwordLoading}
                                            >
                                                {passwordLoading ? "Updating..." : "Update Password"}
                                            </button>
                                        </form>
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default EditUserModal;
