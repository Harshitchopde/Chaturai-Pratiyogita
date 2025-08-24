import React from 'react'

const QuizInfoRender = ({quizData,setQuizData,onCancel,setStep}) => {
  return (
     <div className="p-6 space-y-4">
      <h2 className="text-xl font-semibold text-white">Quiz Details</h2>

      <input
        className="w-full p-2 text-black rounded"
        placeholder="Quiz Title"
        value={quizData.title}
        onChange={(e) => setQuizData({ ...quizData, title: e.target.value })}
      />

      <textarea
        className="w-full p-2 text-black rounded"
        placeholder="Description (optional)"
        value={quizData.description}
        onChange={(e) => setQuizData({ ...quizData, description: e.target.value })}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <select
          className="w-full p-2 text-black rounded"
          value={quizData.difficulty}
          onChange={(e) => setQuizData({ ...quizData, difficulty: e.target.value })}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>

        <input
          className="w-full p-2 text-black rounded"
          placeholder="Topic (optional)"
          value={quizData.topic || ""}
          onChange={(e) => setQuizData({ ...quizData, topic: e.target.value })}
        />
        <input
          type="number"
          className="w-full p-2 text-black rounded"
          placeholder="Time (minutes, optional)"
          value={quizData.timeDuration || ""}
          onChange={(e) => setQuizData({ ...quizData, timeDuration: Number(e.target.value) || "" })}
        />
      </div>

      <div className="flex justify-end gap-2">
        <button onClick={onCancel} className="px-4 py-2 bg-gray-700 rounded text-white">
          Cancel
        </button>
        <button
          disabled={!quizData.title?.trim()}
          onClick={() => setStep(2)}
          className="px-4 py-2 bg-indigo-600 rounded text-white disabled:opacity-50"
        >
          Next →
        </button>
      </div>
    </div>
  )
}

export default QuizInfoRender