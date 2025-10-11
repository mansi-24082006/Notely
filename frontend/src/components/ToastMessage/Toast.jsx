import React, { useEffect } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { LuCheck } from "react-icons/lu";

const Toast = ({ isShown, message, type, onClose }) => {
  useEffect(() => {
    if (!isShown) return;
    const timeoutId = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, [isShown, onClose]);

  return (
    <div
      className={`fixed top-20 right-6 z-50 transition-all duration-500 ${
        isShown
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-[-10px] pointer-events-none"
      }`}
    >
      <div
        className={`relative min-w-52 bg-white border shadow-2xl rounded-md overflow-hidden`}
      >
        {/* Color Bar */}
        <div
          className={`absolute left-0 top-0 w-[5px] h-full ${
            type === "delete" ? "bg-red-500" : "bg-green-500"
          }`}
        ></div>

        {/* Toast Content */}
        <div className="flex items-center gap-3 py-2 px-4 pl-6">
          <div
            className={`w-10 h-10 flex items-center justify-center rounded-full ${
              type === "delete" ? "bg-red-50" : "bg-green-50"
            }`}
          >
            {type === "delete" ? (
              <MdDeleteOutline className="text-xl text-red-500" />
            ) : (
              <LuCheck className="text-xl text-green-500" />
            )}
          </div>
          <p className="text-sm text-slate-800">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default Toast;
