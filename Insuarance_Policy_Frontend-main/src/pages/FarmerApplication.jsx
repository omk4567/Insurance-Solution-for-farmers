import { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import {toast} from "react-hot-toast"
import { useNewApplicationMutation } from '../redux/api/application';
import { resAndNavigate } from '../utils/features';
import { useNavigate } from 'react-router-dom';

const FarmerApplication = () => {
  const navigate=useNavigate()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    policyNumber: '', 
    cropType: '', 
    cropArea: '', 
    region: '', 
    coverageType: '', 
  });

  const [newApplication]=useNewApplicationMutation()

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const res=await newApplication(formData)
    resAndNavigate(res,navigate,"/my/application")  
  };

  return (
    <Box sx={{ padding: '2rem', maxWidth: '600px', margin: 'auto' ,
      height:"calc(100vh - 4rem)",
              overflowY:"auto",
              "&::-webkit-scrollbar":{
                display:"none"
              }
    }}>
      <Typography variant="h4" gutterBottom>
        Apply for Insurance Policy
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        <TextField
          label="Phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        <TextField
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        <TextField
          label="Policy Number"
          name="policyNumber"
          value={formData.policyNumber}
          onChange={handleChange}
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        <TextField
          label="Crop Type"
          name="cropType"
          value={formData.cropType}
          onChange={handleChange}
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        <TextField
          label="Crop Area (Acres/Hectares)"
          name="cropArea"
          type="number"
          value={formData.cropArea}
          onChange={handleChange}
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        <TextField
          label="Region"
          name="region"
          value={formData.region}
          onChange={handleChange}
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        <TextField
          label="Coverage Type"
          name="coverageType"
          value={formData.coverageType}
          onChange={handleChange}
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        
        <Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
          Submit Application
        </Button>
      </form>
    </Box>
  );
};

export default FarmerApplication;
