import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { PostUpdateDesignation } from '../../store/postDesignation';
import FormHelperText from '@mui/material/FormHelperText';
import PropTypes from 'prop-types';



import {
    Dialog,
    DialogTitle,
    DialogContent,
   
  } from "@mui/material";


const UpdateDesignation = ({open,id,handleClose})=>{
    UpdateDesignation.propTypes ={
        open:PropTypes.bool.isRequired,
        handleClose:PropTypes.func,
        id:PropTypes.number,
    }
    

    const desigInitial ={id: '', leaves_allotted: '', name: ''}
    const [designation,setDesignation]= useState(desigInitial)
    const[errors,setErrors] = useState(null)

    const dispatch = useDispatch()
    
    const designationData = useSelector((state)=>state.designation.data)    

    useEffect(()=>{
        if (designationData){
            const designationToUpdate = designationData.find((des)=> des.id == id )
            if(designationToUpdate){
                setDesignation(designationToUpdate)
            }
        }
        
    },[id,designationData])

   
    

    


    const handleSuccess = ()=>{
        setErrors(null)
        handleClose()
    }
    const handleError = (data)=>{
        setErrors(data.status_message)
    }

    const handleUpdateEmployee = ()=>{
        dispatch(PostUpdateDesignation({
            designation:designation,
            successCB:handleSuccess,
            errorCB:handleError
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
                id="outlined-name-required"
                label="Name"
                type='text'
                placeholder="Name"
                value={designation.name}
                onChange={(event)=>{setDesignation({...designation,name:event.target.value})}}
                
                />
                 <TextField
                required
                id="outlined-leaves-required"
                label="Leaves Allotted"
                type='number'
                placeholder="Leaves Allotted"
                value={designation.leaves_allotted}
                onChange={(event)=>{setDesignation({...designation,leaves_allotted:event.target.value})}}
                
                />
               <FormHelperText error sx={{ ml:2,mb:5 }}>
                                {errors}
                                </FormHelperText>
                

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