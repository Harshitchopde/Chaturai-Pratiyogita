import { combineReducers } from "@reduxjs/toolkit";
import authReducers from "../slices/authSlicer.js";
import profileReducers from "../slices/profileSlicer.js"
import quizReducers from "../slices/quizSlicer.js"
import quizzesReducers from "../slices/quizzesSlice.js"
import coinsReducers from "../slices/coinSlicer.js"
export const rootReducer = combineReducers({
    auth:authReducers,
    profile:profileReducers,
    quiz:quizReducers,
    quizzes:quizzesReducers,
    coins:coinsReducers,
});