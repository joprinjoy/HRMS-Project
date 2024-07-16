import axios from "axios";


export const PostAddDesignationData = (designation,successCB,errorCB)=>{

    const url = `${import.meta.env.VITE_HRMS_BASE__URL}/adddesignation`
    return(
        axios.post(url,designation,errorCB).then(
            (res)=>{
                successCB()
                return res;
            },
            (error)=>{
                const resp = error.response.data
                errorCB(resp)
                return error;
            }
        )
        

    )
}

export const PostDeleteDesignationData = ({id,successCB})=>{

    const url = `${import.meta.env.VITE_HRMS_BASE__URL}/deletedesigantion`
    return(
        axios.post(url,{id}).then(
            (res)=>{
                
                successCB()
                return res.data.data;
            },
            (error)=>{
                
                return error;
            }
        )
        

    )
}

export const PostUpdateDesignationData =(designation,successCB,errorCB)=>{

    const url = `${import.meta.env.VITE_HRMS_BASE__URL}/updatedesignation`
    return(
        axios.put(url,designation).then(
            (res)=>{
                
                successCB()
                return res.data;
            },
            (error)=>{
                
                const resp = error.response.data 
                errorCB(resp)
                return error;
            }
        )
        

    )
}