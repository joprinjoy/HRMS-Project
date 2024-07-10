import  {configureStore} from '@reduxjs/toolkit'
import GetEmployeeReducer from './getEmployee'

export const store =  configureStore({
    reducer:{

        employee : GetEmployeeReducer,
        
    }
}

)