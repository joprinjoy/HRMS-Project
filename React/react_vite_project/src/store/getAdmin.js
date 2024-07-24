import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import { getUserData } from "../api/getAdminData";


const initialState = {
    status: 'idle',
    data:[]
}



export const UserData = createAsyncThunk(
    'userdatagetter',
    async()=>{
        const response = await getUserData();
            return response?.data;
        
    }
)




export const UserDataSlice = createSlice({

    name:'getUserdata',
    initialState: initialState,
    reducers:{},
    extraReducers(builder){
        builder 
        .addCase(UserData.pending,(state)=>{
            state.status = 'loading'
        })

        .addCase(UserData.fulfilled,(state,action)=>{
            state.status = "succeeded"
            state.data = action.payload    
        })

        .addCase(UserData.rejected,(state)=>{
            state.status = "failed"   
        })
    }
})



export default UserDataSlice.reducer
