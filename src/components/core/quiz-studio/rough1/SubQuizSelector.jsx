import React from "react";

export default function SubQuizSelector({ subQuizzes, setSubQuizzes }) {
  return (
    <div className="bg-gray-800 p-4 rounded">
      <p className="text-gray-300">Super Quiz mode: select existing quizzes.</p>
      {/* You would integrate API search here */}
      <button
        onClick={() => setSubQuizzes([...subQuizzes, { id: Date.now(), name: "Sample Quiz" }])}
        className="mt-3 px-3 py-2 bg-indigo-500 rounded hover:bg-indigo-600"
      >
        Add Sub-Quiz
      </button>
    </div>
  );
}
