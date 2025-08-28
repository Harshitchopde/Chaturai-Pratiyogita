import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateQuizData } from '../../../../slices/quizStudioSlicer';

const QuizInfoRender = ({onCancel,setStep}) => {
  const quizData =  useSelector((state)=>state.quizStudio.quizData);
  console.log("Quidata: ",quizData);
  const dispatch = useDispatch();
  return (
     <div className="p-6 space-y-4">
      <h2 className="text-xl font-semibold text-white">Quiz Details</h2>

      <input
        className="w-full p-2 text-black rounded"
        placeholder="Quiz Title"
        value={quizData.quizName}
        onChange={(e) => 
          dispatch(updateQuizData({field:"quizName",value:e.target.value}))
        }
      />

      <textarea
        className="w-full p-2 text-black rounded"
        placeholder="Description (optional)"
        value={quizData.quizDesc}
        onChange={(e) => 
          dispatch(updateQuizData({field:"quizDesc",value:e.target.value}))
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <select
          className="w-full p-2 text-black rounded"
          value={quizData.difficulty}
          onChange={(e) => 
            dispatch(updateQuizData({field:"difficulty",value:e.target.value}))
          }
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>

        <input
          className="w-full p-2 text-black rounded"
          placeholder="Topic (optional)"
          value={quizData?.topic || ""}
          onChange={(e) => 
            dispatch(updateQuizData({field:"topic",value:e.target.value}))
          }
        />
        <input
          type="number"
          className="w-full p-2 text-black rounded"
          placeholder="Time (minutes, optional)"
          value={quizData?.timeDuration || ""}
          onChange={(e) => 
            dispatch(updateQuizData({field:"timeDuration",value:e.target.value}))
          }
       />
      </div>

      <div className="flex justify-end gap-2">
        <button onClick={onCancel} className="px-4 py-2 bg-gray-700 rounded text-white">
          Cancel
        </button>
        <button
          disabled={!quizData.quizName?.trim()}
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