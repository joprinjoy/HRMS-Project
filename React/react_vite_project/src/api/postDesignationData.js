import axios from "axios";


export const PostAddDesignationData = (designation,successCB)=>{

    const url = `${import.meta.env.VITE_HRMS_BASE__URL}/adddesignation`
    return(
        axios.post(url,designation).then(
            (res)=>{
                console.log(res,"res")
                successCB()
                return res;
            },
            (error)=>{
                console.log(error,"errrrr")
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
                console.log(res,"res")
                successCB()
                return res;
            },
            (error)=>{
                console.log(error,"errrrr")
                return error;
            }
        )
        

    )
}

export const PostUpdateDesignationData =(designation,successCB)=>{

    const url = `${import.meta.env.VITE_HRMS_BASE__URL}/updatedesignation`
    return(
        axios.put(url,designation).then(
            (res)=>{
                console.log(res,"res")
                successCB()
                return res.data;
            },
            (error)=>{
                console.log(error,"errrrr")
                return error;
            }
        )
        

    )
}