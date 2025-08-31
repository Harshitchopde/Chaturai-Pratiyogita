import { createSlice } from "@reduxjs/toolkit"

const initialState={
    quizData:{
        quizName:"",
        quizDesc:"",
        questions:[],
        tags:[],
    },
    loading:false,
    editStudioQuiz:false,
}

const quizStudioSlice = createSlice({
    name:"quizStudio",
    initialState,
    reducers:{
        setQuizData(state,action){
            state.quizData = action.payload
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
        setTagChip(state,action){
            state.quizData.tags = action.payload
        },
        setEditStudioQuiz(state,action){
            state.editStudioQuiz = action.payload
        },
        resetQuizData(state){
            state.quizData = initialState.quizData;
        }

    }
})

export const {setEditStudioQuiz, setQuizData,updateQuestion,setTagChip,updateQuizData,appendQuestions,resetQuizData } = quizStudioSlice.actions;
export default quizStudioSlice.reducer
