import React, { useState } from "react";

const seed = [
  {
    id: "qb-1",
    questionDesc: "What is React?",
    options: [{ text: "Library" }, { text: "Framework" }, { text: "Language" }, { text: "OS" }],
    correctAnswer: 0,
  },
  {
    id: "qb-2",
    questionDesc: "JSX stands for?",
    options: [{ text: "JSON XML" }, { text: "JavaScript XML" }, { text: "Java Syntax eXtended" }, { text: "None" }],
    correctAnswer: 1,
  },
  {
    id: "qb-12",
    questionDesc: "What is React?",
    options: [{ text: "Library" }, { text: "Framework" }, { text: "Language" }, { text: "OS" }],
    correctAnswer: 0,
  },
  {
    id: "qb-22",
    questionDesc: "JSX stands for?",
    options: [{ text: "JSON XML" }, { text: "JavaScript XML" }, { text: "Java Syntax eXtended" }, { text: "None" }],
    correctAnswer: 1,
  },
  {
    id: "qb-13",
    questionDesc: "What is React?",
    options: [{ text: "Library" }, { text: "Framework" }, { text: "Language" }, { text: "OS" }],
    correctAnswer: 0,
  },
  {
    id: "qb-23",
    questionDesc: "JSX stands for?",
    options: [{ text: "JSON XML" }, { text: "JavaScript XML" }, { text: "Java Syntax eXtended" }, { text: "None" }],
    correctAnswer: 1,
  },
  {
    id: "qb-14",
    questionDesc: "What is React?",
    options: [{ text: "Library" }, { text: "Framework" }, { text: "Language" }, { text: "OS" }],
    correctAnswer: 0,
  },
  {
    id: "qb-24",
    questionDesc: "JSX stands for?",
    options: [{ text: "JSON XML" }, { text: "JavaScript XML" }, { text: "Java Syntax eXtended" }, { text: "None" }],
    correctAnswer: 1,
  },
  {
    id: "qb-15",
    questionDesc: "What is React?",
    options: [{ text: "Library" }, { text: "Framework" }, { text: "Language" }, { text: "OS" }],
    correctAnswer: 0,
  },
  {
    id: "qb-25",
    questionDesc: "JSX stands for?",
    options: [{ text: "JSON XML" }, { text: "JavaScript XML" }, { text: "Java Syntax eXtended" }, { text: "None" }],
    correctAnswer: 1,
  },
  {
    id: "qb-16",
    questionDesc: "What is React?",
    options: [{ text: "Library" }, { text: "Framework" }, { text: "Language" }, { text: "OS" }],
    correctAnswer: 0,
  },
  {
    id: "qb-26",
    questionDesc: "JSX stands for?",
    options: [{ text: "JSON XML" }, { text: "JavaScript XML" }, { text: "Java Syntax eXtended" }, { text: "None" }],
    correctAnswer: 1,
  },
];

export default function QuestionBank({ onAddToQuiz }) {
  const [selected, setSelected] = useState({});

  const selectedQuestions = seed.filter((q) => selected[q.id]);
  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Question Bank</h2>
        <button
          disabled={selectedQuestions.length === 0}
          onClick={() => onAddToQuiz(selectedQuestions)}
          className="px-3 py-1 bg-indigo-600 rounded disabled:opacity-50"
        >
          Add {selectedQuestions.length || ""} to Current Quiz
        </button>
      </div>

      <div className="space-y-2 max-h-[75vh] overflow-y-auto pr-2">
        {seed.map((q) => (
          <label key={q.id} className="flex items-start gap-3 bg-gray-900 p-3 rounded border border-gray-800">
            <input
              type="checkbox"
              checked={!!selected[q.id]}
              onChange={(e) => setSelected((s) => ({ ...s, [q.id]: e.target.checked }))}
            />
            <div>
              <div className="font-medium">{q.questionDesc}</div>
              <div className="text-sm text-gray-400">
                Options: {q.options.map((o) => o.text).join(", ")}
              </div>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}
