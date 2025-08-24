import React from "react";

const templates = [
  {
    id: "tpl-10-easy",
    name: "10 Q • Easy • 15 min",
    meta: { difficulty: "easy", timeDuration: 15 },
    seedQuestions: [],
  },
  {
    id: "tpl-20-mixed",
    name: "20 Q • Mixed • 30 min",
    meta: { difficulty: "medium", timeDuration: 30 },
    seedQuestions: [],
  },
];

export default function QuizTemplates({ onApplyTemplate }) {
  return (
    <div className="p-4 space-y-4">
      <h2 className="text-lg font-semibold">Quiz Templates</h2>
      <div className="grid sm:grid-cols-2 gap-3">
        {templates.map((t) => (
          <div key={t.id} className="bg-gray-900 border border-gray-800 rounded p-3">
            <div className="font-medium">{t.name}</div>
            <div className="text-xs text-gray-400">
              Diff: {t.meta.difficulty} • Time: {t.meta.timeDuration}m
            </div>
            <button
              onClick={() => onApplyTemplate(t)}
              className="mt-2 px-3 py-1 bg-indigo-600 rounded"
            >
              Apply
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
