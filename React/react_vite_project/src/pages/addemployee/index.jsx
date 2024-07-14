import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import { PostAddEmployee } from '../../store/postEmployee';
import { useState } from 'react';




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
    const dispatch = useDispatch()


    const handleSuccess = ()=>{
        setEmployee(InitialData)
    }

    const handleAddEmployee = (e)=>{
        e.preventDefault();
        console.log("register")
        dispatch(PostAddEmployee({
            employee:employee,successCB:handleSuccess}
        ))



    }

    return(
        <>
           
        <h2>Add Employee</h2>

        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '60ch' },
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
                <TextField
                required
                id="outlined-phone-required"
                label="Designation"
                placeholder="Designation"
                value={employee.designation}
                onChange={(event)=>{setEmployee({...employee,designation:event.target.value})}}
                
                />
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

                {/* <TextField
                id="outlined-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                /> */}
                {/* <TextField
                id="outlined-read-only-input"
                label="Read Only"
                defaultValue="Hello World"
                InputProps={{
                    readOnly: true,
                }}
                />
                <TextField
                id="outlined-number"
                label="Number"
                type="number"
                InputLabelProps={{
                    shrink: true,
                }}
                />
                <TextField id="outlined-search" label="Search field" type="search" />

                <TextField
                id="outlined-helperText"
                label="Helper text"
                defaultValue="Default Value"
                helperText="Some important text"
                /> */}

                <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                    <Button variant="contained" onClick={handleAddEmployee }>Add Employee</Button>
                                        
                </Box>
            </div>
            
            
            </Box>

    
        </>
    )
}
export default AddEmployee