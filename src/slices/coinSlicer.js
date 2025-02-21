import { createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast";

const initialState = {
    coins:0,
    transactions:[]
}

export const coinSlice = createSlice({
    name:"coins",
    initialState,
    reducers:{
        earnCoins:(state,action)=>{
            state.coins += action.payload;
        },
        spendCoins:(state,action)=>{
            if(state.coins>=action.payload){
                state.coins-=action.payload
            }else{
                toast.error("Insufficient balance")
            }
        }
    }
})

export