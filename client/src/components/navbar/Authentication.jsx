import React, { useState } from "react";
import { HiEye, HiEyeSlash } from "react-icons/hi2";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const AuthenticationPage = () => {
  const [loginState, setLoginState] = useState(false);
  const [signupState, setSignUpState] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [errorInSignUp, setErrorInSignUp] = useState("");
  const [errorInLogin, setErrorInLogin] = useState("");  // Added error state for login
  const [formSignUpData, setFormSignUpData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    passwordConfirm: "",
  });
  const [error, setError] = useState({});
  const [loginData, setLoginData] = useState({
    emailOrPhone: "",
    password: "",
  });

  const navigate = useNavigate()
  const handleInputSignUp = (e) => {
    setFormSignUpData({ ...formSignUpData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const newError = {};
    if (!formSignUpData.name) {
      newError.name = "Name is Required";
    }
    if (!formSignUpData.email) {
      newError.email = "Email is Required";
    }
    if (!formSignUpData.phone) {
      newError.phone = "Phone is Required";
    }
    if (!formSignUpData.address) {
      newError.address = "Address is Required";
    }
    if (!formSignUpData.password) {
      newError.password = "Password is Required";
    }
    if (formSignUpData.password !== formSignUpData.passwordConfirm) {
      newError.passwordConfirm = "Passwords do not match";
    }
    setError(newError);
    if (Object.keys(newError).length > 0) {
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/api/v1/users/sign-up", formSignUpData);
      if (response.status === 201) {
        setSignUpState(false);
        setLoginState(true);
        setFormSignUpData({
          name: "",
          email: "",
          phone: "",
          address: "",
          password: "",
          passwordConfirm: "",
        });
      }
    } catch (error) {
      setErrorInSignUp(error.response.data.message);
    }
  };

  // Handle input change for login form
  const handleInputLogin = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  // Handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    const { emailOrPhone, password } = loginData;

    if (!emailOrPhone || !password) {
      setErrorInLogin("Please provide both email/phone and password.");
      return;
    }

    const isPhone = /^[0-9]{10}$/.test(emailOrPhone);  // Regex to check if input is a phone number (10 digits)

    // Prepare login data based on whether it's a phone or email
    const loginPayload = isPhone
      ? { phone: emailOrPhone, password }
      : { email: emailOrPhone, password };

    try {
      const response = await axios.post("http://localhost:3000/api/v1/users/log-in", loginPayload);
      if (response.status === 200) {
        navigate("/")
        setErrorInLogin("");
      }
    } catch (error) {
      setErrorInLogin(error.response?.data?.message || "An error occurred during login.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-amber-100">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        {signupState ? (
          <div>
            <h2 className="text-2xl font-bold text-center text-amber-700 mb-6">
              Create Your Account
            </h2>
            <form onSubmit={handleSignUp} className="space-y-6">
              {[
                { name: "name", type: "text", placeholder: "Enter your name" },
                { name: "email", type: "email", placeholder: "Enter your email" },
                { name: "phone", type: "tel", placeholder: "Enter your phone number" },
                { name: "address", type: "text", placeholder: "Enter your address" },
              ].map(({ name, type, placeholder }) => (
                <div key={name} className="space-y-1">
                  <input
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    className={`w-full h-12 px-4 border rounded-lg focus:ring-2 focus:ring-amber-400 ${error[name] ? "border-red-500" : "border-gray-300"}`}
                    value={formSignUpData[name]}
                    onChange={handleInputSignUp}
                  />
                  {error[name] && <p className="text-sm text-red-500">{error[name]}</p>}
                </div>
              ))}
              {[
                { name: "password", placeholder: "Enter your password" },
                { name: "passwordConfirm", placeholder: "Confirm your password" },
              ].map(({ name, placeholder }, index) => (
                <div key={name} className="space-y-1 relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name={name}
                    placeholder={placeholder}
                    className={`w-full h-12 px-4 border rounded-lg focus:ring-2 focus:ring-amber-400 ${error[name] ? "border-red-500" : "border-gray-300"}`}
                    value={formSignUpData[name]}
                    onChange={handleInputSignUp}
                  />
                  {index === 0 && (
                    <span
                      className="absolute top-3 right-3 text-gray-500 cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <HiEyeSlash size={20} /> : <HiEye size={20} />}
                    </span>
                  )}
                  {error[name] && <p className="text-sm text-red-500">{error[name]}</p>}
                </div>
              ))}
              <button
                type="submit"
                className="w-full h-12 bg-amber-500 text-white rounded-lg font-semibold hover:bg-amber-600 focus:ring-2 focus:ring-amber-400 focus:outline-none"
              >
                Sign Up
              </button>
            </form>
            <div className="mt-4 text-center">
              Already have an account?{" "}
              <span
                className="text-amber-700 font-semibold cursor-pointer hover:underline"
                onClick={() => {
                  setSignUpState(false);
                  setLoginState(true);
                }}
              >
                Log In
              </span>
            </div>
          </div>
        ) : (
          <div>
            <h2 className="text-amber-900 text-xl font-semibold mb-4 text-center">Login</h2>
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <input
                type="text"
                name="emailOrPhone"
                className="h-10 p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 rounded-md"
                placeholder="Enter your email or Phone Number"
                value={loginData.emailOrPhone}
                onChange={handleInputLogin}
              />
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="w-full h-10 p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 rounded-md"
                  placeholder="Enter your password"
                  value={loginData.password}
                  onChange={handleInputLogin}
                />
                {showPassword ? (
                  <HiEyeSlash
                    className="absolute top-3 right-2 cursor-pointer"
                    onClick={() => setShowPassword(false)}
                  />
                ) : (
                  <HiEye
                    className="absolute top-3 right-2 cursor-pointer"
                    onClick={() => setShowPassword(true)}
                  />
                )}
              </div>
              <button
                type="submit"
                className="w-full h-10 bg-amber-500 text-white rounded-md hover:bg-amber-600"
              >
                Login
              </button>
              {errorInLogin && <p className="text-sm text-red-500 mt-2">{errorInLogin}</p>}
            </form>
            <div className="text-center mt-4">
              Don't have an account?{" "}
              <span
                className="text-blue-600 cursor-pointer hover:underline"
                onClick={() => {
                  setSignUpState(true);
                  setLoginState(false);
                }}
              >
                Sign Up
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthenticationPage;
