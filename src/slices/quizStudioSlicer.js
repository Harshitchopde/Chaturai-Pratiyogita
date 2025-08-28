import { createSlice } from "@reduxjs/toolkit"

const initialState={
    quiz:null,
    loading:false
}

const quizStudioSlice = createSlice({
    name:"quiz-studio",
    initialState,
    reducers:{
        setQuizSetUp(state,action){
            state.quiz = action.payload
        }
    }
})

export const { setQuizSetUp } = quizStudioSlice.actions;
export default quizStudioSlice.reducer
