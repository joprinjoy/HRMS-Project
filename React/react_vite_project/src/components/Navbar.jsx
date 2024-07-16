
import { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import MenuIcon from '@mui/icons-material/Menu';









const NavBar =()=>{





const settings = [{name:'View Designations',path:'/viewdesignation'},
                    {name:'Add Employee',path:'/addemployee'}]

const [anchorElAdmin, setAnchorElAdmin] = useState(null);

// const [anchorElUser, setAnchorElUser] = useState(null);
const[userData,setUserData]= useState({})
const [open, setOpen] = useState(false);

const toggleDrawer = (newOpen) => () => {
  setOpen(newOpen);
};


const handleDrawerOpen = () => {
  setOpen(true);
};



useEffect(()=>{
  let user =localStorage.getItem('user')
  if (user) {
    user = JSON.parse(user);
    setUserData(user);
    
  }
},[])



const navigate = useNavigate()

const handleOpenAdminMenu = (event) => {
  setAnchorElAdmin(event.currentTarget);
};
const handleCloseAdminMenu = () => {
  setAnchorElAdmin(null);
};


const handleLogout=()=>{
 
  const url = `${import.meta.env.VITE_HRMS_BASE__URL}/logout`

    return(
      axios.post(url).then(
        (res)=>{
         
          localStorage.removeItem('user');
          setUserData(null)
          navigate('/')

          return res;
        },
        (error)=>{
          return error
        }

      ))

}




    const DrawerList = (
          <Box sx={{ width: 400 }} role="presentation" onClick={toggleDrawer(false)}>
            <List>
                
                <ListItem  disablePadding >
                <Tooltip >
                     <IconButton  sx={{ flex:1}}>
                            <Avatar alt="HR" src={userData.user} sx={{ width: 80, height: 80 }}/>
                    </IconButton>
            </Tooltip>
                </ListItem>
                <ListItem  disablePadding>
                    <Typography textAlign="center" sx={{ flex:1 }}variant="h5" >{userData.user}</Typography> 
                </ListItem>
            </List>
            <Divider />
            <List>
              
                <ListItem  disablePadding>
                  <ListItemButton onClick={handleLogout} >
                    Logout
                  </ListItemButton>
                </ListItem>

                <ListItem  disablePadding>
                  <ListItemButton  >
                    FAQ
                  </ListItemButton>
                </ListItem>
              
            </List>
          </Box>
    );

    return(
    <>
      <Box sx={{ bgcolor:'rgb(100, 112, 111)'}}>  </Box>
      <AppBar position="static"   sx={{ bgcolor:'rgb(100, 112, 111)'}} >
      <Container maxWidth="xxl" >
        <Toolbar disableGutters>

          <Typography
            variant="h5"
            noWrap
            component="a"
            href="https://github.com/joprinjoy"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              
              textDecoration: 'none',
            }}
          >
            HRMS
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
            > 
            </IconButton>
          </Box>
     
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Button
                component={Link}
                to={'/viewemployee'}
                sx={{ my: 3, color: 'white', display: 'block' }}
              >
                View Employee
              </Button>
          
            <Tooltip title="Open settings">
              <Button onClick={handleOpenAdminMenu} 
                       sx={{ my: 3, color: 'white', display: 'block' }}>
                      Admin Tools
              </Button>
            </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElAdmin}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElAdmin)}
                onClose={handleCloseAdminMenu}
              >
                  {settings.map((item,index) => (

                    <MenuItem key={index} component = {Link} to ={item.path} onClick={handleCloseAdminMenu}>
                      <Typography textAlign="center">{item.name}</Typography>
                    </MenuItem>
                  ))}

              </Menu>     
            
          </Box>

          <div>
              
              <Drawer anchor="right"  open={open} onClose={toggleDrawer(false)}>
              {DrawerList}
              </Drawer>
          </div>
          <Toolbar>
          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }} component="div">
            {userData.user}
          </Typography>
          <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="end"
                onClick={handleDrawerOpen}
                sx={{ ...(open && { display: 'none' }) }}
              >
            <MenuIcon />
          </IconButton>
        </Toolbar>

                
          
        </Toolbar>
      </Container>
      
      </AppBar>
      
    </>
    )
}
export default NavBar;