import { createAsyncThunk ,createSlice} from "@reduxjs/toolkit";
import { postUserLoginData } from "../api/postUserLoginData";

const initialState = {
    status : 'idle',
    data:[]

}

export const postUserLogin = createAsyncThunk(
    'userloginpost',
    async ({credential,successCB,errorCB})=>{
        const response = await postUserLoginData(credential,successCB,errorCB)
            return response?.data
    }
)


export const userLoginSlice = createSlice({
    name:'postuserlogindata',
        initialState:initialState,
        reducers:{},
        extraReducers(builder){
            builder 
            .addCase(postUserLogin .pending, (state)=>{
                state.status='loading'
            })
            .addCase(postUserLogin.fulfilled,(state,action)=>{
                state.status ="succeeded"
                state.data = action.payload;
                
            })
            .addCase(postUserLogin .rejected,(state,action)=>{
                state.status ="failed"
                state.data = action.payload;
                
            })
        }
})

export default userLoginSlice.reducer