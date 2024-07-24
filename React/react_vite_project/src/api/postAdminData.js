import axios from "axios";

export const postCredentialData  = (credential,successCB,errorCB)=>{
    const url = `${import.meta.env.VITE_HRMS_BASE__URL}/registeruser`
    
    return(
        axios.post(url,credential).then(
            (res)=>{
                successCB()
                return res
            },
            (error)=>{
                errorCB(error.response.data)
                console.log(error.response.data);
                return error
            }
        )
    )
}