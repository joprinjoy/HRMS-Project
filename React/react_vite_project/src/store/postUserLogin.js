import { createAsyncThunk ,createSlice} from "@reduxjs/toolkit";
import { postUserLoginData } from "../api/postUserLoginData";

const initialState = {
    status : 'idle',
    data:[]

}

export const postUserLogin = createAsyncThunk(
    'userloginpost',
    async (credential)=>{
        const response = await postUserLoginData(credential)
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
            .addCase(postUserLogin.fulfilled,(state)=>{
                state.status ="succeeded"
                
            })
            .addCase(postUserLogin .rejected,(state)=>{
                state.status ="failed"
                
            })
        }
})

export default userLoginSlice.reducer