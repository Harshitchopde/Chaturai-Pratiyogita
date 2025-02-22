import React from 'react'
import { QUIZ_DIFFICULTY, QUIZ_STATUS } from '../../../../utils/constants'
import { Link } from 'react-router-dom'
import { MdOutlineVerifiedUser } from "react-icons/md";
// const quiz ={
//     "_id": "67a4b74c0c863bde2bdcbcae",
//     "quizName": "test your skill in oops",
//     "quizDesc": "lets go it",
//     "timeDuration": 10,
//     "tags": [
//       "java"
//     ],
//     "topic": "Coding in javaScript",
//     "difficulty": "Hard",
//     "numberOfQuestions": 10,
//     "studentEnrolled": [],
//     "questions": [
//       "67a4b78b0c863bde2bdcbcb2",
//       "67a4b7e50c863bde2bdcbcbf",
//       "67a4b8260c863bde2bdcbcd0",
//       "67a4b8870c863bde2bdcbce5",
//       "67a4b8cc0c863bde2bdcbcfe",
//       "67a4b90f0c863bde2bdcbd1b",
//       "67a4b9a90c863bde2bdcbd3c",
//       "67a4b9ef0c863bde2bdcbd61",
//       "67a4ba330c863bde2bdcbd8a",
//       "67a4ba770c863bde2bdcbdb7"
//     ],
//     "status": "Published",
//     "createdAt": "2025-02-06T13:21:16.801Z",
//     "__v": 0
//   }
const SingleCard = ({quiz}) => {

  return (
    <div className=' relative space-y-2 flex flex-col w-[300px] h-[350px] select-none p-5 border border-purple-400 rounded-md '>
        <p className=' capitalize text-2xl text-black'>{quiz?.quizName}</p>
        <p className=' pl-1 text-sm text-slate-400'>{quiz?.quizDesc}</p>
        <p className=' text-lg '>Topic it Cover : {quiz?.topic}</p>
        <div className=" flex text-lg gap-2 ">
            <p>Tags:</p>
            
            <div className=" text-sm flex flex-wrap">
            {
                  quiz?.tags?.map((tag,i)=>(
                      <div key={i} className=" px-2 m-1  max-w-max flex items-center justify-center rounded-lg bg-yellow-100">{tag}</div>
                  ))
              }
            </div>
        </div>
       
        <p className=' text-sm'>Difficulty : <span className={`
         rounded-md px-2 py-[1px] ${
            quiz?.difficulty===QUIZ_DIFFICULTY.EASY?"bg-green-200 text-green-600":quiz?.difficulty===QUIZ_DIFFICULTY.MEDIUM?" bg-yellow-200 text-yellow-600":quiz?.difficulty===QUIZ_DIFFICULTY.HARD?"bg-red-200 text-red-600":"bg-gray-200 text-gray-600"}`}>{quiz?.difficulty}</span></p>
        <p className=' text-sm'>Number Of Questions : {quiz?.numberOfQuestions}</p>
        {/* show for only verified */}
        {
          quiz?.verifyed===true && (
            <div className=" absolute -top-2 rounded-md p-1 right-0 border-b border-l bg-yellow-200  flex items-center gap-x-1  text-sm">
              Verified: <MdOutlineVerifiedUser/>
              </div>
          )
        }
        <div
         className=" absolute bottom-11 left-0 right-0  flex  justify-center  w-full">
            <Link to={quiz?._id}>
            <button
             className='border-blue-950  hover:bg-blue-500  border bg-blue-600 max-w-max rounded-md px-4 py-1'>
              {
                quiz?.attempted ===2 ?(
                  <div className="">Take Test</div>
                 ): quiz?.attempted === 3 ?(
                <div className="">Show Result</div> 
                ):(
                  <div className="">Register</div>
                )
              }
            </button>
            </Link>
        </div>
    </div>
  )
}

export default SingleCard