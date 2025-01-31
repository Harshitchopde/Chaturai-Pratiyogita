import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    step:1,
    quiz:null,
    editQuiz:false,
}

const quizSlice = createSlice({
    name:"quiz",
    initialState,
    reducers:{
        setStep(state,action){
            state.step = action.payload
        },
        setQuiz: (state,action)=>{
            state.quiz = action.payload
        },
        setEditQuiz: (state,action)=>{
            state.editQuiz = action.payload
        },
        resetQuizDetails: (state)=>{
            state.step=1
            state.editQuiz=false
            state.quiz=null
        }
    }
})

export const { setEditQuiz,setQuiz,setStep,resetQuizDetails} = quizSlice.actions;
export default quizSlice.reducer;