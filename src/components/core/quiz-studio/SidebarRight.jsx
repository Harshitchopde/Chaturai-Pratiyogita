import React from "react";

export default function SidebarRight({ selectedQuiz, setQuizzes, quizzes }) {
  const createQuiz = () => {
    const newQuiz = { id: Date.now(), name: "New Quiz", type: "Simple", status: "Draft" };
    setQuizzes([...quizzes, newQuiz]);
  };

  const deleteQuiz = () => {
    if (!selectedQuiz) return;
    setQuizzes(quizzes.filter((q) => q.id !== selectedQuiz.id));
  };

  return (
    <div className="w-64 bg-gray-950 border-l border-gray-800 p-3 space-y-4">
      <button
        onClick={createQuiz}
        className="w-full py-2 bg-green-600 rounded hover:bg-green-500"
      >
        Create Quiz
      </button>
      <button
        onClick={deleteQuiz}
        disabled={!selectedQuiz}
        className="w-full py-2 bg-red-600 rounded hover:bg-red-500 disabled:opacity-50"
      >
        Delete Quiz
      </button>
    </div>
  );
}
