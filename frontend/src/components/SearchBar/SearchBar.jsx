import React from 'react';
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

const SearchBar = ({ value, onChange, handleSearch, onClearSearch }) => {

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="w-full max-w-md flex items-center bg-white border border-gray-300 rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-blue-500 px-3 py-2 transition-all duration-200">
      
      {/* Input */}
      <input
        type="text"
        placeholder="Search Notes..."
        className="flex-1 text-sm text-gray-700 placeholder-gray-400 outline-none"
        value={value || ""} // always controlled
        onChange={onChange}
        onKeyDown={handleKeyPress} // search on Enter
      />

      {/* Clear button */}
      {value && value.length > 0 && (
        <IoMdClose
          className="text-gray-400 hover:text-gray-700 cursor-pointer transition-colors duration-150 mr-2"
          onClick={onClearSearch}
        />
      )}

      {/* Search button */}
      <FaMagnifyingGlass
        className="text-gray-400 hover:text-gray-700 cursor-pointer transition-colors duration-150"
        onClick={handleSearch}
      />
    </div>
  );
};

export default SearchBar;
