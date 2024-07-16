import axios from "axios";

export const postEmployeeData =(employee,successCB,errorCB)=>{
    const url = `${import.meta.env.VITE_HRMS_BASE__URL}/addemployee`
    return(
        axios.post(url,employee).then(
            (res)=>{
                
                successCB()
                return res.data;
            },
            (error)=>{
                const errorData =error.response.data
                
                errorCB(errorData)
                
                return error;
            }
        )
        

    )
}

export const postEmployeeDataUpdate =(employee,successCB,errorCB)=>{
    
    const url = `${import.meta.env.VITE_HRMS_BASE__URL}/updateemployee`
    return(
        axios.put(url,employee).then(
            (res)=>{
                
                successCB()
                return res.data;
            },
            (error)=>{
                const errorData =error.response.data
                
                errorCB(errorData)
                
                return error;
            }
        )
        

    )
}