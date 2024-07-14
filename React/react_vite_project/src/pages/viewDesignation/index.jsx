import { DesignationData } from "../../store/getDesignation"
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
import AddDesignation from "./AddDesignation";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ButtonGroup from '@mui/material/ButtonGroup';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import AddIcon from '@mui/icons-material/Add';
import { PostDeleteDesignation } from "../../store/postDesignation";
import UpdateDesignation from "./UpdateDesignation";


const ViewDesignation = ()=>{

    const [openAddDesignation,setOpenAddDesignation] = useState(false)
    const [openUpdateDesignation,setOpenUpdateDesignation] = useState(false)
    const [designationId,setDesignationId] = useState(null)



    const designationData = useSelector((state)=>state.designation.data)
    
   const HandleCloseAddDesignation = ()=>{ 
    setOpenAddDesignation(false)
    dispatch(DesignationData())

   }

   const handleOpenAddDesignation =()=>{
    setOpenAddDesignation(true)
   }

    const dispatch = useDispatch()

    const deleteSuccess =() =>{
      dispatch(DesignationData());

    }
    
   const handleDelete = (id)=>{
      console.log(id,"delete")
      
      dispatch(PostDeleteDesignation({
        id:id ,successCB:deleteSuccess}))
   }


   const handleUpdate = (id)=>{
    console.log("update")
    setOpenUpdateDesignation(true)
    setDesignationId(id)
 }  

    useEffect(
        ()=>{
            dispatch(DesignationData())
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
  const HandleCloseUpdateDesignation  =()=>{
    setOpenUpdateDesignation(false)
  }  
      

return (
        <>
        <h2>Designation</h2>
        <Stack direction="row" spacing={2}>
      
            <IconButton aria-label="Add Designation" size="Large" title="Add New " onClick={handleOpenAddDesignation}>
                        <AddIcon fontSize="large" />
            </IconButton>
      </Stack>
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700,  }} aria-label="Designation view">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Sl.No</StyledTableCell>
            <StyledTableCell align="center">Name</StyledTableCell>
            <StyledTableCell align="center">Leaves Allotted</StyledTableCell>
            <StyledTableCell align="center">Actions</StyledTableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {designationData.map((item,index) => (
            <StyledTableRow key={index}>
              <StyledTableCell align="center" component="th" scope="row">
                {index+1}
              </StyledTableCell>
              <StyledTableCell align="center">{item.name}</StyledTableCell>
              <StyledTableCell align="center">{item.leaves_allottet}</StyledTableCell>
              <StyledTableCell align="center">

                <ButtonGroup variant="text" aria-label="Basic button group" >                                 
                  <Button title="Edit Row"  onClick={()=>handleUpdate(item.id)}>
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

    <AddDesignation
    open={openAddDesignation} 

    handleClose={HandleCloseAddDesignation}/>

    <UpdateDesignation
    open = {openUpdateDesignation}
    id = {designationId}
    handleClose = {HandleCloseUpdateDesignation}/>
    </>
    

    )
}
export default ViewDesignation