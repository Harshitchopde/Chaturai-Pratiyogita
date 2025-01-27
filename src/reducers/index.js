import { combineReducers } from "@reduxjs/toolkit";
import authReducers from "../slices/authSlicer.js";
import profileReducers from "../slices/profileSlicer.js"
export const rootReducer = combineReducers({
    auth:authReducers,
    profile:profileReducers,
});