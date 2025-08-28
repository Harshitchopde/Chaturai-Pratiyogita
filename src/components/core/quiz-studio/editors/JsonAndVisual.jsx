import { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { useForm, useFieldArray } from "react-hook-form";

// const defaultQuiz = {
//   questions: [
//     {
//       questionDesc: "What is JavaScript?",
//       explanation: "",
//       options: [
//         { text: "Programming Language" },
//         { text: "Fruit" },
//         { text: "Drink" },
//         { text: "Animal" }
//       ],
//       correctAnswer: 0
//     }
//   ]
// };

const JsonAndVisual = ({quizData,setQuizData}) => {

  const [jsonData, setJsonData] = useState(JSON.stringify({ questions:quizData.questions || []}, null, 2));
  const { control, register, watch, reset } = useForm({
    defaultValues: { questions:quizData?.questions || []}
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions"
  });

  // Handle JSON changes
  const handleJsonChange = (val) => {
    setJsonData(val);
    // console.log("JSONCHANGE: ",typeof val)
    try {
      const parsed = JSON.parse(val);
      // console.log("PARSED: ",typeof parsed)
      setQuizData(parsed);
      reset(parsed);
    } catch (e) {
      // ignore invalid JSON
      console.error("Error in handleJSon change fun: ",e)
    }
  };

  // Reflect form → JSON
  useEffect(() => {

    const subscription = watch((value) => {
      setJsonData(JSON.stringify(value, null, 2));
      setQuizData(value);
    });
    return () => subscription.unsubscribe();
  }, [watch,setQuizData]);

  return (
    <div className="grid grid-cols-2 gap-4 p-4 h-full">
      {/* JSON Editor */}
      <div className="h-full border rounded">
        <Editor
          height="100%"
          language="json"
          theme="vs-dark"
          value={jsonData}
          onChange={handleJsonChange}
        />
      </div>

      {/* Visual Editor */}
      <div className="overflow-y-auto space-y-6 pr-2">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="border p-4 rounded bg-gray-900 text-white"
          >
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
              {[0, 1, 2, 3].map((i) => (
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
              {[0, 1, 2, 3].map((i) => (
                <option key={i} value={i}>
                  Option {i + 1}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => remove(index)}
              className="mt-2 text-red-300 underline"
            >
              Delete Question
            </button>
          </div>
        ))}

        <button
          type="button"
          className="p-2 bg-green-500 text-white rounded"
          onClick={() =>
            append({
              questionDesc: "",
              explanation: "",
              options: [{ text: "" }, { text: "" }, { text: "" }, { text: "" }],
              correctAnswer: 0
            })
          }
        >
          + Add Question
        </button>
      </div>
    </div>
  );
};

export default JsonAndVisual;
