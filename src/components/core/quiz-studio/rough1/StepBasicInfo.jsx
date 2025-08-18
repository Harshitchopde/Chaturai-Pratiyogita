import React from "react";

export default function StepBasicInfo({ quizData, setQuizData }) {
  const updateField = (field, value) => setQuizData({ ...quizData, [field]: value });

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm text-gray-300">Quiz Name</label>
        <input
          type="text"
          value={quizData.quizName}
          onChange={(e) => updateField("quizName", e.target.value)}
          className="w-full p-2 mt-1 bg-gray-800 rounded border border-gray-700"
        />
      </div>

      <div>
        <label className="block text-sm text-gray-300">Description</label>
        <textarea
          value={quizData.quizDesc}
          onChange={(e) => updateField("quizDesc", e.target.value)}
          className="w-full p-2 mt-1 bg-gray-800 rounded border border-gray-700"
        />
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block text-sm text-gray-300">Quiz Type</label>
          <select
            value={quizData.quizType}
            onChange={(e) => updateField("quizType", e.target.value)}
            className="w-full p-2 mt-1 bg-gray-800 rounded border border-gray-700"
          >
            <option value="Simple">Simple</option>
            <option value="Super">Super</option>
          </select>
        </div>

        <div className="flex-1">
          <label className="block text-sm text-gray-300">Difficulty</label>
          <select
            value={quizData.difficulty}
            onChange={(e) => updateField("difficulty", e.target.value)}
            className="w-full p-2 mt-1 bg-gray-800 rounded border border-gray-700"
          >
            <option value="Any">Any</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm text-gray-300">Time Duration (minutes)</label>
        <input
          type="number"
          min="1"
          value={quizData.timeDuration}
          onChange={(e) => updateField("timeDuration", parseInt(e.target.value))}
          className="w-full p-2 mt-1 bg-gray-800 rounded border border-gray-700"
        />
      </div>
    </div>
  );
}
