import React from "react";

export default function FileUploader({ file, setFile, setQuestions }) {
  const handleFile = (e) => {
    const uploaded = e.target.files[0];
    if (!uploaded) return;
    setFile(uploaded);

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        setQuestions(data.questions || []);
      } catch {
        alert("Invalid JSON format");
      }
    };
    reader.readAsText(uploaded);
  };

  return (
    <div className="border-2 border-dashed border-gray-500 p-6 rounded-lg text-center">
      <input type="file" accept=".json,.csv" onChange={handleFile} className="hidden" id="fileInput" />
      <label htmlFor="fileInput" className="cursor-pointer text-indigo-400">
        {file ? file.name : "Click to upload JSON/CSV"}
      </label>
    </div>
  );
}
