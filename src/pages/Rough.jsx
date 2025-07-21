import { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { useForm, useFieldArray } from "react-hook-form";

const defaultQuiz = {
  questions: [
    {
      questionDesc: "What is JavaScript?",
      explanation: "",
      options: [
        { text: "Programming Language" },
        { text: "Fruit" },
        { text: "Drink" },
        { text: "Animal" }
      ],
      correctAnswer: 0
    }
  ]
};
const Rough = () => {
   const [jsonData, setJsonData] = useState(JSON.stringify(defaultQuiz, null, 2));
  const [parsedData, setParsedData] = useState(defaultQuiz);

  const {
    control,
    register,
    watch,
    setValue,
    reset
  } = useForm({ defaultValues: parsedData });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions"
  });

  // Handle changes from Monaco
  const handleJsonChange = (val) => {
    setJsonData(val);
    try {
      const parsed = JSON.parse(val);
      setParsedData(parsed);
      // for (let i = 0; i < parsed.questions.length; i++) {
      //   setValue(`questions.${i}`, parsed.questions[i]);
      // }
      reset(parsed);
    } catch (e) {
      // Invalid JSON - don't crash
    }
  };


  // Reflect changes from form back to JSON
  useEffect(() => {
    const subscription = watch((value) => {
      setJsonData(JSON.stringify(value, null, 2));
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <div className="grid grid-cols-2 gap-4 p-4 h-screen">
      {/* Left JSON Editor */}
      <div className="h-full border rounded">
        <Editor
          height="100%"
          language="json"
          theme="vs-dark"
          value={jsonData}
          onChange={handleJsonChange}
        />
      </div>

      {/* Right Visual UI */}
      <div className="overflow-y-auto space-y-6">
        {fields.map((field, index) => (
          <div key={field.id} className="border p-4 rounded bg-gray-900 text-white">
            <label>Question {index + 1}</label>
            <input
              {...register(`questions.${index}.questionDesc`)}
              className="w-full p-2 my-2 text-black"
              placeholder="Enter question text"
            />
            <input
              {...register(`questions.${index}.explanation`)}
              className="w-full p-2 my-2 text-black"
              placeholder="Explanation (optional)"
            />
            <div className="grid grid-cols-2 gap-2">
              {[0, 1, 2, 3].map(i => (
                <input
                  key={i}
                  {...register(`questions.${index}.options.${i}.text`)}
                  className="p-2 text-black"
                  placeholder={`Option ${i + 1}`}
                />
              ))}
            </div>
            <select
              {...register(`questions.${index}.correctAnswer`)}
              className="w-full p-2 mt-2 text-black"
            >
              <option value="">Select Correct Option</option>
              {[0, 1, 2, 3].map(i => (
                <option key={i} value={i}>Option {i + 1}</option>
              ))}
            </select>
            <button
              onClick={() => remove(index)}
              className="mt-2 text-red-300 underline"
            >
              Delete Question
            </button>
          </div>
        ))}

        <button
          className="p-2 bg-green-500 text-white rounded"
          onClick={() => append({
            text: "",
            explanation: "",
            options: [{ text: "" }, { text: "" }, { text: "" }, { text: "" }],
            correctOption: 0
          })}
        >
          + Add Question
        </button>
      </div>
    </div>
  );
}

export default Rough