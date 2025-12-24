import React, { useState } from "react";
import PropTypes from "prop-types";
import { MdAdd, MdClose } from "react-icons/md";

const TagInput = ({ tags, setTags }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => setInputValue(e.target.value);

  const addNewTag = () => {
    const newTag = inputValue.trim();
    if (newTag !== "" && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setInputValue("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") addNewTag();
  };

  const handleRemoveTag = (tagToRemove) =>
    setTags(tags.filter((tag) => tag !== tagToRemove));

  return (
    <div>
      {/* Display tags */}
      {tags?.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {tags.map((tag) => (
            <span
              key={tag} // ✅ Use tag value as key instead of index
              className="flex items-center gap-1 text-sm font-medium text-white bg-blue-500 px-3 py-1 rounded-full shadow"
            >
              #{tag}
              <button
                type="button"
                onClick={() => handleRemoveTag(tag)}
                className="ml-1 flex items-center justify-center w-4 h-4 text-white hover:bg-blue-700 rounded-full"
              >
                <MdClose className="text-[12px]" />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Input & Add button */}
      <div className="flex items-center gap-3 mt-3">
        <input
          value={inputValue}
          type="text"
          className="flex-1 text-sm bg-gray-50 border border-gray-300 px-3 py-2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition cursor-pointer"
          placeholder="Add tags"
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <button
          type="button"
          onClick={addNewTag}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg transition transform hover:scale-110"
        >
          <MdAdd className="text-xl" />
        </button>
      </div>
    </div>
  );
};

/* ================= PROPS VALIDATION ================= */

TagInput.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  setTags: PropTypes.func.isRequired,
};

export default TagInput;
