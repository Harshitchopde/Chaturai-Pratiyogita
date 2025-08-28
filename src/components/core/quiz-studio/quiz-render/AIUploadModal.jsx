import React, { useRef, useState } from "react";

export default function AIUploadModal({ showAIUpload,onClose, onImport }) {
  // const [tab, setTab] = useState("ai"); // ai | upload
  const [tab, setTab] = useState(showAIUpload); // ai | upload
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const fileRef = useRef(null);
  console.log("VLA: ",showAIUpload)
  // normalize to our internal structure (same as CreateQuizWizard.appendQuestions expects)
  const fakeAIGenerator = async (p) => {
    // replace with real API call; return [{questionDesc, explanation, options:[{text,isCorrect?}], correctAnswer}]
    await new Promise((r) => setTimeout(r, 600));
    const base = (i) => ({
      questionDesc: `Q${i + 1}: ${p || "Generated question"}?`,
      explanation: "Auto-generated",
      options: [{ text: "A" }, { text: "B" }, { text: "C" }, { text: "D" }],
      correctAnswer: 0,
      points: 1,
    });
    return [base(0), base(1), base(2)];
  };

  const fakeUploadParser = async (file) => {
    // replace with your server-side parsing; CSV/Doc/PDF -> questions[]
    await new Promise((r) => setTimeout(r, 600));
    return [
      {
        questionDesc: `Parsed from ${file.name}`,
        explanation: "",
        options: [{ text: "Opt1" }, { text: "Opt2" }, { text: "Opt3" }, { text: "Opt4" }],
        correctAnswer: 1,
        points: 1,
      },
    ];
  };

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const qs = await fakeAIGenerator(prompt);
      onImport(qs);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async () => {
    const f = fileRef.current?.files?.[0];
    if (!f) return;
    setLoading(true);
    try {
      const qs = await fakeUploadParser(f);
      onImport(qs);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 grid place-items-center">
      <div className="w-[95%] max-w-2xl rounded-xl border border-gray-700 bg-gray-900">
        {/* header */}
        <div className="flex items-center justify-between p-3 border-b border-gray-800">
          <div className="flex gap-2">
            <button
              className={`px-3 py-1 rounded ${tab === "ai" ? "bg-indigo-600" : "bg-gray-800"}`}
              onClick={() => setTab("ai")}
            >
              Generate with AI
            </button>
            <button
              className={`px-3 py-1 rounded ${tab === "upload" ? "bg-indigo-600" : "bg-gray-800"}`}
              onClick={() => setTab("upload")}
            >
              Upload File
            </button>
          </div>
          <button className="px-2 py-1 bg-gray-800 rounded" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* body */}
        <div className="p-4 space-y-3">
          {tab === "ai" && (
            <>
              <label className="text-sm text-gray-400">Describe your quiz</label>
              <textarea
                className="w-full p-2 text-black rounded"
                rows={5}
                placeholder={`e.g. "10 questions about React basics, medium difficulty"`}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
              <div className="flex justify-end">
                <button
                  disabled={loading || !prompt.trim()}
                  onClick={handleGenerate}
                  className="px-4 py-2 rounded bg-green-600 disabled:opacity-50"
                >
                  {loading ? "Generating..." : "Generate"}
                </button>
              </div>
            </>
          )}

          {tab === "upload" && (
            <>
              <p className="text-sm text-gray-400">
                Upload CSV / TXT / DOCX / PDF (parser stub — wire to your backend).
              </p>
              <input ref={fileRef} type="file" className="w-full text-sm" />
              <div className="flex justify-end">
                <button
                  disabled={loading}
                  onClick={handleUpload}
                  className="px-4 py-2 rounded bg-yellow-600 disabled:opacity-50"
                >
                  {loading ? "Parsing..." : "Import"}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
