import React, { useState } from "react";
import TagInput from "../../components/Input/TagInput";
import { MdClose } from "react-icons/md";
import axiosInstance from "../../utils/axiosInstance";

const AddEditNotes = ({
  noteData,
  type,
  getAllNotes,
  onClose,
  showToastMessage,
}) => {
  const [title, setTitle] = useState(noteData?.title || "");
  const [content, setContent] = useState(noteData?.content || "");
  const [tags, setTags] = useState(noteData?.tags || []);
  const [error, setError] = useState("");

  // Add New Note
  const addNewNote = async () => {
    try {
      const response = await axiosInstance.post("/add-note", {
        title,
        content,
        tags,
      });
      if (response.data && response.data.note) {
        showToastMessage("Note Added Successfully", "add");
        getAllNotes();
        onClose();
      }
    } catch (err) {
      console.error("Add Note Error:", err);
      setError(
        err?.response?.data?.message || "Something went wrong. Try again!"
      );
    }
  };

  // Edit Existing Note
  const editNote = async () => {
    if (!noteData?._id) return setError("Invalid note data.");
    try {
      const response = await axiosInstance.put(`/edit-note/${noteData._id}`, {
        title,
        content,
        tags,
      });
      if (response.data && response.data.note) {
        showToastMessage("Note Updated Successfully", "update");
        getAllNotes();
        onClose();
      }
    } catch (err) {
      console.error("Edit Note Error:", err);
      setError(
        err?.response?.data?.message || "Something went wrong. Try again!"
      );
    }
  };

  // Handle Add/Update Button
  const handleAddOrUpdate = () => {
    if (!title.trim()) return setError("Please enter the title");
    if (!content.trim()) return setError("Please enter the content");
    setError("");

    if (type === "edit") {
      editNote();
    } else {
      addNewNote();
    }
  };

  return (
    <div
      className="relative max-w-lg mx-auto p-6 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 
                    rounded-2xl shadow-2xl border border-white/40 backdrop-blur-sm"
    >
      {/* Close Button */}
      <button
        type="button"
        className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-5 -right-5 
                   bg-white shadow-md hover:bg-pink-100 transition duration-200"
        onClick={onClose}
      >
        <MdClose className="text-xl text-gray-600" />
      </button>

      {/* Title Input */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-gray-700">TITLE</label>
        <input
          type="text"
          placeholder="Note something that made you smile"
          className="text-xl text-gray-900 outline-none border-b-2 border-transparent 
                     focus:border-blue-500 bg-transparent transition-colors duration-300 
                     placeholder-gray-400 py-1"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      {/* Content Textarea */}
      <div className="flex flex-col gap-2 mt-5">
        <label className="text-sm font-semibold text-gray-700">CONTENT</label>
        <textarea
          placeholder="📝 Write your thoughts, goals, or daily notes here..."
          rows={8}
          className="text-sm text-gray-900 outline-none bg-white/70 p-3 rounded-lg 
                     border border-transparent focus:border-purple-500 
                     transition-all duration-300 placeholder-gray-400 resize-none shadow-inner"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      {/* Tags Input */}
      <div className="flex flex-col gap-2 mt-5">
        <label className="text-sm font-semibold text-gray-700">TAGS</label>
        <TagInput tags={tags} setTags={setTags} />
      </div>

      {/* Error Message */}
      {error && (
        <p className="text-red-500 text-xs font-medium pt-3 bg-red-50 px-3 py-2 rounded-md mt-3">
          ⚠️ {error}
        </p>
      )}

      {/* Add/Update Button */}
      <button
        type="button"
        className={`mt-6 w-full text-white font-semibold py-3 px-4 rounded-lg shadow-md 
              transition-all duration-300 bg-gradient-to-r 
              ${
                type === "edit"
                  ? "from-indigo-500 via-purple-500 to-pink-500"
                  : "from-indigo-500 via-purple-500 to-pink-500"
              }`}
        onClick={handleAddOrUpdate}
      >
        {type === "edit" ? "UPDATE NOTE ✏️" : "ADD NOTE 💫"}
      </button>
    </div>
  );
};

export default AddEditNotes;
