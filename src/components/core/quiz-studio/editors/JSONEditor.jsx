import { useState } from "react";
import Editor, { useMonaco } from "@monaco-editor/react";
import { myDarkTheme } from "../../../../monacoThemes";

const defaultJson = {
  questions: [
    {
      questionDesc: "Sample Question?",
      explanation: "",
      options: [
        { text: "Option A" },
        { text: "Option B" },
        { text: "Option C" },
        { text: "Option D" }
      ],
      correctAnswer: 0
    }
  ]
};

export default function JSONEditor() {
  const [jsonData, setJsonData] = useState(
    JSON.stringify(defaultJson, null, 2)
  );
  const monaco = useMonaco();
  if(monaco){
    monaco.editor.defineTheme("my-custom-theme",myDarkTheme);
  }

  return (
    <div className="h-full">
      <Editor
        height="100%"
        language="json"
        theme="my-custom-theme"
        // theme="vs-dark"
        value={jsonData}
        onChange={(val) => setJsonData(val)}
      />
    </div>
  );
}
