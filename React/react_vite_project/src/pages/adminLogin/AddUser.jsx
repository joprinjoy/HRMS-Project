import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postUserCredential } from '../../store/postAdmin';
import FormHelperText from '@mui/material/FormHelperText';
import {
    Dialog,
    DialogTitle,
    DialogContent,
   
  } from "@mui/material";
import PropTypes from 'prop-types';
import { UserData } from '../../store/getAdmin';

const AddUser = ({open,handleClose})=>{


    const InitialData = {
        username :"",
        password :"",
        
    }

    const [credential,setCredential] = useState(InitialData)
    const [errors,setErrors] = useState(null)


    const dispatch = useDispatch()

    const handleAddSuccess =()=>{
        setCredential(InitialData)
        dispatch(UserData())
        setErrors(null)
        handleClose()
    }
    const handleError=(data)=>{
        setErrors(data.status_message)

    }
    const handleCloseButton =()=>{
        setCredential(InitialData)
        setErrors(null)
        handleClose()
    }

    const handleAddDesignation =(e)=>{
        e.preventDefault();
      
        dispatch(postUserCredential(
            {credential:credential,
            successCB:handleAddSuccess,
            errorCB:handleError,
            
        }
        ))
        
        
    }

    return(
        <>
        
        
        <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
                >
                <DialogTitle id="form-dialog-title">Add User</DialogTitle>
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
                                    id="outlined-username-required"
                                    label="Username"
                                    placeholder="User Email"
                                    value={credential.username}
                                    onChange={(event)=>{setCredential({...credential,username:event.target.value})}}
                                    />
                                    <TextField
                                    required
                                    id="outlined-Password-required"
                                    label="Password"
                                    placeholder="Password"
                                    type='password'
                                    value={credential.password}
                                    onChange={(event)=>{setCredential({...credential,password:event.target.value})}}
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
export default AddUser