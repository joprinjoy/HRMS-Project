import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { PostAddDesignation, } from '../../store/postDesignation';
import FormHelperText from '@mui/material/FormHelperText';
import {
    Dialog,
    DialogTitle,
    DialogContent,
   
  } from "@mui/material";



const AddDesignation = ({ open, handleClose })=>{


        const InitialData = {
            name :"",
            leaves_allotted : "",
            
        }

        const [designation,setDesignation] = useState(InitialData)
        const [errors,setErrors] = useState(null)


        const dispatch = useDispatch()

        const handleAddSuccess =()=>{
            setDesignation(InitialData)
            setErrors(null)
            handleClose()
        }
        const handleError=(data)=>{
            setErrors(data.status_message)

        }
        const handleCloseButton =()=>{
            setDesignation(InitialData)
            setErrors(null)
            handleClose()
        }

        const handleAddDesignation =(e)=>{
            e.preventDefault();
          
            dispatch(PostAddDesignation(
                {designation:designation,
                successCB:handleAddSuccess,
                errorCB:handleError,
                
            }
            ))
            
            
        }


    return (
        <>

            

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
                >
                <DialogTitle id="form-dialog-title">Add Designation</DialogTitle>
                    <DialogContent>

                        <Box
                         component="form"
                         sx={{
                        '& .MuiTextField-root': { m: 2, width: '50ch' },
                         }}
                         noValidate
                         autoComplete="off"
                          >
                            <div>
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Designation Name"
                                    placeholder="Designation Name"
                                    value={designation.name}
                                    onChange={(event)=>{setDesignation({...designation,name:event.target.value})}}
                                    />
                                    <TextField
                                    required
                                    id="outlined-required"
                                    label="Leaves Allotted"
                                    placeholder="Leaves Allotted"
                                    value={designation.leaves_allotted}
                                    onChange={(event)=>{setDesignation({...designation,leaves_allotted:event.target.value})}}
                                    />
                                    <FormHelperText error sx={{ ml:2}}>
                                    {errors}
                                    </FormHelperText> 

                                    <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                                        <Button variant="contained" onClick={handleAddDesignation}>Add </Button>
                                        <Button onClick={handleCloseButton} color="success">Cancel</Button>
                                    </Box>
                            </div>   
                                                                          
                        </Box>
                          
                    </DialogContent>                    
            </Dialog>

        </>
    )
}
export default AddDesignation