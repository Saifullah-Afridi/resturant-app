// SignUp.js
import React, { useState } from "react";
import { HiEye, HiEyeSlash } from "react-icons/hi2";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    passwordConfirm: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/v1/users/sign-up", formData);
      if (response.status === 201) {
        navigate("/auth/login"); // Redirect to login after successful sign up
      }
    } catch (error) {
      console.error("Sign Up failed:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-amber-100">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center text-amber-700 mb-6">Create Your Account</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {["name", "email", "phone", "address"].map((field) => (
            <div key={field} className="space-y-1">
              <input
                type={field === "email" ? "email" : "text"}
                name={field}
                placeholder={`Enter your ${field}`}
                className="w-full h-12 px-4 border rounded-lg border-gray-300"
                value={formData[field]}
                onChange={handleInputChange}
              />
            </div>
          ))}
          {["password", "passwordConfirm"].map((field, index) => (
            <div key={field} className="space-y-1 relative">
              <input
                type={showPassword ? "text" : "password"}
                name={field}
                placeholder={`Enter your ${field}`}
                className="w-full h-12 px-4 border rounded-lg border-gray-300"
                value={formData[field]}
                onChange={handleInputChange}
              />
              {index === 0 && (
                <span
                  className="absolute top-3 right-3 text-gray-500 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <HiEyeSlash size={20} /> : <HiEye size={20} />}
                </span>
              )}
            </div>
          ))}
          <button
            type="submit"
            className="w-full h-12 bg-amber-500 text-white rounded-lg font-semibold hover:bg-amber-600"
          >
            Sign Up
          </button>
        </form>
        <div className="mt-4 text-center">
          Already have an account?{" "}
          <span
            className="text-amber-700 font-semibold cursor-pointer hover:underline"
            onClick={() => navigate("/auth/login")}
          >
            Log In
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
