import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PasswordresetForm = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [matchError, setMatchError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const validatePassword = (pw) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,20}$/;
    return regex.test(pw);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isPasswordValid = validatePassword(password);
    const doPasswordsMatch = password === confirmPassword;

    if (!isPasswordValid || !doPasswordsMatch) return;

    setIsSubmitting(true);

    // Simulate delay
    await new Promise((res) => setTimeout(res, 1500));

    sessionStorage.setItem("password", password);
    setIsSubmitting(false);
    navigate("/login");
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    if (value && !validatePassword(value)) {
      setPasswordError(
        "Password should have 8 to 20 characters including uppercase and lowercase letters and numbers"
      );
    } else {
      setPasswordError("");
    }

    if (confirmPassword && value !== confirmPassword) {
      setMatchError("Passwords do not match");
    } else {
      setMatchError("");
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);

    if (password && value !== password) {
      setMatchError("Passwords do not match");
    } else {
      setMatchError("");
    }
  };

  return (
    <div className="min-h-screen bg-[#faf7f2]">
      <header className="shadow-md py-4 px-6 flex items-center">
        <img src="/lookmeallogo.png" alt="Logo" className="h-8 w-8 mr-2 rounded" />
        <h1 className="text-xl font-bold text-[#FF9800]">ルックミール</h1>
      </header>

      <div className="min-h-screen flex flex-col items-center mt-16">
        <h2 className="text-2xl font-semibold mb-4">Password reset</h2>

        <form onSubmit={handleSubmit} className="w-full max-w-md px-4">
          {/* Password */}
          <div className="mb-3 relative">
            <label className="block text-sm text-gray-700 mb-1">New Password</label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handlePasswordChange}
              className={`w-full border px-3 py-2 pr-20 rounded bg-white focus:outline-none ${
                passwordError
                  ? "border-red-500 focus:ring-2 focus:ring-red-400"
                  : "border-orange-300 focus:ring-2 focus:ring-orange-400"
              }`}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-9 text-sm text-orange-600 cursor-pointer"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
            {passwordError && (
              <p className="text-red-500 text-sm mt-1">{passwordError}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="mb-4 relative">
            <label className="block text-sm text-gray-700 mb-1">To confirm new password</label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              className={`w-full border px-3 py-2 pr-20 rounded bg-white focus:outline-none ${
                matchError
                  ? "border-red-500 focus:ring-2 focus:ring-red-400"
                  : "border-orange-300 focus:ring-2 focus:ring-orange-400"
              }`}
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-9 text-sm text-orange-600 cursor-pointer"
            >
              {showConfirmPassword ? "Hide" : "Show"}
            </button>
            {matchError && (
              <p className="text-red-500 text-sm mt-1">{matchError}</p>
            )}
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-orange-500 text-white py-2 hover:bg-orange-600 rounded-full flex items-center justify-center"
          >
            {isSubmitting ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                />
              </svg>
            ) : (
              "Settings"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PasswordresetForm;
