import React, { useState, useContext } from "react";
import { HiEye, HiEyeSlash } from "react-icons/hi2";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../../context/authContext";

const AuthenticationPage = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    passwordConfirm: "",
    emailOrPhone: "",
  });

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSignUp) {
      try {
        const response = await axios.post("http://localhost:3000/api/v1/users/sign-up", formData);
        if (response.status === 201) {
          setIsSignUp(false); // Switch to login after successful sign up
        }
      } catch (error) {
        console.error("Sign Up failed:", error);
      }
    } else {
      try {
        const { emailOrPhone, password } = formData;
        const payload = /^[0-9]{10}$/.test(emailOrPhone)
          ? { phone: emailOrPhone, password }
          : { email: emailOrPhone, password };

        const response = await axios.post("http://localhost:3000/api/v1/users/log-in", payload, {
          withCredentials: true
        });
        const userData = response.data.user
        if (response.status === 200) {
          login(userData);
          navigate("/");
        }
      } catch (error) {
        console.error("Login failed:", error);
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-amber-100">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center text-amber-700 mb-6">
          {isSignUp ? "Create Your Account" : "Login"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {isSignUp ? (
            <>
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
            </>
          ) : (
            <>
              <input
                type="text"
                name="emailOrPhone"
                className="w-full h-12 px-4 border rounded-lg border-gray-300"
                placeholder="Enter your email or phone"
                value={formData.emailOrPhone}
                onChange={handleInputChange}
              />
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="w-full h-12 px-4 border rounded-lg border-gray-300"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                <span
                  className="absolute top-3 right-3 text-gray-500 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <HiEyeSlash size={20} /> : <HiEye size={20} />}
                </span>
              </div>
            </>
          )}
          <button
            type="submit"
            className="w-full h-12 bg-amber-500 text-white rounded-lg font-semibold hover:bg-amber-600"
          >
            {isSignUp ? "Sign Up" : "Login"}
          </button>
        </form>
        <div className="mt-4 text-center">
          {isSignUp ? (
            <>
              Already have an account?{" "}
              <span
                className="text-amber-700 font-semibold cursor-pointer hover:underline"
                onClick={() => setIsSignUp(false)}
              >
                Log In
              </span>
            </>
          ) : (
            <>
              Don't have an account?{" "}
              <span
                className="text-blue-600 cursor-pointer hover:underline"
                onClick={() => setIsSignUp(true)}
              >
                Sign Up
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthenticationPage;
