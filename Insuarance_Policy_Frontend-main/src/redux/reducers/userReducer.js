import { createSlice } from "@reduxjs/toolkit";

const initialState={
    isLoading:true,
    user:null
}

const userReducer=createSlice({
    name:"userReducer",
    initialState,
    reducers:{
        userExist:(state,action)=>{
            state.user=action.payload;
            state.isLoading=false
        },
        userNotExist:(state)=>{
            state.user=null;
            state.isLoading=false
        }
    }
})

export const {userExist,userNotExist}=userReducer.actions;
export default userReducer