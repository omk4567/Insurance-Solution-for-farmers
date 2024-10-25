import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, TextField, Button, Typography, MenuItem, InputLabel, Select, FormControl, CircularProgress } from '@mui/material';
import { toast } from 'react-hot-toast';
import { useSubmitClaimMutation } from '../redux/api/claim'; 
import { useGetMyProfileQuery } from '../redux/api/user';  

const CreateClaim = () => {
  const { policyNumber } = useParams();
  const { data, isLoading: isProfileLoading, isError, error: profileError, refetch } = useGetMyProfileQuery();    

  const [isEdit, setIsEdit] = useState(false); 

  const [claimData, setClaimData] = useState({
    userId: '',
    policyId: policyNumber,
    claimType: '',
    description: '',
    photo: null, // Store single photo
  });

  const [submitClaim, { isLoading: isSubmitting, isError: isSubmitError, error: submitError }] = useSubmitClaimMutation();

  useEffect(() => {
    if (data?.user) {
      setClaimData((prevState) => ({
        ...prevState,
        userId: data.user.email || '', // Use user email as userId
      }));
    }
  }, [data]);  

  useEffect(() => {
    // Refetch the profile data when component mounts or the `isEdit` changes
    if (!isEdit) {
        refetch();
    }
}, [isEdit, refetch]); 

  const handleChange = (e) => {
    setClaimData({
      ...claimData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setClaimData((prevState) => ({
      ...prevState,
      photo: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('userId', claimData.userId);
    formData.append('policyId', claimData.policyId);
    formData.append('claimType', claimData.claimType);
    formData.append('description', claimData.description);
    formData.append('photo', claimData.photo);

    try {
      await submitClaim(formData).unwrap();     
      toast.success('Claim submitted successfully!');
      setClaimData({
        userId: data?.user?.email || '',
        policyId: policyNumber,
        claimType: '',
        description: '',
        photo: null,
      });
      document.getElementById('fileInput').value = ''; // Reset file input
    } catch (err) {
      toast.error(`Failed to submit claim: ${submitError?.message || 'Unknown error'}`);
    }
  };

  if (isProfileLoading) {
    return <CircularProgress />;
  }

  if (isError) {
    return <p>Error loading profile: {profileError?.message}</p>;
  }

  return (
    <Box sx={{ padding: '2rem', maxWidth: '600px', margin: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        Submit Claim for Policy
      </Typography>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <TextField
          label="User ID"
          name="userId"
          value={claimData.userId}
          fullWidth
          required
          sx={{ mb: 2 }}
          disabled
        />
        
        <TextField
          label="Policy ID"
          name="policyId"
          value={claimData.policyId}
          fullWidth
          required
          sx={{ mb: 2 }}
          disabled
        />

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="claimType-label">Claim Type</InputLabel>
          <Select
            labelId="claimType-label"
            name="claimType"
            value={claimData.claimType}
            onChange={handleChange}
            required
          >
            <MenuItem value="crop">Crop</MenuItem>
            <MenuItem value="equipment">Equipment</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Description"
          name="description"
          value={claimData.description}
          onChange={handleChange}
          fullWidth
          required
          multiline
          rows={4}
          sx={{ mb: 2 }}
        />
        
        <Typography variant="h6" sx={{ mb: 1 }}>
          Upload Photo
        </Typography>
        <input
          type="file"
          id="fileInput"
          name="photo"
          onChange={handleFileUpload}
          accept="image/*"
          required
          style={{ marginBottom: '16px' }} 
        />
        
        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{ mt: 2 }}
          disabled={isSubmitting}
        >
          {isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'Submit Claim'}
        </Button>
        {isSubmitError && <p>Error: {submitError.message}</p>}
      </form>
    </Box>
  );
};

export default CreateClaim;






   






