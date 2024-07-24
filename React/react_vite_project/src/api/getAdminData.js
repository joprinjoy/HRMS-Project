import axios from "axios";

export const getUserData =()=>{
    const url = `${import.meta.env.VITE_HRMS_BASE__URL}/user`
    return(
        axios.get(url).then(
            (res)=>{
                return res.data.data;
            },
            (error)=>{
                
                return error;
            }
        )
        

    )
}
