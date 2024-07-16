import axios from "axios";

export const postUserLoginData = (credential,successCB,errorCB  )=>{
    
    const url = `${import.meta.env.VITE_HRMS_BASE__URL}/login`
    
    return(
        axios.post(url,credential).then(
            (res)=>{
                
                const data = res.data.data
                successCB(data)
                return res.response;
            },
            (error)=>{
                
                const resp = error.response.data 
                
                errorCB(resp)
                return error.response;
            }
        )
        
    )
}