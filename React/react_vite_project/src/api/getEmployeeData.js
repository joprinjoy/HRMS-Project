
import axios from "axios";

export const getEmployeeData =()=>{
    const url = `${import.meta.env.VITE_HRMS_BASE__URL}/employee`
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



