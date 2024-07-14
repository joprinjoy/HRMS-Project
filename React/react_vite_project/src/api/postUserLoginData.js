import axios from "axios";

export const postUserLoginData = (credential)=>{
    
    const url = `${import.meta.env.VITE_HRMS_BASE__URL}/login`

    return(
        axios.post(url,credential).then(

            (res)=>{
                console.log(res)
                return res;
            },
            (error)=>{
                console.log(error,"errrr")
                return error;
            }
        )
        
    )
}