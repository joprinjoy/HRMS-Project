import axios from "axios";

export const postEmployeeData =(employee,successCB)=>{
    const url = `${import.meta.env.VITE_HRMS_BASE__URL}/addemployee`
    return(
        axios.post(url,employee).then(
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

export const postEmployeeDataUpdate =(employee,successCB)=>{
    const id = employee.id
    console.log(id)
    const url = `${import.meta.env.VITE_HRMS_BASE__URL}/updateemployee/${id}`
    return(
        axios.put(url,employee).then(
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