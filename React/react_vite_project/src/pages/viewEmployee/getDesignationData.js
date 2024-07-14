// import axios from "axios";
// import { useEffect, useState } from "react";

// export function GetEmployee(pageNo, pageSize){
//     const [loading, setLoading] = useState(false);
//     const [data, setData] = useState(null);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const controller = new AbortController();

//         setLoading(true);
//         const url = `${import.meta.env.VITE_HRMS_BASE__URL}/designation`
//         axios.get(url,{
//             signal: controller.signal
//         }).then(
//             (res)=>{
                
//                 if(res && res.status== 200){
//                     setData(res.data)
//                 }
//             },
//             (error)=>{
//                 setError(error)
//             }
//         ).finally(() => setLoading(false))

//         return () => {
//             controller.abort()
//         }
//     },[])

//     return {
//         loading, data, error
//     }
// }