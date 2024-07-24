import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import { postCredentialData } from "../api/postAdminData";

const initialState = {
    status:'idle',
    data:[]
}
export const postUserCredential = createAsyncThunk(
    'adduserthunk',
    async ({credential,successCB,errorCB})=>{
        const response = await postCredentialData(credential,successCB,errorCB)
        return response
    }
)


export const userCredentialSlice = createSlice({
    name:'credential',
    initialState:initialState,
    reducer:{},
    extraReducers(builder){
        builder
        .addCase(postUserCredential.pending,(state)=>{
            state.status='loading'
        })
        .addCase(postUserCredential.fulfilled,(state)=>{
            state.status='succeeded'
        })
        .addCase(postUserCredential.rejected,(state)=>{
            state.status='failed'
        })
    }
})

export const PostCredentialReducer = userCredentialSlice.reducer