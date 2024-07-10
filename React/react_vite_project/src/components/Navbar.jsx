

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';

import { Link } from 'react-router-dom';

const pages = [
    {name:'Home',path:'/'},
    {name:'View Employee',path:'/viewemployee'},
    {name:'Admin Tools',path:'/admintools'},
    {name:'',path:'/dashboard'},
    
  ];
 

const NavBar =()=>{

    return(
    <>
      <AppBar position="static"  sx={{ bgcolor:'rgb(100, 112, 111)'}}>
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
            {pages.map((item,index) => (
              <Button
                key={index}
                component={Link}
                to={item.path}
                
                sx={{ my: 3, color: 'white', display: 'block' }}
              >
                {item.name}
              </Button>
            ))}
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