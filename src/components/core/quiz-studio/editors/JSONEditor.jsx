import React, { useEffect, useState } from "react";
import Editor, { useMonaco } from "@monaco-editor/react";
import { myDarkTheme } from "../../../../monacoThemes";


export default function JSONEditor({ quizData, setQuizData }) {
  const [jsonData, setJsonData] = useState(JSON.stringify({ questions: quizData?.questions || [] }, null, 2));
  const monaco = useMonaco();

  if (monaco) {
      monaco.editor.defineTheme("studio-dark", myDarkTheme);
  }


  // reflect outer → editor
  useEffect(() => {
    setJsonData(JSON.stringify({ questions: quizData.questions || [] }, null, 2));
  }, [quizData.questions]);

  const handleChange = (val) => {
    setJsonData(val);
    try {
      const parsed = JSON.parse(val || "{}");
      if (Array.isArray(parsed.questions)) {
        setQuizData((prev) => ({ ...prev, questions: parsed.questions }));
      }
    } catch {
      // ignore invalid JSON
    }
  };

  return (
    <div className="h-full">
      <Editor height="100%" language="json" theme="studio-dark" value={jsonData} onChange={handleChange} />
    </div>
  );
}
