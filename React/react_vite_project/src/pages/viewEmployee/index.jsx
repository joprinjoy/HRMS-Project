import { useEffect } from "react"
import { useSelector,useDispatch } from "react-redux"
import { EmployeeData } from "../../store/getEmployee"
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const ViewEmployee = ()=>{


    const dispatch = useDispatch()
    const employeeDatas = useSelector((state)=> state.employee.data)
    console.log(employeeDatas,"employeedata.jsx")

    useEffect (()=>{
        dispatch(EmployeeData())
    },[dispatch])


    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: theme.palette.common.black,
          color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
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
      
      function createData(name, calories, fat, carbs, protein) {
        return { name, calories, fat, carbs, protein };
      }

    return(
        <>
       

        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700,  }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Sl.No</StyledTableCell>
            <StyledTableCell align="center">Employee ID</StyledTableCell>
            <StyledTableCell align="center">Name</StyledTableCell>
            <StyledTableCell align="center">Designation</StyledTableCell>
            <StyledTableCell align="center">Phone</StyledTableCell>
            <StyledTableCell align="center">Email</StyledTableCell>
            


          </TableRow>
        </TableHead>
        <TableBody>
          {employeeDatas.map((item,index) => (
            <StyledTableRow key={index}>
              <StyledTableCell component="th" scope="row">
                {index+1}
              </StyledTableCell>
              <StyledTableCell align="right">{item.id}</StyledTableCell>
              <StyledTableCell align="right">{item.first_name}</StyledTableCell>
              <StyledTableCell align="right">{item.designation}</StyledTableCell>
              <StyledTableCell align="right">{item.phone}</StyledTableCell>
              <StyledTableCell align="right">{item.email}</StyledTableCell>

            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>


        </>
    )
}
export default ViewEmployee