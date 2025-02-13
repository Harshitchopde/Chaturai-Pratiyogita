import { createSlice } from "@reduxjs/toolkit"

const initialState ={
    quizzes:[],
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
        resetQuery:(state)=>{
            state.query=""
        },
        resetQuizzes:(state)=>{
            state.quizzes=[]
        }
    }
})

export const { setQuizzes,resetQuizzes ,setQuery,resetQuery} = quizziesSlice.actions;
export default quizziesSlice.reducer;
