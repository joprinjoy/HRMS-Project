import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch} from 'react-redux';
import FormHelperText from '@mui/material/FormHelperText';
import { useNavigate } from 'react-router-dom';
import {postUserLogin} from '../../store/postUserLogin';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';





const Home = ()=>{
    const initialData = {username:"",
                        password:""
    }

    const [credential,setCredential]= useState(initialData)
    const [errors, setErrors] = useState(null);
    const [userData,setUserData] = useState(null)
    
    // setting instance of create theme ,to get effect in the login form page
    const defaultTheme = createTheme();
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleSuccess=(data)=>{
        setCredential(initialData)
        
        
        //setting user details in local storage
        localStorage.setItem('user', JSON.stringify(data))
        navigate('/viewemployee') 
    }

    const handleError = (data)=>{

        setErrors(data.status_message)
    }

    useEffect(
        ()=>{
            let user =localStorage.getItem('user')
            if (user) {
                user = JSON.parse(user);
                setUserData(user);
            }
            if (userData){
                navigate('/viewemployee')
            }
    },[navigate,userData])

    const handleLogin = ()=>{
        
        dispatch(postUserLogin({    
            credential:credential,
            successCB:handleSuccess,
            errorCB:handleError,

        }))    
    }


    
    return (
        <>
        
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                {/* Left Grid with Background Image */}
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url("https://3.imimg.com/data3/IU/NA/MY-4439715/hrms-500x500.jpg")',
                        backgroundColor: (t) => t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'left',
                    }}
                />
                {/* Right Grid with Login Form */}
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Grid
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        sx={{ height: '100%' }}
                    >
                        <Grid item alignItems="center" sx={{ mt: 8 }}>
                            <IconButton  sx={{ flex:1}}>
                                <Avatar sx={{ mb:5,width: 80, height: 80, bgcolor: 'secondary.main' }}>
                                
                                    <LockOutlinedIcon />
                                </Avatar>
                            </IconButton>
                            <Typography component="h1" variant="h5">
                                Sign in
                            </Typography>
                            <Box component="form" noValidate sx={{ mt: 1, width: '100%' }}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                    value={credential.username}
                                    onChange={(event) => setCredential({ ...credential, username: event.target.value })}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    value={credential.password}
                                    onChange={(event) => setCredential({ ...credential, password: event.target.value })}
                                />
                                <Button
                                    type="button"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    onClick={handleLogin}
                                >
                                    Sign In
                                </Button>
                                <FormHelperText error sx={{ mt: 2 }}>
                                    {errors}
                                </FormHelperText>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </ThemeProvider>
        
        </>
           )  
}
export default Home