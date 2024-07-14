import { Password } from '@mui/icons-material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import { useState } from 'react';

import { useDispatch } from 'react-redux';
import FormHelperText from '@mui/material/FormHelperText';
import { useNavigate } from 'react-router-dom';
import {postUserLogin} from '../../store/postUserLogin';





const Home = ()=>{
    const initialData = {username:"",
                        password:""
    }

    const [credential,setCredential]= useState(initialData)
    const [user,setUser] = useState("default")
    const [errors, setErrors] = useState(null);
    // const [isFormValid, setIsFormValid] = useState(false);

    const employeeBoxStyled = {
        height: 600,
        
        my: 4,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex',
        gap: 5,
        p: 10,
        border: '2px solid grey',
        borderRadius: 4,
        boxShadow: 3,
      };    

    const navigate = useNavigate()
    const dispatch = useDispatch()

    // const handleSuccess=()=>{
    //     setCredential(initialData)
    //    navigate('/viewemployee') 
    // }

    // const handleError = (data)=>{
    //     console.log("data",data)
    //     setErrors(data)
    // }

    const handleLogin = ()=>{

        dispatch(postUserLogin(credential))
        console.log(credential,"credjsx")
        console.log('login')
    }


    

    return (
        <>
        <Box  sx={employeeBoxStyled}>

            <Typography variant="h4" component="h4">
            Login
            </Typography>

            <Box 
            component="form"
            sx={{'& .MuiTextField-root': { m: 1, width: '60ch' },}}
            noValidate
            autoComplete="off">
                <Box>
            <TextField
                required
                
                id="username-required"
                label="Username"
                type='email'
                placeholder="Username"
                value={credential.username}
                helperText="Email Id"
                onChange={(event)=>{setCredential({...credential,username:event.target.value})
               
            }}
                
                />

            <TextField
                required
                id="password-required"
                label="Password"
                type='Password'
                placeholder="Password"
                value={credential.password}
                
                onChange={(event)=>{setCredential({...credential,password:event.target.value})}}
                
                />
            </Box>

            <FormHelperText error sx={{ mt: 2 }}>
                                {errors}
                                </FormHelperText>
             </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                    <Button variant="contained" onClick={handleLogin }>Login</Button>
                                        
            </Box>

        </Box>
        </>
    )
}
export default Home