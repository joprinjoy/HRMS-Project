import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import { getEmployeeData } from "../api/getEmployeeData";


const initialState = {
    status: 'idle',
    data:[]
}

export const EmployeeData = createAsyncThunk(
    'employeedatagetter',
    async()=>{
        const response = await getEmployeeData();
            console.log(response,"response")
            return response;
        
    }
)

export const EmployeeDataSlice = createSlice({

    name:'getemployeedata',
    initialState: initialState,
    reducers:{},
    extraReducers(builder){
        builder 
        .addCase(EmployeeData.pending,(state)=>{
            state.status = 'loading'
        })

        .addCase(EmployeeData.fulfilled,(state,action)=>{
            state.status = "succeeded"
            state.data = action.payload    
        })

        .addCase(EmployeeData .rejected,(state)=>{
            state.status = "failed"   
        })
    }
})

export default EmployeeDataSlice.reducer