import React, { useState } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import {
    AppContext,
    useAppContext
} from "../context/AppProvider";
import leftBg from "../assets/Sidebg.jpg";

import PasswordReset from "../pages/PasswordReset";
import ForgotPassword from "../pages/Forgotpassword";
import { login } from "../services/apiservices";

export default function Login() {
    const [formdata, setFormData] = useState({ email: "", password: "" });
    const [showpassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [isloading, setIsLoading] = useState(false);
    const [showPasswordReset, setShowPasswordReset] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");
    // const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const { setUserSession } = useAppContext();

    const HandleInputChange = (e) => { //This function runs whenever an input field changes (like typing in a textbox).
        const { name, value } = e.target;  // It takes the name and value from the input field.
        setFormData((prev) => ({ ...prev, [name]: value })); // This updates your form state dynamically.// prev = previous form data // ...prev = keeps old values // [name]: value = updates only the changed field
        if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" })); // If there was an error for that field, it clears it when the user starts typing again.
    }

    const validateForm = () => { // This function is form validation logic—it checks inputs and decides if the form is valid.
        const newErrors = {}; // Creates an empty object to store errors.

        if (!formdata.email.trim()) newErrors.email = "Email is required"; // Checks if email is empty (even spaces count as empty because of .trim()).

        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formdata.email))
            newErrors.email = "Invalid email address";            // Uses a regex to check if the email format is valid.

        if (!formdata.password) newErrors.password = "Password is required";  //Checks if password is empty.

        else if (formdata.password.length < 6)
            newErrors.password = "Password must be at least 6 characters";   //Ensures password is at least 6 characters.

        setErrors(newErrors); //Updates the error state so UI can show messages

        return Object.keys(newErrors).length === 0; // ➡️ Checks if there are no errors:
        // true → form is valid
        // false → form has errors
    };

    const handleSubmit = async (e) => { //Runs when user submits the form // async → allows using await (for API call)
        e.preventDefault(); //Stops default form behavior (page refresh) 

        if (!validateForm()) return; //➡️ Runs your validation function❌ If invalid → stop execution✅ If valid → continue

        setIsLoading(true); //Shows loading spinner / disables button
        try {
            const response = await login(formdata); //Sends email & password to backend
            
            // Check if response is an error object (for backward compatibility)
            if (response?.response) {
                throw response;
            }

            const result = response?.data; //Gets actual data from API response
            if (result?.token) { //If token exists → login successful 
                // Store user data with role information //This is used for Authorization
                setUserSession(result.token, {
                    email: result.user?.email || result.email,
                    role: result.user?.roleType || result.role,
                    userId: result.user?.userId,
                    userName: result.user?.userName,
                    phoneNumber: result.user?.phoneNumber,
                    partyName: result.user?.partyName,
                    active: result.user?.active,
                    subscribed: result.user?.subscribed,
                    twitterAuth: result.user?.twitterAuth,
                    contentGenerated: result.user?.contentGenerated,
                    twitterGenerated: result.user?.twitterGenerated,
                    contentLimit: result.user?.contentLimit,
                    twitterLimit: result.user?.twitterLimit,
                    otpverified: result.user?.otpverified,
                });
                navigate("/"); //Takes user to home/dashboard page
            } else {
                enqueueSnackbar(result?.message || "Invalid login", {
                    variant: "error",
                    autoHideDuration: 1500,
                }); // if login fails Shows error message (toast notification)
            }
        } catch (error) { //Runs if API fails
            console.log("Login error:", error);
            console.log("Error response:", error?.response);
            console.log("Error data:", error?.response?.data);

            const serverMessage = error?.response?.data?.message; //Extracts error message from backend

            // Check if unauthorized access message needs to be shown
            if (serverMessage === "NOT ALLOWED") {
                enqueueSnackbar("Unauthorized access attempted", {
                    variant: "error",
                    autoHideDuration: 2000,
                });
            }
            // Check if the error is 400 with "DEFAULT PASSWORD" message
            else if (
                error?.response?.status === 400 &&
                serverMessage === "DEFAULT PASSWORD"
            ) {
                console.log("DEFAULT PASSWORD detected, showing reset screen");
                setShowPasswordReset(true);
                enqueueSnackbar("Please reset your password using the OTP sent to your email", {
                    variant: "info",
                    autoHideDuration: 3000,
                });
            } else {
                enqueueSnackbar(serverMessage || error?.message || "Login failed", {
                    variant: "error",
                    autoHideDuration: 1500,
                });
            }
        } finally {
            setIsLoading(false);  //Stops loading no matter what happens
        }
    };

    const handleBackToLogin = () => {
        setShowForgotPassword(false); // Hide both extra screens
        setShowPasswordReset(false);

        setFormData({ email: "", password: "" }); //Reset form + clear errors
        setErrors({});
    };

    const handleResetSuccess = () => {  //Runs after password reset is successful
        setShowPasswordReset(false); //Go back to login screen

        setFormData({ email: "", password: "" }); //Reset form + clear errors
        setErrors({});
    };

    const handleOTPSent = (phone) => { //Runs after OTP is sent
        setPhoneNumber(phone); //Store phone number for next step

        setShowForgotPassword(false); //Move from Forgot Password → Reset Password screen
        setShowPasswordReset(true);
    };

    // Show forgot password screen if needed
    if (showForgotPassword) {
        return (
            <ForgotPassword
                onBackToLogin={handleBackToLogin}
                onOTPSent={handleOTPSent}
            />
        );
    }

    // Show password reset screen if needed
    if (showPasswordReset) {
        return (
            <PasswordReset
                email={formdata.email}
                phoneNumber={phoneNumber}
                onBackToLogin={handleBackToLogin}
                onResetSuccess={handleResetSuccess}
            />
        );
    }

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-black">
            {/* Left side (hidden on small screens) */}
            <div
                className="hidden md:flex w-full md:w-1/2 items-center justify-center bg-cover bg-center relative p-6"
                style={{
                    backgroundImage: `url(${leftBg})`,
                }}
            ></div>

            {/* Right side (Login form) */}
            <div className="w-full md:w-1/2 bg-[#111111] flex items-center justify-center px-3 sm:px-4 md:px-6 py-6 sm:py-8 md:py-12">
                <div className="max-w-sm sm:max-w-md w-full space-y-6 sm:space-y-8 bg-[#1a1a1a] md:bg-transparent rounded-xl sm:rounded-2xl md:rounded-none p-4 sm:p-6 md:p-0 shadow-lg md:shadow-none">
                    <div className="text-center">
                        <img
                            src={"logo"}
                            alt="Smartlogix"
                            className="w-10 sm:w-12 md:w-14 mx-auto mb-2 sm:mb-3"
                        />
                        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-white">
                            Smartlogix
                        </h2>
                        <h3 className="text-sm sm:text-base md:text-lg text-white font-medium mt-1 sm:mt-2">
                            Welcome back!
                        </h3>
                        <p className="text-gray-400 text-xs sm:text-sm mt-1 px-1 sm:px-2">
                            Please enter your email and password to access the platform.
                        </p>
                    </div>

                    <form className="space-y-4 sm:space-y-5 md:space-y-6" onSubmit={handleSubmit}>
                        {/* Email */}
                        <div>
                            <label className="block text-xs sm:text-sm text-gray-300 mb-1">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 sm:top-3.5 text-gray-400 h-4 w-4 sm:h-5 sm:w-5" />
                                <input
                                    type="email"
                                    name="email"
                                    value={formdata.email}
                                    onChange={HandleInputChange}
                                    placeholder="Enter your email"
                                    className={`w-full bg-[#1e1e1e] text-white border rounded-lg pl-9 sm:pl-10 pr-3 py-3 sm:py-2.5 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.email ? "border-red-500" : "border-gray-700"
                                        }`}
                                />
                            </div>
                            {errors.email && (
                                <p className="text-red-500 text-xs sm:text-sm mt-1">
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-xs sm:text-sm text-gray-300 mb-1">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 sm:top-3.5 text-gray-400 h-4 w-4 sm:h-5 sm:w-5" />
                                <input
                                    type={showpassword ? "text" : "password"}
                                    name="password"
                                    value={formdata.password}
                                    onChange={HandleInputChange}
                                    placeholder="Enter your password"
                                    autoComplete="new-password"
                                    data-form-type="other"
                                    className={`w-full bg-[#1e1e1e] text-white border rounded-lg pl-9 sm:pl-10 pr-10 py-3 sm:py-2.5 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.password ? "border-red-500" : "border-gray-700"
                                        }`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showpassword)}
                                    className="absolute right-3 top-2.5 sm:top-2.5 text-gray-400 hover:text-white p-1"
                                >
                                    {showpassword ? <EyeOff size={16} className="sm:w-[18px] sm:h-[18px]" /> : <Eye size={16} className="sm:w-[18px] sm:h-[18px]" />}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="text-red-500 text-xs sm:text-sm mt-1">
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        {/* Remember Me and Forgot Password */}
                        <div className="flex items-center justify-between text-gray-400 text-xs sm:text-sm">
                            <label className="flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="h-4 w-4 text-blue-500 border-gray-600 rounded focus:ring-0 mr-2"
                                />
                                Remember Me
                            </label>
                            <button
                                type="button"
                                onClick={() => setShowForgotPassword(true)}
                                className="text-blue-400 hover:text-blue-300 underline"
                            >
                                Forgot Password?
                            </button>
                        </div>

                        {/* Sign In Button */}
                        <button
                            type="submit"
                            disabled={isloading}
                            className={`w-full py-3 sm:py-2.5 rounded-lg text-white text-sm sm:text-base font-medium transition-all duration-200 touch-manipulation ${isloading
                                    ? "bg-gray-500 cursor-not-allowed"
                                    : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800"
                                }`}
                        >
                            {isloading ? "Signing In..." : "Sign In"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );

}