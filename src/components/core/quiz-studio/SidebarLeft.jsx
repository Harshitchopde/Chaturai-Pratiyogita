import React from "react";
import QuizTreeItem from "./QuizTreeItem";

export default function SidebarLeft({ quizzes, onSelect, onCreate }) {
  return (
    <div className="w-64 bg-gray-950 border-r border-gray-800 flex flex-col">
      <div className="px-4 py-3 border-b border-gray-800 text-lg font-semibold text-gray-200">
        My Quizzes
      </div>

      <div className="p-3">
        <button onClick={onCreate} className="w-full py-2 bg-indigo-600 rounded hover:bg-indigo-500">
          + Create Quiz
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {quizzes.length === 0 ? (
          <p className="text-gray-500 px-4">No quizzes yet</p>
        ) : (
          quizzes.map((quiz) => <QuizTreeItem key={quiz.id} quiz={quiz} onSelect={onSelect} />)
        )}
      </div>
    </div>
  );
}
