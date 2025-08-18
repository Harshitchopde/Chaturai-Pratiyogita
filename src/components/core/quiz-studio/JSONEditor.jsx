import React, { useState } from "react";

export default function JSONEditor({ quiz, setQuiz }) {
  const [raw, setRaw] = useState(JSON.stringify(quiz, null, 2));

  const handleSave = () => {
    try {
      const parsed = JSON.parse(raw);
      setQuiz(parsed);
    } catch {
      alert("Invalid JSON format");
    }
  };

  return (
    <div className="flex flex-col h-full">
      <textarea
        className="flex-1 bg-gray-900 text-gray-200 p-3 rounded font-mono text-sm"
        value={raw}
        onChange={(e) => setRaw(e.target.value)}
      />
      <button
        onClick={handleSave}
        className="mt-2 px-3 py-2 bg-indigo-600 rounded hover:bg-indigo-500"
      >
        Save Changes
      </button>
    </div>
  );
}
