import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PasswordReset = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const isPasswordValid = /^(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,20}$/.test(password);

  const doPasswordsMatch = password === confirmPassword;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword || !isPasswordValid || !doPasswordsMatch) {
      toast.error("Make sure password is valid and both fields match", {
        position: "bottom-center",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise((res) => setTimeout(res, 1500));
      sessionStorage.setItem("password", password);
      navigate("/login");
    } catch (err) {
      toast.error("Something went wrong", {
        position: "bottom-center",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf7f2]">
      <header className="shadow-md py-4 px-6 flex items-center">
        <img src="/lookmeallogo.png" alt="Logo" className="h-8 w-8 mr-2 rounded" />
        <h1 className="text-xl font-bold text-[#FF9800]">ルックミール</h1>
      </header>

      <div className="flex items-center justify-center mt-10 px-4">
        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Password Settings</h2>
            <p className="text-sm text-gray-600">
              After entering your password, please press the "Settings" button to start using the service
            </p>
          </div>

          {/* Password Field */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full bg-white rounded-md py-2 px-3 pr-16 text-sm border ${
                  password && !isPasswordValid ? 'border-red-500' : 'border-orange-300'
                } focus:outline-none focus:ring-2 focus:ring-orange-500`}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            <p className={`text-xs mt-1 ${
              password && !isPasswordValid ? 'text-red-600' : 'text-gray-500'
            }`}>
              (Password should have 8 to 20 characters including uppercase and lowercase letters and numbers)
            </p>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`w-full bg-white rounded-md py-2 px-3 pr-16 text-sm border ${
                  confirmPassword && !doPasswordsMatch ? 'border-red-500' : 'border-orange-300'
                } focus:outline-none focus:ring-2 focus:ring-orange-500`}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {confirmPassword && !doPasswordsMatch && (
              <p className="text-xs text-red-600 mt-1">Passwords don't match</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 font-medium text-sm transition flex items-center justify-center rounded-full"
          >
            {isSubmitting ? (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
            ) : (
              "Settings"
            )}
          </button>
        </form>
      </div>

      <ToastContainer />
    </div>
  );
};

export default PasswordReset;
