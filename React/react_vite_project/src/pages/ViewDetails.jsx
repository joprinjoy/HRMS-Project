
import { saveAs } from 'file-saver';
import vCardsJS from 'vcards-js';
import QRCode from "react-qr-code"
import { useEffect, useState } from "react"
import { useDispatch,useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { EmployeeData } from '../store/getEmployee';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '70vw',
  height: '80vh',
  bgcolor: 'white',
  // border: '2px solid #000',
  // borderRadius: 4,
  // boxShadow: 24,
  p: 4,
  overflow: 'auto',
};


const employeeBoxStyle = {
  height: 600,
  width: 700,
  my: 4,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start',
  gap: 2,
  p: 4,
  border: '2px solid grey',
  borderRadius: 4,
  boxShadow: 3,
};



const ViewDetails = ({open,handleClose,empId}) => {

  const InitialData = {
    first_name :"",
    last_name : "",
    designation: "",
    phone : "",
    email : "",
    address : "",
    leaves_taken: ""
} 

    const [vCardString, setVCardString] = useState('');
    const [employeeData,setEmployeeData] = useState(InitialData)
    

    
    const employeeDatas = useSelector((state)=> state.employee.data)

    

    useEffect(() => {
      if (employeeDatas.length > 0) {
        const employeedetail = employeeDatas.find((emp) => emp.id === empId);
        console.log(empId);
        setEmployeeData(employeedetail);
        generateVCard(employeedetail);
      }
    }, [employeeDatas, empId,]);




  const generateVCard = (employeeData) => {


      // if (employeeDatas.lenth > 0){
      // const employeedetail = employeeDatas.find((emp) => emp.id === empId);
      // setEmployeeData(employeedetail)}
      
    if (!employeeData) return;

    // Create a new vCard
    const vCard = vCardsJS();
    

    // Set properties
    vCard.firstName = employeeData.first_name
    // vCard.middleName = '';
    vCard.lastName = employeeData.last_name;
    // vCard.organization = 'Company';
    // vCard.photo.attachFromUrl('https://avatars2.githubusercontent.com/u/5659221?v=3&s=460', 'JPEG');
    vCard.workPhone = employeeData.phone;
    // vCard.birthday = new Date(1997, 12, 11);
    vCard.title = employeeData.designation;
    // vCard.url = 'https://github.com/joprin';
    vCard.email = employeeData.email;
    // vCard.note = '';
    vCard.address = employeeData.address;

    // Generate the vCard string
    const vCardString = vCard.getFormattedString();
    setVCardString(vCardString);

   
  };



const handleDownload=()=>{
   // Create a Blob from the vCard string
   const blob = new Blob([vCardString], { type: 'text/vcard' });

   // Use file-saver to save the vCard
   saveAs(blob, 'contact.vcf');
}



  return (
    <> 

    
    <Modal
    
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >

        <Box >

            {vCardString && (
              <>
                    <Stack direction="row" spacing={2} justifyContent="center" alignItems="center" >
                    
                      <Box
                            height={600}
                            width={700}
                            my={4}
                            display="flex"
                            alignItems="center"
                            gap={4}
                            p={2}
                            sx={style}  
                            
                          >
                          <Box  sx={employeeBoxStyle}>
                            <Typography variant="h4" gutterBottom>Employee Details</Typography>
                            <Typography variant="h5">Name: {employeeData.first_name} {employeeData.last_name}</Typography>
                            <Typography variant="h6">Designation: {employeeData.designation}</Typography>
                            <Typography variant="h6">Phone: {employeeData.phone}</Typography>
                            <Typography variant="h6">Email: {employeeData.email}</Typography>
                            <Typography variant="h6">Address: {employeeData.address}</Typography>
                            <Button variant="contained" color="primary" onClick={handleDownload} sx={{ mt: 2 }}>Download vCard</Button>
              
                        </Box>

                        <Box sx={employeeBoxStyle}>
                            <Typography variant="h6" gutterBottom>Scan QR Code to get Contact Details</Typography>
                            {vCardString && <QRCode value={vCardString} size={256} />}
                        </Box>
                        <Button id='closeButton' onClick={handleClose} sx={{paddingBottom: "800px"}} >close</Button> 


                        
                      </Box>
                      
                      </Stack> 
                        
                                  
                </>
             )}
        </Box>

</Modal>      
</>   
  );
};

export default ViewDetails







