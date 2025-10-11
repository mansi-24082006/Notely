import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const PasswordInput = ({ value, onChange, placeholder = "Password" }) => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const toggleShowPassword = () => setIsShowPassword((prev) => !prev);

  return (
    <div className="flex items-center w-full border border-gray-300 rounded-lg bg-white px-3 py-2 mb-3 shadow-sm focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-400 transition">
      <input
        value={value}
        onChange={onChange}
        type={isShowPassword ? "text" : "password"}
        placeholder={placeholder}
        className="w-full text-sm bg-transparent outline-none placeholder-gray-400"
      />
      <button
        type="button"
        aria-label={isShowPassword ? "Hide password" : "Show password"}
        onClick={toggleShowPassword}
        className="ml-2 text-gray-400 hover:text-gray-700 transition-colors duration-200"
      >
        {isShowPassword ? <FaRegEye size={20} /> : <FaRegEyeSlash size={20} />}
      </button>
    </div>
  );
};

export default PasswordInput;
