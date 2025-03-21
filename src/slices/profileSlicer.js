
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")):null,
    loading:false,
}

const profileSlice = createSlice({
    name:"profile",
    initialState,
    reducers:{
        setUser:(state,value)=>{
            state.user = value.payload;
            localStorage.setItem("user",JSON.stringify(value.payload))
        },
        setProfileLoading:(state,value)=>{
            state.loading = value.payload;
        }
    }
})

export const {setUser, setProfileLoading} = profileSlice.actions;
export default profileSlice.reducer;