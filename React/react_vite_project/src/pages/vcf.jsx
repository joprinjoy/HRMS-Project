
import { saveAs } from 'file-saver';
import vCardsJS from 'vcards-js';
import QRCode from "react-qr-code"
import { useState } from "react"

const VCardGenerator = () => {
    const [vCardString, setVCardString] = useState('');
    

  const generateVCard = () => {

    // Create a new vCard
    const vCard = vCardsJS();

    // Set properties
    vCard.firstName = 'Joprin';
    vCard.middleName = '';
    vCard.lastName = 'Joy';
    vCard.organization = 'Hamon Technologies';
    vCard.photo.attachFromUrl('https://avatars2.githubusercontent.com/u/5659221?v=3&s=460', 'JPEG');
    vCard.workPhone = '9544846842';
    vCard.birthday = new Date(1997, 12, 11);
    vCard.title = 'Software Developer';
    vCard.url = 'https://github.com/joprin';
    vCard.email = 'joprinjoy3@gmail.com'
    vCard.note = 'Notes on jopirn';
    vCard.address = 'madhurayil'

    // Generate the vCard string
    const vCardString = vCard.getFormattedString();
    setVCardString(vCardString);

    // Create a Blob from the vCard string
    const blob = new Blob([vCardString], { type: 'text/vcard' });

    // Use file-saver to save the vCard
    saveAs(blob, 'contact.vcf');
  };



  return (
    <> 
    <div>
      <h1>VCard Generator</h1>
      <button onClick={generateVCard}>Generate VCard</button>
    </div>

    {vCardString && (
        <div>
          <h2>Scan this QR Code to get the contact details:</h2>
          <QRCode value={vCardString} size={256} />
        </div>
      )}

</>   
  );
};

export default VCardGenerator;