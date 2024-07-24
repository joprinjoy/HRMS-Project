
import { useSelector,useDispatch} from "react-redux"
import { useEffect, useState } from "react"
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ButtonGroup from '@mui/material/ButtonGroup';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import AddIcon from '@mui/icons-material/Add';
import { UserData } from "../../store/getAdmin";

const AdminHome = ()=>{

    const userData = useSelector((state)=>state.user.data)

    const dispatch = useDispatch()

    useEffect(
        ()=>{
            dispatch(UserData())
        },[dispatch]
    )



    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: theme.palette.common.black,
          color: theme.palette.common.white,
          fontSize:20,
          
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 16,
        },
      }));
      
      const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
          border: 0,
        },
      }));


    return (
        <>
        <h2> Registered Users</h2>
        {/* <Stack direction="row" spacing={2}>
      
            <IconButton aria-label="Add Designation" size="Large" title="Add New " onClick={handleOpenAddDesignation}>
                        <AddIcon fontSize="large" />
            </IconButton>
      </Stack> */}
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700,  }} aria-label="Designation view">
        <TableHead>
          <TableRow>
          <StyledTableCell align="center">Id</StyledTableCell>
            <StyledTableCell align="center">Users</StyledTableCell>
            <StyledTableCell align="center">Role</StyledTableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {userData.map((item,index) => (
            <StyledTableRow key={index}>
              <StyledTableCell align="center">{item.id}</StyledTableCell>
              <StyledTableCell align="center">{item.username}</StyledTableCell>
              <StyledTableCell align="center">{item.role}</StyledTableCell>
              {/* <StyledTableCell align="center"> */}

                {/* <ButtonGroup variant="text" aria-label="Basic button group" >                                  */}
                  {/* <Button title="Edit Row"  onClick={()=>handleUpdate(item.id)}>
                    <ModeEditOutlineIcon fontSize="large" sx={{ color: 'rgb(78, 77, 78)' }} />
                  </Button> */}
                          
                  {/* <Button title="Delete Row" onClick={()=>handleDelete(item.id)} >
                    <DeleteIcon  fontSize="large" sx={{ color: 'rgb(182, 67, 67)'  }} />
                  </Button> */}
                {/* </ButtonGroup> */}
              {/* </StyledTableCell> */}

            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>


        </>
    )
}

export default AdminHome