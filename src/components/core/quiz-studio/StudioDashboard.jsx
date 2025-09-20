import React from "react";

export default function StudioDashboard({ quizzes, onCreate }) {
  return (
    <div className="p-6 space-y-6">
      <h2 className="text-xl font-semibold">Studio Dashboard</h2>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
          <div className="text-3xl">{quizzes.length}</div>
          <div className="text-gray-400 text-sm">Total Quizzes</div>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
          <div className="text-3xl">{quizzes.filter((q) => q.status === "Published").length}</div>
          <div className="text-gray-400 text-sm">Published</div>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
          <div className="text-3xl">{quizzes.filter((q) => q.status === "Draft").length}</div>
          <div className="text-gray-400 text-sm">Drafts</div>
        </div>
      </div>

      <button onClick={onCreate} className="px-4 py-2 bg-indigo-600 rounded">
        + Create New Quiz
      </button>
    </div>
  );
}
