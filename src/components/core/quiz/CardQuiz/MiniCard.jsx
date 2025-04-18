import React from 'react'
import { QUIZ_DIFFICULTY } from '../../../../utils/constants'

const MiniCard = ({quiz,loading}) => {
    const attempted = 2;
    console.log("Quiz : ",quiz)
    let properties = quiz?.difficulty===QUIZ_DIFFICULTY.EASY?"bg-green-200 text-green-600":
      quiz?.difficulty===QUIZ_DIFFICULTY.MEDIUM?" bg-yellow-200 text-yellow-600":
      quiz?.difficulty===QUIZ_DIFFICULTY.HARD?"bg-red-200 text-red-600":
      "bg-gray-200 text-gray-600";
  return (
    <div className=' p-3  items-center  flex justify-between border w-full border-gray-200 bg-gray-100 rounded-md '>
        <div className="  flex  items-center gap-2">
            {/* Head E M H */}
        <div className={ ` flex items-center justify-center px-1 w-5 h-5 ${properties}`}>{
            quiz?.difficulty===QUIZ_DIFFICULTY.EASY?"E":
            quiz?.difficulty===QUIZ_DIFFICULTY.MEDIUM?"M":
            quiz?.difficulty===QUIZ_DIFFICULTY.HARD?"H":
            "A"
            }</div>
        {/* Name of the Quiz */}
        <div className="">{quiz?.quizName}</div>
        </div>
        {/* take or disable or show answer */}
        <button
                        
                        className={`${attempted===1 && "  blur-sm cursor-not-allowed"} sm:text-xl text-[0.75rem] leading-4 rounded-md bg-blue-500 max-h-max py-1 px-[2px] sm:px-4 flex  items-center`}
                      >
                        {attempted===3 ? ( 
                          <div className="">Show Answer</div>
                        ):attempted===2 ? (
                          <div>Start Quiz!</div>
                        ):(
                          <div className="">Register</div>
                        )}
                      </button>
    </div>
  )
}

export default MiniCard