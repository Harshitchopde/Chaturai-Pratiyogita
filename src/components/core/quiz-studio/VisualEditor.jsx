import React from "react";

export default function VisualEditor({ quiz, setQuiz }) {
  const updateField = (field, value) => setQuiz({ ...quiz, [field]: value });

  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm text-gray-400">Quiz Name</label>
        <input
          className="w-full p-2 mt-1 bg-gray-800 border border-gray-700 rounded"
          value={quiz.name}
          onChange={(e) => updateField("name", e.target.value)}
        />
      </div>

      <div>
        <label className="text-sm text-gray-400">Status</label>
        <select
          className="w-full p-2 mt-1 bg-gray-800 border border-gray-700 rounded"
          value={quiz.status}
          onChange={(e) => updateField("status", e.target.value)}
        >
          <option value="Draft">Draft</option>
          <option value="Published">Published</option>
        </select>
      </div>
    </div>
  );
}
