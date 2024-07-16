import { useEffect, useState } from "react"
import { useSelector,useDispatch } from "react-redux"
import { EmployeeData } from "../../store/getEmployee"
import { DesignationData } from "../../store/getDesignation"
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import UpdateEmployee from "./UpdateEmployee";
import ViewDetails from "../ViewDetails";
import axios from "axios";


import Box from '@mui/material/Box';



const ViewEmployee = ()=>{


    const [openUpdateEmployee,setopenUpdateEmployee] = useState(false)
    const [openEmployeeView,setOpenEmployeeView] = useState(false)
    const [employeeId,setEmployeeId] = useState(null)
   
    const dispatch = useDispatch()
    const employeeDatas = useSelector((state)=> state.employee.data)


    useEffect (()=>{
        dispatch(EmployeeData())
        dispatch(DesignationData())
        

    },[dispatch])


    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: theme.palette.common.black,
          color: theme.palette.common.white,
          fontSize:18
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 18,
        },
          [`& .hover-button`]: {
          
          background: 'none',
          border: 'none',
          color : 'inherit',
          padding: 0,
          font: 'inherit',
          cursor: 'pointer',
          textDecoration: 'none',
        },
        [`& .hover-button:hover`]: {
          textDecoration: 'none',
          color : 'blue',
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
      
      const handleCloseUpdateEmployee = ()=>{
          setopenUpdateEmployee(false)
          dispatch(EmployeeData())
      }

      const handleSuccess = ()=>{
        dispatch(EmployeeData())
      }


      const handleDelete = (id)=>{
      const url = `${import.meta.env.VITE_HRMS_BASE__URL}/delete/employee`

        
        const employeeId ={id:id}
        axios.post(url,employeeId).then(
          (res)=>{
            
            handleSuccess()
            return res
          },
          (error)=>{
            return error
          }
        )
   
     }
  
  
     const handleUpdate = (id)=>{
        setEmployeeId(id)

        setopenUpdateEmployee(true)   
      } 

   const handleOpenView = (id)=>{
      setEmployeeId(id)
      

      setOpenEmployeeView(true)
   }

   const handleCloseView = ()=>{
    
      setOpenEmployeeView(false)
   }
   

    return(
      
        <> 
        <Box>
            
        </Box>

        <TableContainer component={Paper} sx={{ minWidth: '100%'}}>
      <Table sx={{ minWidth: '100%'  }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Sl.No</StyledTableCell>
            <StyledTableCell align="center">Employee ID</StyledTableCell>
            <StyledTableCell align="center">Name</StyledTableCell>
            <StyledTableCell align="center">Designation</StyledTableCell>
            <StyledTableCell align="center">Phone</StyledTableCell>
            <StyledTableCell align="center">Email</StyledTableCell>
            <StyledTableCell align="center">Leave Status</StyledTableCell>
            <StyledTableCell align="center">Actions</StyledTableCell>
            


          </TableRow>
        </TableHead>
        <TableBody>
          {employeeDatas.map((item,index) => (
            <StyledTableRow key={index}>
              <StyledTableCell align="center" component="th" scope="row">
                {index+1}
              </StyledTableCell>
              <StyledTableCell align="center">{item.id}</StyledTableCell>
              <StyledTableCell align="center"><Button onClick={()=>{handleOpenView(item.id)}} className="hover-button">{item.first_name +" "+ item.last_name}</Button></StyledTableCell>
              <StyledTableCell align="center">{item.designation}</StyledTableCell>
              <StyledTableCell align="center">{item.phone}</StyledTableCell>
              <StyledTableCell align="center">{item.email}</StyledTableCell>
              
              <StyledTableCell align="center">{item.leaves_taken !== null ? item.leaves_taken : 0}/{item.leaves_allotted}</StyledTableCell>


              <StyledTableCell align="center">

                <ButtonGroup variant="text" aria-label="Basic button group" >                                 
                  <Button title="Edit Row"  onClick={()=>{handleUpdate(item.id)}}>
                    <ModeEditOutlineIcon fontSize="large" sx={{ color: 'rgb(78, 77, 78)' }} />
                  </Button>
                          
                  <Button title="Delete Row" onClick={()=>handleDelete(item.id)} >
                    <DeleteIcon  fontSize="large" sx={{ color: 'rgb(182, 67, 67)'  }} />
                  </Button>
                </ButtonGroup>

                
              </StyledTableCell>
              
            </StyledTableRow>
          ))}
          
        </TableBody>
      </Table>
    </TableContainer>

    <UpdateEmployee
                    open={openUpdateEmployee}
                    empId = {employeeId}
                    handleClose = {handleCloseUpdateEmployee }
                    
                    />
                    <ViewDetails
                    open={openEmployeeView}
                    empId = {employeeId}
                    handleClose = {handleCloseView}
                    
                    />
        </>
    )
}
export default ViewEmployee