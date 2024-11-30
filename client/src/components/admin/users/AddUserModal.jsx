import React, { useState } from "react";
import { FaXmark, FaEye, FaEyeSlash } from "react-icons/fa6";
import axios from "axios";
import Spinner from "../categories/Spinner";

const AddUserModal = ({ openFormModal, setOpenFormModal, refetchUsers }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [role, setRole] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !email || !address || !phone || !role || !password || !confirmPassword) {
            setError("Please provide all fields.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setLoading(true);
        const newUser = { name, email, address, phone, role, password };

        try {
            await axios.post("http://localhost:3000/api/v1/users", newUser);
            await refetchUsers();
            setName("");
            setEmail("");
            setAddress("");
            setPhone("");
            setRole("");
            setPassword("");
            setConfirmPassword("");
            setOpenFormModal(false);
        } catch (error) {
            setError(error?.response?.data?.message || "An error occurred while adding the user.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="z-50">
            {openFormModal && (
                <>
                    <div className="absolute z-[999] top-0 left-0 w-full h-full bg-black opacity-70"></div>
                    <div className="bg-white z-[9999] h-[90vh] w-[900px] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-lg overflow-auto">
                        {loading ? (
                            <div className="flex items-center justify-center h-full">
                                <Spinner size={16} color="blue-500" />
                            </div>
                        ) : (
                            <>
                                <div className="relative flex justify-center items-center p-3">
                                    <div className="flex flex-col items-center justify-center gap-2 mb-4">
                                        <h2 className="text-2xl font-semibold tracking-wide text-[#2C3E50]">Add User</h2>
                                        <div className="h-[3px] bg-[#2C3E50] w-[170px]"></div>
                                    </div>
                                    <FaXmark
                                        aria-label="Close Modal"
                                        className="absolute right-3 top-2 rounded-full cursor-pointer"
                                        size={22}
                                        onClick={() => setOpenFormModal(false)}
                                    />
                                </div>
                                {error && (
                                    <div className="bg-red-500 text-white text-center rounded p-2 mx-auto mb-4 w-4/5">
                                        {error}
                                    </div>
                                )}
                                <form
                                    className="flex flex-col gap-4 mt-5 w-3/5 mx-auto mb-5"
                                    onSubmit={handleSubmit}
                                >
                                    {/* Name Field */}
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
                                    {/* Email Field */}
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
                                    {/* Address Field */}
                                    <input
                                        type="text"
                                        name="address"
                                        placeholder="Address"
                                        className="h-9 outline-none focus:ring-2 focus:ring-amber-400 p-2 rounded-sm ring-1 ring-black"
                                        value={address}
                                        onChange={(e) => {
                                            setAddress(e.target.value);
                                            setError("");
                                        }}
                                    />
                                    {/* Phone Field */}
                                    <input
                                        type="tel"
                                        name="phone"
                                        placeholder="Phone"
                                        className="h-9 outline-none focus:ring-2 focus:ring-amber-400 p-2 rounded-sm ring-1 ring-black"
                                        value={phone}
                                        onChange={(e) => {
                                            setPhone(e.target.value);
                                            setError("");
                                        }}
                                    />
                                    {/* Role Field */}
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
                                    {/* Password Field */}
                                    <div className="relative">
                                        <input
                                            type={passwordVisible ? "text" : "password"}
                                            name="password"
                                            placeholder="Password"
                                            className="h-9 outline-none focus:ring-2 focus:ring-amber-400 p-2 rounded-sm ring-1 ring-black w-full"
                                            value={password}
                                            onChange={(e) => {
                                                setPassword(e.target.value);
                                                setError("");
                                            }}
                                        />
                                        <span
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                                            onClick={() => setPasswordVisible(!passwordVisible)}
                                        >
                                            {passwordVisible ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                                        </span>
                                    </div>
                                    {/* Confirm Password Field */}
                                    <div className="relative">
                                        <input
                                            type={confirmPasswordVisible ? "text" : "password"}
                                            name="confirmPassword"
                                            placeholder="Confirm Password"
                                            className="h-9 outline-none focus:ring-2 focus:ring-amber-400 p-2 rounded-sm ring-1 ring-black w-full"
                                            value={confirmPassword}
                                            onChange={(e) => {
                                                setConfirmPassword(e.target.value);
                                                setError("");
                                            }}
                                        />
                                        <span
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                                            onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                                        >
                                            {confirmPasswordVisible ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                                        </span>
                                    </div>
                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        className="py-2 border-2 border-amber-400 mt-2 rounded-sm hover:bg-amber-400 hover:shadow-lg transition-all duration-200"
                                    >
                                        Create New User
                                    </button>
                                </form>
                            </>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default AddUserModal;
