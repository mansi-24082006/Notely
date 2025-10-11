import React from "react";
import { MdOutlinePushPin, MdCreate, MdDelete } from "react-icons/md";
import moment from "moment"; // ✅ Import moment

const NoteCard = ({
  title,
  date,
  content,
  tags = [],
  isPinned,
  onEdit,
  onDelete,
  onPinNote,
}) => {
  return (
    <div className="border rounded p-4 bg-white hover:shadow-xl transition-all ease-in-out">
      {/* Header: Title + Date + Pin */}
      <div className="flex items-center justify-between">
        <div>
          <h6 className="text-sm font-medium">{title}</h6>
          <span className="text-xs text-slate-500">
            {moment(date).format("DD MMM YYYY")}
          </span>
        </div>
        <MdOutlinePushPin
          className={`text-xl cursor-pointer ${
            isPinned ? "text-blue-400" : "text-slate-300"
          } hover:text-pink-800 transition-colors duration-200`}
          onClick={onPinNote}
        />
      </div>

      {/* Content */}
      <p className="my-2 text-sm">{content?.slice(0, 60)}</p>

      {/* Tags and Actions */}
      <div className="flex items-center justify-between mt-2">
        {/* Tags */}
        <div className="text-xs text-slate-500">
          {tags.map((item) => `#${item} `)}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <MdCreate
            className="icon-btn cursor-pointer hover:text-green-600"
            onClick={onEdit}
          />
          <MdDelete
            className="icon-btn cursor-pointer hover:text-red-500"
            onClick={onDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
