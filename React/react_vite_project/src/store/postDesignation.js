import {createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import { PostAddDesignationData,PostDeleteDesignationData,PostUpdateDesignationData } from "../api/postDesignationData";


const initialState = {
    status: 'idle',
    data : [],
    error: null
}

export const PostAddDesignation= createAsyncThunk(
    'adddesignationpost',
    async({designation,successCB,errorCB})=>{
        const response = PostAddDesignationData(designation,successCB,errorCB);
        return response?.data;
    }
    
)

export const PostDeleteDesignation = createAsyncThunk(
    'deletedesignationpost',
    async({id,successCB})=>{
        const response = PostDeleteDesignationData({id,successCB})
        return response?.data
    }
)

export const PostUpdateDesignation = createAsyncThunk(
    'updatedesignationpost',
    async({designation,successCB,errorCB})=>{
        const response = PostUpdateDesignationData(designation,successCB,errorCB)
        return response?.data
    }
)


export const PostDesignationSlicer = createSlice(
    {
        name:'postdesignationadddata',
        initialState:initialState,
        reducers:{},
        extraReducers(builder){
            builder 
            .addCase(PostAddDesignation.pending, (state)=>{
                state.status='loading'
            })
            .addCase(PostAddDesignation.fulfilled,(state)=>{
                state.status ="succeeded"
                
            })
            .addCase(PostAddDesignation.rejected,(state)=>{
                state.status ="failed"
                
                
            })
        }

    }
)


export const deleteDesignationSlicer = createSlice(
    {
        name:'designationdeletedata',
        initialState:initialState,
        reducers:{},
        extraReducers(builder){
            builder 
            .addCase(PostDeleteDesignation.pending, (state)=>{
                state.status='loading'
            })
            .addCase(PostDeleteDesignation.fulfilled,(state)=>{
                state.status ="succeeded"
                
            })
            .addCase(PostDeleteDesignation.rejected,(state)=>{
                state.status ="failed"
                
                
            })
        }

    }
)

export const updateDesignationSlicer = createSlice({

    name:'designationupdatedata',
    initialState:initialState,
    reducers:{},
    extraReducers(builder){
        builder 
        .addCase(PostUpdateDesignation.pending,(state)=>{
            state.status = "loading"
        })
        .addCase(PostUpdateDesignation.fulfilled,(state,)=>{
            state.status = "succeeded"
           
        })
        .addCase(PostUpdateDesignation.rejected,(state,)=>{
            state.status = "failed"
           
        })
    }
})
export const PostDesignationReducer = PostDesignationSlicer.reducer
export const DeleteDesignationReducer = deleteDesignationSlicer.reducer
export const UpdateDesignationReducer = updateDesignationSlicer.reducer