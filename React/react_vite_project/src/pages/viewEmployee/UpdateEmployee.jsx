import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { EmployeeData } from '../../store/getEmployee';
import { PostUpdateEmployee } from '../../store/postEmployee';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

import {
    Dialog,
    DialogTitle,
    DialogContent,
   
  } from "@mui/material";


const UpdateEmployee = ({open,empId,handleClose})=>{
    
        const InitialData = {
            first_name :"",
            last_name : "",
            designation: "",
            phone : "",
            email : "",
            address : "",
            leaves_taken: ""
        }

        // const desigInitial ={id: "0", leaves_allottet: 0, name: 'select'}


    const [employee,setEmployee]= useState(InitialData)
    // const [designation,setDesignation]= useState(desigInitial)


    


    const dispatch = useDispatch()
    
    const employeeData = useSelector((state) => state.employee.data);
    const designationData = useSelector((state)=>state.designation.data)    


   
    console.log(employee.first_name)

    console.log(designationData, "desigdata ");


    useEffect(() => {
    

        if (employeeData.length>0) {
            
            const employeeToUpdate = employeeData.find((emp) => emp.id === empId);
            if (employeeToUpdate) {

                setEmployee(employeeToUpdate);


            }
            

        }
    // setDesignation(designationData)

        // const des = employeeData.reduce((acc, emp) => {
        //     acc[emp.designation] = emp.designation;
        //     return acc;
        //   }, {});
        //   setDesignation(des)

    }, [employeeData, empId]);


    


    const handleSuccess = ()=>{
        handleClose()
    }

    const handleAddEmployee = ()=>{
        dispatch(PostUpdateEmployee({
            employee:employee,
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
                value={employee.id || ""}
                />
            
                

                <TextField
                required
                id="outlined-required"
                label="First Name"
                value={employee.first_name}
                onChange={(event)=>{setEmployee({...employee,first_name:event.target.value})}}
                
                />
                
                <TextField
                required
                id="outlined-required"
                label="Last Name"
                placeholder="Last Name"
                value={employee.last_name}
                onChange={(event)=>{setEmployee({...employee,last_name:event.target.value})}}
                
                />
                {/* <TextField
                required
                id="outlined-required"
                label="Designation"
                placeholder="Designation"
                value={employee.designation}
                onChange={(event)=>{setEmployee({...employee,designation:event.target.value})}}
                
                /> */}

                <FormControl >
                <InputLabel id="designation-label">Designation</InputLabel>
                <Select sx={{width: '60ch'}}
                  labelId="designation-label"
                  id="designation-select"
                  value={employeeData.designation}
                  label="Designation"
                //   onChange={handleDesignationChange}
                onChange={(event)=>{setEmployee({...employee,designation:event.target.value})}}
                >
                  {Object.entries(designationData).map(([key, value]) => (
                    <MenuItem key={key} value={value.name}>
                        {value.name}</MenuItem>
                  ))}
                </Select>
                 </FormControl>


                <TextField
                required
                id="outlined-required"
                label="Phone"
                type='phone'
                placeholder="Phone"
                value={employee.phone}
                onChange={(event)=>{setEmployee({...employee,phone:event.target.value})}}
                
                />
                <TextField
                required
                id="outlined-required"
                label="Email"
                type='email'
                placeholder="Email Id"
                value={employee.email}
                onChange={(event)=>{setEmployee({...employee,email:event.target.value})}}
                
                />
                <TextField
                required
                id="outlined-address-required"
                multiline
                maxRows={4}
                label="Address"
                type='address'
                placeholder="Address"
                value={employee.address}
                onChange={(event)=>{setEmployee({...employee,address:event.target.value})}} 
                />
                
                 <TextField
                required
                id="outlined-Leaves_taken-required"
                label="Leaves Taken"
                placeholder="Leaves_taken"
                type='number'
                value={employee.leaves_taken}
                onChange={(event)=>{setEmployee({...employee,leaves_taken:event.target.value})}}
                
                />
                

                <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                 <Button variant="contained" onClick={handleAddEmployee }>Update</Button>
                <Button onClick={()=>handleClose()} color="success">Cancel</Button>
                </Box>
            
            
            </Box>

            </DialogContent>
            </Dialog>

        </>
    )
}
export default UpdateEmployee