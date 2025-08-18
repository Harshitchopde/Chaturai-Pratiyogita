import React, { useState } from "react";

export default function AIGenerator({ setQuestions, quizData }) {
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    setLoading(true);
    // Simulated API call
    setTimeout(() => {
      setQuestions([
        { text: "AI Generated Q1", options: [] },
        { text: "AI Generated Q2", options: [] }
      ]);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="space-y-4">
      <button
        onClick={generate}
        disabled={loading}
        className="px-4 py-2 bg-indigo-500 rounded hover:bg-indigo-600 disabled:opacity-50"
      >
        {loading ? "Generating..." : "Generate with AI"}
      </button>
    </div>
  );
}
