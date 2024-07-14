
import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';




const NavBar =()=>{



const settings = [{name:'View Designations',path:'/viewdesignation'},
                  {name:'Add Employee',path:'/addemployee'}]

const [anchorElUser, setAnchorElUser] = useState(null);

const handleOpenUserMenu = (event) => {
  setAnchorElUser(event.currentTarget);
};
const handleCloseUserMenu = () => {
  setAnchorElUser(null);
};

    return(
    <>
      <AppBar position="static"   sx={{ bgcolor:'rgb(100, 112, 111)'}}>
      <Container maxWidth="xl" >
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
                to={'/'}
                
                sx={{ my: 3, color: 'white', display: 'block' }}
              >
                Home
              </Button>
           
            
              <Button
                
                component={Link}
                to={'/viewemployee'}
                
                sx={{ my: 3, color: 'white', display: 'block' }}
              >
                View Employee
              </Button>
            
          
            <Tooltip title="Open settings">
              <Button onClick={handleOpenUserMenu} 
              sx={{ my: 3, color: 'white', display: 'block' }}>
                Admin Tools
              </Button>
            </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                  {settings.map((item,index) => (

                    <MenuItem key={index} component = {Link} to ={item.path} onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">{item.name}</Typography>
                    </MenuItem>
                  ))}

              </Menu>     
            
          </Box>




          

          <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="More Options">
                    <IconButton  sx={{ p: 0 }}>
                        <Avatar alt="Joprin" src="jehjehfjehej" />
                    </IconButton>
                </Tooltip>

                
          </Box>
        </Toolbar>
      </Container>
      </AppBar>
     
      
    </>
    )
}
export default NavBar;