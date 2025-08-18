import React, { useState } from "react";

export default function QuestionEditor({ questions, setQuestions }) {
  const [newQ, setNewQ] = useState({ text: "", options: [] });

  const addQuestion = () => {
    if (!newQ.text.trim()) return;
    setQuestions([...questions, { ...newQ, id: Date.now() }]);
    setNewQ({ text: "", options: [] });
  };

  return (
    <div className="space-y-4">
      {questions.map((q, i) => (
        <div key={i} className="bg-gray-800 p-3 rounded">
          <p className="text-gray-200 font-medium">{q.text}</p>
        </div>
      ))}

      <div className="bg-gray-800 p-4 rounded space-y-2">
        <input
          type="text"
          placeholder="Enter question text"
          value={newQ.text}
          onChange={(e) => setNewQ({ ...newQ, text: e.target.value })}
          className="w-full p-2 bg-gray-900 rounded border border-gray-700 text-white"
        />
        <button
          onClick={addQuestion}
          className="px-3 py-2 bg-indigo-500 rounded hover:bg-indigo-600"
        >
          Add Question
        </button>
      </div>
    </div>
  );
}
