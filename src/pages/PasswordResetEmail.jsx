// PasswordResetEmail.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PasswordResetEmail = () => {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        

        if (email) {
            sessionStorage.setItem("email", email);
            navigate("/reset-password"); // redirect to next page
        } else {
            toast.error("Failed to set password reset url. Please try again");
        }
    };

    return (
        <div className="min-h-screen bg-[#faf7f2]  ">
            <header className="shadow-md py-4 px-6 flex items-center">
                <img src="/lookmeallogo.png" alt="Logo" className="h-8 w-8 mr-2 rounded" />
                <h1 className="text-xl font-bold text-[#FF9800]">ルックミール</h1>
            </header>
            <div className="flex items-center justify-center mt-8 px-4">

                <div className="flex flex-col items-center justify-center mt-10">
                    <h2 className="text-2xl font-semibold mb-2">Password reset</h2>
                    <p className="mb-4 text-gray-600 text-sm text-center">
                        Please enter the email address you are currently using. <br />
                        we will send you a URL for resetting your password by email
                    </p>
                    <form onSubmit={handleSubmit} className="w-full max-w-md px-4 mt-2">
                        <label className="block text-sm text-gray-700 mb-1">email address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border px-3 py-2 rounded mb-4 bg-white"
                            required
                        />
                        <button
                            type="submit"
                            className="w-full bg-orange-500 text-white py-2 rounded-full hover:bg-orange-600"
                        >
                            send a URL for resetting your password
                        </button>

                        <Link to={'/login'}> <div className="text-center mt-3  text-gray-600">Return to login screen</div></Link>
                    </form>
                </div>
            </div>
            <ToastContainer position="bottom-center"/>
        </div>
    );
};

export default PasswordResetEmail;
