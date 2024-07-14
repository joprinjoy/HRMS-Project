import  {configureStore} from '@reduxjs/toolkit'
import GetEmployeeReducer from './getEmployee'
import {addEmployeeReducer,updateEmployeeReducer} from './postEmployee'
import GetDesignationReducer from './getDesignation'
import {PostDesignationReducer,DeleteDesignationReducer,UpdateDesignationReducer} from './postDesignation'
import PostLoginDataReducer from './postUserLogin'


export const store =  configureStore({
    reducer:{

        employee : GetEmployeeReducer,
        addEmployee:addEmployeeReducer,
        designation : GetDesignationReducer,
        addDesignation : PostDesignationReducer,
        deleteDesignation : DeleteDesignationReducer,
        updateEmployee : updateEmployeeReducer,
        updateDesignation : UpdateDesignationReducer,
        login:PostLoginDataReducer,
       
        

        
    }
})