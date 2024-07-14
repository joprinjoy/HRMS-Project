import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { PostUpdateDesignation } from '../../store/postDesignation';


import {
    Dialog,
    DialogTitle,
    DialogContent,
   
  } from "@mui/material";


const UpdateDesignation = ({open,id,handleClose})=>{
    
    

    const desigInitial ={id: '', leaves_allotted: '', name: ''}


    
    const [designation,setDesignation]= useState(desigInitial)

    const dispatch = useDispatch()
    
    // const employeeData = useSelector((state) => state.employee.data);
    const designationData = useSelector((state)=>state.designation.data)    

    useEffect(()=>{
        if (designationData){
            const designationToUpdate = designationData.find((des)=> des.id == id )
            if(designationToUpdate){
                setDesignation(designationToUpdate)
            }
        }
        
    },[id,designationData])

   
    

    console.log(designationData, "desigdata ");


   
    // setDesignation(designationData)

        // const des = employeeData.reduce((acc, emp) => {
        //     acc[emp.designation] = emp.designation;
        //     return acc;
        //   }, {});
        //   setDesignation(des)

    // }, [employeeData, empId]);


    


    const handleSuccess = ()=>{
        handleClose()
    }

    const handleUpdateEmployee = ()=>{
        dispatch(PostUpdateDesignation({
            designation:designation,
            successCB:handleSuccess
        }))
        
    }

    return (

        <>  

        <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
                >
                <DialogTitle id="form-dialog-title">Update Employee</DialogTitle>
                    <DialogContent>

        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '60ch' },
                '& .MuiFormControl-root': { m: 1, width: '60ch' }
                
            }}
            noValidate
            autoComplete="off"
            >
            
                <TextField
                disabled
                id="outlined-disabled"
                label="ID"
                value={designation.id || ""}
                />
            

                <TextField
                required
                id="outlined-required"
                label="Name"
                type='text'
                placeholder="Name"
                value={designation.name}
                onChange={(event)=>{setDesignation({...designation,name:event.target.value})}}
                
                />
                 <TextField
                required
                id="outlined-required"
                label="Leaves Allotted"
                type='number'
                placeholder="Leaves Allotted"
                value={designation.leaves_allotted}
                onChange={(event)=>{setDesignation({...designation,leaves_allotted:event.target.value})}}
                
                />
               
                

                <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                 <Button variant="contained" onClick={handleUpdateEmployee}>Update</Button>
                <Button onClick={()=>handleClose()} color="success">Cancel</Button>
                </Box>
            
            
            </Box>

            </DialogContent>
            </Dialog>

        </>
    )
}
export default UpdateDesignation