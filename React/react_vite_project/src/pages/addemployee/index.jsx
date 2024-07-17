import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useDispatch,useSelector } from 'react-redux';
import { PostAddEmployee } from '../../store/postEmployee';
import { useEffect, useState } from 'react';

import { DesignationData } from '../../store/getDesignation';

import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';

const AddEmployee = ()=>{
        const InitialData = {
            first_name :"",
            last_name : "",
            designation: "",
            phone : "",
            email : "",
            address : ""
        }

    const [employee,setEmployee]= useState(InitialData)
    const[errors,setErrors]=useState(null)
    const dispatch = useDispatch()
    const designationData = useSelector((state)=>state.designation.data)  

    

    useEffect( 
        ()=>{
            if(designationData.length<1){
                dispatch(DesignationData ())
            }
        }
    )


    const handleSuccess = ()=>{
        setEmployee(InitialData)
        setErrors(null)
    }
    const handleError = (data)=>{
        
        setErrors(data.status_message)
    }

    const handleAddEmployee = (e)=>{
        e.preventDefault();
        
        dispatch(PostAddEmployee({
            employee:employee,
            successCB:handleSuccess,
            errorCB:handleError,
        }
        ))



    }

    return(
        <>
           
        <h2>Add Employee</h2>

        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '60ch' },
                '& .MuiFormControl-root': { m: 1, width: '60ch' }
            }}
            noValidate
            autoComplete="off"
            >
            <div>
                <TextField
                required
                id="outlined-firstn-required"
                label="First Name"
                placeholder="First Name"
                value={employee.first_name}
                onChange={(event)=>{setEmployee({...employee,first_name:event.target.value})}}
                
                />
                
                <TextField
                required
                id="outlined-lastn-required"
                label="Last Name"
                placeholder="Last Name"
                value={employee.last_name}
                onChange={(event)=>{setEmployee({...employee,last_name:event.target.value})}}
                
                />
               
                <FormControl>
                <InputLabel id="designation-label">Designation</InputLabel>
                <Select 
                  labelId="designation--label"
                  value={employee.designation}
                  label="Designation"
                onChange={(event)=>{setEmployee({...employee,designation:event.target.value})}}
                >
                  {designationData.map((item,index) => (
                    <MenuItem key={index} value={item.name}>
                        {item.name}</MenuItem>
                  ))}
                </Select>
                </FormControl>
                
                <TextField
                required
                id="outlined-phone-required"
                label="Phone"
                type='phone'
                placeholder="Phone"
                value={employee.phone}
                onChange={(event)=>{setEmployee({...employee,phone:event.target.value})}}
                
                />
                <TextField
                required
                id="outlined-email-required"
                label="Email"
                type='email'
                placeholder="Email Id"
                value={employee.email}
                onChange={(event)=>{setEmployee({...employee,email:event.target.value})}}
                
                />
                <TextField
                required
                id="outlined-address-required"
                label="Address"
                type='address'
                placeholder="Address"
                value={employee.address}
                onChange={(event)=>{setEmployee({...employee,address:event.target.value})}}
                
                />
                <FormHelperText error sx={{ ml:25,mt:5, fontSize:16}}>
                                {errors}
                                </FormHelperText>

                <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                    <Button variant="contained" onClick={handleAddEmployee }>Add Employee</Button>
                                        
                </Box>
            </div>
            
            
            </Box>

    
        </>
    )
}
export default AddEmployee