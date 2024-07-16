import axios from "axios";

export const getDesignationData=()=>{
    const url = `${import.meta.env.VITE_HRMS_BASE__URL}/designation`
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