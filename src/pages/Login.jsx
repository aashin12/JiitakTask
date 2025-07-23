import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

 
  useEffect(() => {
    if (email === '') {
      setEmailError('');
    } else if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }
  }, [email]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Please fill in all the fields', {
        position: 'bottom-center',
      });
      return;
    }

    if (emailError) {
      return;
    }

    setIsSubmitting(true);

    try {
      const storedPassword = sessionStorage.getItem('password');

      await new Promise((res) => setTimeout(res, 1500));

      if (password !== storedPassword) {
        toast.error(
          'Your account is currently inaccessible. Please contact your administrator to log in',
          {
            position: 'bottom-center',
            autoClose: 3000,
          }
        );
      } else {
        sessionStorage.setItem('email', email);
        toast.success('Login successful!', {
          position: 'bottom-center',
          autoClose: 1500,
        });

        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
      }
    } catch (err) {
      toast.error('Something went wrong', {
        position: 'bottom-center',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f9f6f0] flex flex-col">
      {/* Header */}
      <header className="shadow-md flex items-center px-6 py-4">
        <img src="/lookmeallogo.png" alt="Logo" className="w-8 h-8 mr-2" />
        <h1 className="text-[#FF9800] font-bold text-xl">ルックミール</h1>
      </header>

      {/* Form */}
      <div className="flex justify-center flex-grow mt-20">
        <form
          onSubmit={handleSubmit}
          className="bg-[#f9f6f0] w-full max-w-sm space-y-4 "
        >
          <h1 className="text-center text-2xl font-semibold text-gray-800 mb-2">
            Login
          </h1>

          {/* Email */}
          <div className="flex flex-col">
            <label className="text-sm mb-1 text-gray-700">Email Address</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`bg-white p-2 rounded border focus:outline-none ${
                emailError
                  ? 'border-red-500 focus:ring-2 focus:ring-red-400'
                  : 'border-orange-300 focus:ring-2 focus:ring-orange-400'
              }`}
            />
            {emailError && (
              <span className="text-xs text-red-500 mt-1">{emailError}</span>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label className="text-sm mb-1 text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-2 bg-white rounded border border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 font-medium text-sm transition flex items-center justify-center rounded-full"
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
              'Login'
            )}
          </button>

         <Link to={'/forgot-password'}>
              <p className="text-center text-gray-600 mt-3">
                Forgot your password?
              </p>
         </Link>
        </form>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Login;
