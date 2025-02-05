import { data } from 'autoprefixer'
import React, { useState } from 'react'
import ConformationPopUp from '../../../../common/ConformationPopUp'
import NestedQuestionView from './NestedQuestionView'


const AddQuestion = () => {

  return (
    <>
    <div className=' border-[1px] p-6 space-y-8 rounded-md '>
      <div className=" text-2xl font-semibold">Quiz Builder</div>
       <NestedQuestionView/>
    
    </div>
   
    </>
  )
}

export default AddQuestion