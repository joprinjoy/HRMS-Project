import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import { getDesignationData} from "../api/getDesignationData";



const initialState = {
    status: 'idle',
    data:[]
}

export const  DesignationData = createAsyncThunk(
    'designationdatagetter',
    async()=>{
        const response = await getDesignationData();
        return response;
    }
)

export const DesignationDataSlice = createSlice({

    name:'getDesignationdata',
    initialState: initialState,
    reducers:{},
    extraReducers(builder){
        builder 
        .addCase(DesignationData.pending,(state)=>{
            state.status = 'loading'
        })

        .addCase(DesignationData.fulfilled,(state,action)=>{
            state.status = "succeeded"
            state.data = action.payload 
              
        })

        .addCase(DesignationData.rejected,(state)=>{
            state.status = "failed"   
        })
    }
})
export default DesignationDataSlice.reducer