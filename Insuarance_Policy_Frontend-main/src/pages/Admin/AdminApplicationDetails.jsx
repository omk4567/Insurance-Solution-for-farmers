import { useEffect, useState } from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom'; 
import {applications} from "../../constants/data"
import {toast} from "react-hot-toast"
import { useAplicationDetailsQuery, useProcessApplicationMutation } from '../../redux/api/application';
import { resAndNavigate } from '../../utils/features';

const AdminApplicationDetails = () => {
  const { id } = useParams();
  const navigate=useNavigate();
  const [applicationDetails, setApplicationDetails] = useState(null);

  const {data,isError,error}=useAplicationDetailsQuery(id)
  const [processApplication] =useProcessApplicationMutation()

  useEffect(() => {
    if(data?.application){
      setApplicationDetails(data.application)    
    }
  }, [id,data]);

  const handleProcess = async ({process}) => {
    const res =await processApplication({id,process})
    resAndNavigate(res,navigate,"/admin/applications")   
  };

  

  if(isError){
    toast.error(error.data?.message || "Something went Wrong!")
  }
  return (
    <Box sx={{ padding: '2rem', maxWidth: '800px', margin: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        Farmer Application Details
      </Typography>
      {applicationDetails ? (
        <>
          <Typography><strong>Name:</strong> {applicationDetails.name}</Typography>
          <Typography><strong>Email:</strong> {applicationDetails.email}</Typography>
          <Typography><strong>Phone:</strong> {applicationDetails.phone}</Typography>
          <Typography><strong>Address:</strong> {applicationDetails.address}</Typography>
          <Typography><strong>Policy Number:</strong> {applicationDetails.policyNumber}</Typography>
          <Typography><strong>Crop Type:</strong> {applicationDetails.cropType}</Typography>
          <Typography><strong>Crop Area:</strong> {applicationDetails.cropArea} acres</Typography>
          <Typography><strong>Region:</strong> {applicationDetails.region}</Typography>
          <Typography><strong>Coverage Type:</strong> {applicationDetails.coverageType}</Typography>

          <Stack direction="row" spacing={2} sx={{ marginTop: '2rem' }}>
            <Button variant="contained" color="primary" onClick={()=>handleProcess({process:"Accepted"})}>
              Accept Application
            </Button>
            <Button variant="contained" color="error" onClick={()=>handleProcess({process:"Rejected"})}>
              Reject Application
            </Button>
          </Stack>
        </>
      ) : (
        <Typography>Loading application details...</Typography>
      )}
    </Box>
  );
};

export default AdminApplicationDetails;
