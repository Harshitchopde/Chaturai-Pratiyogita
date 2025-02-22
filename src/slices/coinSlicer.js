import { createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast";

const initialState = {
    coins:localStorage.getItem("coins")? JSON.parse(localStorage.getItem("coins")):0,
    transactions:[]
}

export const coinSlice = createSlice({
    name:"coins",
    initialState,
    reducers:{
        setCoins:(state,action)=>{
            state.coins = action.payload
            localStorage.setItem("coins",JSON.stringify(state.coins));
        },
        earnCoins:(state,action)=>{
            state.coins += action.payload;
            localStorage.setItem("coins",JSON.stringify(state.coins))
        },
        spendCoins:(state,action)=>{
            if(state.coins>=action.payload){
                state.coins-=action.payload
                localStorage.setItem("coins",JSON.stringify(state.coins))
            }else{
                toast.error("Insufficient balance")
            }
        }
    }
})

export const {earnCoins,spendCoins,setCoins} = coinSlice.actions;
export default coinSlice.reducer;