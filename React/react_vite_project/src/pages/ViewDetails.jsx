import { saveAs } from 'file-saver';
import vCardsJS from 'vcards-js';
import QRCode from "react-qr-code"
import { useEffect, useState } from "react"
import { useSelector } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';



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
    console.log(employeeData)
    

    
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
    vCard.organization = 'Hamon Technologies';
    // vCard.photo.attachFromUrl('https://avatars2.githubusercontent.com/u/5659221?v=3&s=460', 'JPEG');
    vCard.workPhone = employeeData.phone;
    // vCard.birthday = new Date(1997, 12, 11);
    vCard.title = employeeData.designation;
    vCard.url = 'https://github.com/joprin';
    vCard.email = employeeData.email;
    vCard.note = employeeData.address;
    vCard.Address = employeeData.address;

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


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '70vw',
  height: '80vh',
  bgcolor: 'white',
  display:'flex',
  p: 4,

  
  
};
const styleboxouter = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '70vw',
  height: '90vh',
  bgcolor: 'white',
  p: 4,

  
  
};

const detailBox = {

  alignItems: 'left',
  justifyContent: 'center',
  m: 5,
  border: '2px solid #000',
  width: '80%',
  borderRadius: 4,
  boxShadow: 24,
  pl:10,
  pt:30,
  textAlign: 'left',
};

const qrBox = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  m: 5,
  border: '2px solid #000',
  width: '80%',
  borderRadius: 4,
  // boxShadow: 3,
  p: 4,
  textAlign: 'center',
};

const textStyle = {
  fontSize: '1.2rem',
  color: '#333',
  margin: '8px 0',
};

const headerStyle = {
  fontSize: '1.5rem',
  color: '#000',
  margin: '8px 0',
  fontWeight: 'bold',
};

const buttonStyle = {
  marginTop: '16px',
  backgroundColor: '#1976d2',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#115293',
  },
}

const buttonBoxStyle = {
  position: 'absolute', 
  top: 0,
  right: 0,
  m: 2, 
  backgroundColor:'#d65c5c'
};

  return (
    <> 

    
    <Modal
    
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
              <>
                    
                    {vCardString && (
                      <Box sx={styleboxouter}>
                            <Box sx={buttonBoxStyle}>
                            <IconButton onClick={handleClose}><CloseIcon sx={{ color: 'white' }} /></IconButton>
                            </Box>
                           

                      <Box sx={style}>
                          <Box sx={detailBox}>
                            
                                <Typography sx={headerStyle} variant="h4" gutterBottom>
                                  Employee Details
                                </Typography>
                                <Typography sx={textStyle} variant="h5">
                                  Name: {employeeData.first_name} {employeeData.last_name}
                                </Typography>
                                <Typography sx={textStyle} variant="h6">
                                  Designation: {employeeData.designation}
                                </Typography>
                                <Typography sx={textStyle} variant="h6">
                                 Phone: {employeeData.phone}
                                </Typography>
                                <Typography sx={textStyle} variant="h6">
                                  Email: {employeeData.email}
                                </Typography>
                                <Typography sx={textStyle} variant="h6">
                                  Address: {employeeData.address}
                                </Typography>

                              <Button
                              variant="contained"
                              color="primary"
                              onClick={handleDownload}
                              sx={buttonStyle}
                              >
                              Download vCard
                            </Button>
                          </Box>

                        <Box sx={qrBox}>
                            <Typography sx={headerStyle}   variant="h5" gutterBottom>Scan QR Code to get Contact Details</Typography>

                            {vCardString && <QRCode value={vCardString} size={256} />}
                        </Box>
                        
                      
                        
                      </Box>
                      </Box>
                      
                      )}
                            <Typography variant="h6">No Data Available</Typography>

                    
                        
                                  
                </>
             
        

    </Modal>      
    </>   
  );
};

export default ViewDetails







