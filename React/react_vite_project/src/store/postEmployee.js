import {createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import { postEmployeeData, postEmployeeDataUpdate } from "../api/postEmployeeData";

const initialState = {
    status: 'idle',
    data : []
}

export const PostAddEmployee = createAsyncThunk(
    'addemployeepost',
    async({employee,successCB,errorCB})=>{
        const response = postEmployeeData(employee,successCB,errorCB);
        return response.data;
    }
    
)

export const PostUpdateEmployee = createAsyncThunk(
    'addemployeepost',
    async({employee,successCB,errorCB})=>{
        const response = postEmployeeDataUpdate(employee,successCB,errorCB);
        
        return response.data;
    }
    
)




const addEmployeeSlicer = createSlice(
    {
        name:'postemployeeadddata',
        initialState:initialState,
        reducers:{},
        extraReducers(builder){
            builder 
            .addCase(PostAddEmployee .pending, (state)=>{
                state.status='loading'
            })
            .addCase(PostAddEmployee.fulfilled,(state)=>{
                state.status ="succeeded"
                
            })
            .addCase(PostAddEmployee .rejected,(state)=>{
                state.status ="failed"
                
            })
        }

    }
)


const updateEmployeeSlicer = createSlice(
    {
        name:'postemployeeupdatedata',
        initialState:initialState,
        reducers:{},
        extraReducers(builder){
            builder 
            .addCase(PostUpdateEmployee .pending, (state)=>{
                state.status='loading'
            })
            .addCase(PostUpdateEmployee .fulfilled,(state)=>{
                state.status ="succeeded"
                
            })
            .addCase(PostUpdateEmployee .rejected,(state)=>{
                state.status ="failed"
                
            })
        }

    }
)
export const updateEmployeeReducer = updateEmployeeSlicer.reducer
export const addEmployeeReducer = addEmployeeSlicer.reducer