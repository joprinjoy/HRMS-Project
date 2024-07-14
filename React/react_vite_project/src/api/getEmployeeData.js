
import axios from "axios";

export const getEmployeeData =()=>{
    const url = `${import.meta.env.VITE_HRMS_BASE__URL}/employee`
    return(
        axios.get(url).then(
            (res)=>{
                console.log(res,"res")
                return res.data;
            },
            (error)=>{
                console.log(error,"errrrr")
                return error;
            }
        )
        

    )
}



