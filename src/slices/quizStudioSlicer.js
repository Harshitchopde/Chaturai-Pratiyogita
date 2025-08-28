import { createSlice } from "@reduxjs/toolkit"

const initialState={
    quizData:{
        quizName:"",
        quizDesc:"",
        questions:[]
    },
    loading:false
}

const quizStudioSlice = createSlice({
    name:"quizStudio",
    initialState,
    reducers:{
        setQuizData(state,action){
            state.quiz = action.payload
        },
        updateQuizData(state,action){
            const {field,value} = action.payload;
            state.quizData[field] = value;
        },
        updateQuestion(state,action){
            state.quizData.questions = action.payload;
        },
        appendQuestions(state,action){
            state.quizData.questions = [
                ...state.quizData.questions,
                ...action.payload,
            ];
        },
        resetQuizData(state){
            state.quizData = initialState.quizData;
        }

    }
})

export const { setQuizSetUp,updateQuestion,updateQuizData,appendQuestions,resetQuizData } = quizStudioSlice.actions;
export default quizStudioSlice.reducer
