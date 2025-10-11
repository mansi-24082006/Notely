import React, { useState } from 'react';
import ProfileInfo from '../Cards/ProfileInfo.jsx';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar.jsx';

const Navbar = ({ userInfo, onSearchNote, handleClearSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleSearch = () => {
    const query = searchQuery.trim();
    if (query.length > 0) {
      onSearchNote(query);
    }
  };

  const onClearSearch = () => {
    setSearchQuery("");
    handleClearSearch();
  };

  return (
    <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 
                    flex items-center justify-between px-6 py-3 shadow-lg rounded-b-xl 
                    backdrop-blur-sm">
      {/* Left Title */}
      <h2 className="text-2xl font-semibold text-white tracking-wide">
        ✨ Notely
      </h2>

      {/* Search Bar */}
      <div className="flex-1 max-w-md mx-6">
        <SearchBar
          value={searchQuery}
          onChange={({ target }) => setSearchQuery(target.value)}
          handleSearch={handleSearch}
          onClearSearch={onClearSearch}
        />
      </div>

      {/* Profile Section */}
      <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
    </div>
  );
};

export default Navbar;
