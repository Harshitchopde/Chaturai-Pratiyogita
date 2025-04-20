import { createSlice } from "@reduxjs/toolkit"
import { QUIZ_STATUS } from "../utils/constants"

const initialState ={
    quizzes:null,
    instructorQuiz:null,
    analyticsQuiz:null,
    testQuiz:null,
    multiQuiz:null,
    attempted:1,
    query:""
}
const quizziesSlice = createSlice({
    name:"quizzes",
    initialState,
    reducers:{
        setAttempted(state,action){
            state.attempted = action.payload
        },
        setTestQuiz(state,action){
            state.testQuiz = action.payload
        },
        setAnalyticsQuiz(state,action){
            state.analyticsQuiz = action.payload
        },
        resetAnalyticsQuiz(state){
            state.analyticsQuiz = null
        },
        setQuizzes:(state,action)=>{
            state.quizzes = action.payload
        },
        setQuery:(state,action)=>{
            state.query = action.payload
        },
        setMultiQuiz(state,action){
            state.multiQuiz = action.payload
        },
        resetMultiQuiz(state){
            state.multiQuiz = null
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

export const {setAnalyticsQuiz,setAttempted, resetMultiQuiz , setMultiQuiz, resetAnalyticsQuiz, setTestQuiz, setQuizzes,resetQuizzes,deleteStateQuiz, publishQuiz,unPublishQuiz, resetInstructorQuiz,setInstructorQuiz ,setQuery,resetQuery} = quizziesSlice.actions;
export default quizziesSlice.reducer;
