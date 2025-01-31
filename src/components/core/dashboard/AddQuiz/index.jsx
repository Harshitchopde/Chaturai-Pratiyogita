import React from 'react'
import RenderSteps from './RenderSteps'

const AddQuiz = () => {
  return (
    <div className=' flex  w-full items-start  gap-x-6'>
      <div className=" flex-1 flex flex-col gap-2">
         <h1 className=' text-3xl text-black'>Add Quiz</h1>
         <div className=" flex-1">
            <RenderSteps/>
         </div>
      </div>
      <div className=" flex flex-col gap-2 sticky top-[75px] w-[35%] rounded-md mt-10 hidden xl:block p-6 border border-slate-600">
        {/* Instruction section */}
        <h1 >Tip For Quiz Creation</h1>
        <ul>
          
          <li>tip no 1 </li>
          <li>tip no 2</li>
          <li>tip no 3</li>
          <li>tip no 4</li>
        </ul>
      </div>
    </div>
  )
}

export default AddQuiz