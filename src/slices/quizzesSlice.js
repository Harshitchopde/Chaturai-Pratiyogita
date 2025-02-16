import { createSlice } from "@reduxjs/toolkit"
import { QUIZ_STATUS } from "../utils/constants"

const initialState ={
    quizzes:null,
    instructorQuiz:null,
    query:""
}

const quizziesSlice = createSlice({
    name:"quizzes",
    initialState,
    reducers:{
        setQuizzes:(state,action)=>{
            state.quizzes = action.payload
        },
        setQuery:(state,action)=>{
            state.query = action.payload
        },
        setInstructorQuiz(state,action){
            state.instructorQuiz = action.payload
        },
        publishQuiz:(state,action)=>{
            state.instructorQuiz.map((quiz)=> {
                if(quiz._id===action.payload){
                    quiz.status = QUIZ_STATUS.PUBLISHED
                }
            })
        },
        unPublishQuiz:(state,action)=>{
            state.instructorQuiz.map((quiz)=>{
                if(quiz._id===action.payload){
                    quiz.status = QUIZ_STATUS.DRAFT
                }
            })
        },
        deleteStateQuiz:(state,action)=>{
            state.instructorQuiz.splice((quiz)=> quiz._id===action.payload,1);
        },
        resetInstructorQuiz(state){
            state.instructorQuiz = null
        },
        resetQuery:(state)=>{
            state.query=""
        },
        resetQuizzes:(state)=>{
            state.quizzes=[]
        }
    }   
})

export const { setQuizzes,resetQuizzes,deleteStateQuiz, publishQuiz,unPublishQuiz, resetInstructorQuiz,setInstructorQuiz ,setQuery,resetQuery} = quizziesSlice.actions;
export default quizziesSlice.reducer;
