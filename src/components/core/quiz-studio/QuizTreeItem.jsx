import React, { useState } from "react";

export default function QuizTreeItem({ quiz, onSelect }) {
  const [hover, setHover] = useState(false);

  return (
    <div
      className="px-3 py-2 flex justify-between items-center hover:bg-gray-800 cursor-pointer"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div onClick={() => onSelect(quiz)} className="flex flex-col">
        <span className="text-gray-200">{quiz.name}</span>
        <span className="text-xs text-gray-500">
          {quiz.type} • {quiz.status}
        </span>
      </div>
      {hover && (
        <button
          onClick={() => onSelect(quiz)}
          className="px-2 py-1 text-xs bg-indigo-600 rounded hover:bg-indigo-500"
        >
          Load
        </button>
      )}
    </div>
  );
}
