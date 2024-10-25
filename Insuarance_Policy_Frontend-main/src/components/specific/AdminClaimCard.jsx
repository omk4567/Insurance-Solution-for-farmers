import { Box, Typography, Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom'; 
import { toast } from 'react-hot-toast';
import { useProcessClaimMutation } from '../../redux/api/claim'; // Assuming you have a similar API setup for claims
import { resAndNavigate } from '../../utils/features';
import React, { useState } from 'react';
import Modal from 'react-modal';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

// Setting the app element for accessibility (for Modal)
Modal.setAppElement('#root'); // Adjust if your root ID is different

const AdminClaimCard = ({ claim }) => {
  const navigate = useNavigate();
  const [processClaim] = useProcessClaimMutation();
  
  // State for modal
  const [isOpen, setIsOpen] = useState(false);

  const handleProcess = async ({ process }) => {    
    const res = await processClaim({ id: claim._id, process });
    resAndNavigate(res, navigate, "/admin/claims/view");
  };

  // Function to open modal
  const openModal = () => {
    setIsOpen(true);
  };

  // Function to close modal
  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <Box sx={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
      <Typography variant="h6" gutterBottom>
        Farmer Claim Details
      </Typography>
      <Typography><strong>Claim Type:</strong> {claim.claimType}</Typography>
      <Typography><strong>Policy Number:</strong> {claim.policyId}</Typography>
      <Typography><strong>User Email:</strong> {claim.userId}</Typography>
      <Typography><strong>Description:</strong> {claim.description}</Typography>
      <Typography><strong>Status:</strong> {claim.status}</Typography>

      {/* Displaying the submitted photo */}
      <Box sx={{ marginTop: '1rem' }}>
        <Typography><strong>Submitted Photo:</strong></Typography>
        {/*<img src={claim.photo} alt="Claim Photo" style={{ width: '100%', maxHeight: '400px', objectFit: 'contain' }} />*/}
        <Button variant="outlined" onClick={openModal} sx={{ marginTop: '0.5rem' }}>
          View Photo
        </Button>
      </Box>      

      <Stack direction="row" spacing={2} sx={{ marginTop: '2rem' }}>
  {claim.status !== 'approved' && (
    <>
      <Button variant="contained" color="primary" onClick={() => handleProcess({ process: "approved" })}>
        Approve Claim
      </Button>
      <Button variant="contained" color="secondary" onClick={() => handleProcess({ process: "under review" })}>
        Send for Review
      </Button>
      <Button variant="contained" color="error" onClick={() => handleProcess({ process: "denied" })}>
        Deny Claim
      </Button>
    </>
  )}
</Stack>


      {/* Modal for viewing the photo */}
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
          },
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            transform: 'translate(-50%, -50%)',
            padding: '0',
            border: 'none',
            borderRadius: '8px',
            background: 'none',
          },
        }}
      >
        <div style={{ position: 'relative' }}>
          <Zoom>
            <img src={claim.photo} alt="Claim Photo" style={{ maxWidth: '100%', maxHeight: '80vh', objectFit: 'contain' }} />
          </Zoom>
          <Button onClick={closeModal} style={{
            position: 'absolute', 
            top: '10px', 
            right: '10px', 
            background: 'rgba(255, 255, 255, 0.8)',
            border: 'none',
            borderRadius: '4px'
          }}>
            Close
          </Button>
        </div>
      </Modal>
    </Box>
  );
};

export default AdminClaimCard;
       

