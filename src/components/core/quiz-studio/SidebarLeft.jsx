import React from "react";
import QuizTreeItem from "./QuizTreeItem";

export default function SidebarLeft({ quizzes, onSelect }) {
  return (
    <div className="w-64 bg-gray-950 border-r border-gray-800 overflow-y-auto">
      <div className="p-3 font-bold text-gray-400 text-sm">My Quizzes</div>
      {quizzes.map((quiz) => (
        <QuizTreeItem key={quiz.id} quiz={quiz} onSelect={onSelect} />
      ))}
    </div>
  );
}
