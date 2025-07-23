import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";

export default function SplashScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/passwordset");
    }, 5000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-[#fcf8f4]">
      <img
        src="/lookmeallogo.png"
        alt="Look Meal Logo"
        className="w-20 h-20 mb-4 "
      />
      <h1 className="text-orange-500 text-2xl font-bold tracking-widest drop-shadow-[0_0_8px_#FFA500]">
        ルックミール
      </h1>

      {/* Spinner */}
      <FaSpinner className="text-orange-500 text-3xl mt-6 animate-spin drop-shadow-[0_0_8px_#FFA500]" />
    </div>
  );
}
