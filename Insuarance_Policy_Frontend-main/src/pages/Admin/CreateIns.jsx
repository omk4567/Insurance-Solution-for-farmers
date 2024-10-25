import React, { useState } from 'react';
import { Box, Button, Grid, TextField, Typography, MenuItem } from '@mui/material';
import { useCreatePolicyMutation } from '../../redux/api/policy';
import { resAndNavigate } from '../../utils/features';
import { useNavigate } from "react-router-dom";


const CreateIns = () => {
  const navigate=useNavigate()

  const [formData, setFormData] = useState({
    policyName: '',
    policyNumber: '',
    insuranceType: 'Crop',
    coverageAmount: '',
    premiumAmount: '',
    policyTerm: '',
    startDate: '',
    endDate: '',
    description: '',
    minAge: '',
    maxAge: '',
  });

  const [createPolicy]=useCreatePolicyMutation()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const res=await createPolicy(formData)

    resAndNavigate(res,navigate,"/admin/insuarance/view");
  };

  return (
    <Box sx={{ padding: '2rem', maxWidth: '900px', margin: 'auto' }}>
      <Typography variant="h4" mb={4}>
        Create Insurance Policy
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/* Policy Name */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Policy Name"
              name="policyName"
              value={formData.policyName}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>

          {/* Policy Number */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Policy Number"
              name="policyNumber"
              value={formData.policyNumber}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>

          {/* Insurance Type */}
          <Grid item xs={12} sm={6}>
            <TextField
              select
              label="Insurance Type"
              name="insuranceType"
              value={formData.insuranceType}
              onChange={handleChange}
              fullWidth
              required
            >
              <MenuItem value="Crop">Crop</MenuItem>
              <MenuItem value="Equipment">Equipment</MenuItem>
            </TextField>
          </Grid>

          {/* Coverage Amount */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Coverage Amount"
              name="coverageAmount"
              type="number"
              value={formData.coverageAmount}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>

          {/* Premium Amount */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Premium Amount"
              name="premiumAmount"
              type="number"
              value={formData.premiumAmount}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>

          {/* Policy Term */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Policy Term (Years)"
              name="policyTerm"
              type="number"
              value={formData.policyTerm}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>

          {/* Start Date */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Start Date"
              name="startDate"
              type="date"
              value={formData.startDate}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
              required
            />
          </Grid>

          {/* End Date */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="End Date"
              name="endDate"
              type="date"
              value={formData.endDate}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
              required
            />
          </Grid>

          {/* Description */}
          <Grid item xs={12}>
            <TextField
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              fullWidth
              multiline
              rows={4}
              required
            />
          </Grid>

          {/* Min Age */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Minimum Age"
              name="minAge"
              type="number"
              value={formData.minAge}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>

          {/* Max Age */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Maximum Age"
              name="maxAge"
              type="number"
              value={formData.maxAge}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              sx={{ padding: '0.75rem', marginTop: '1rem' }}
            >
              Create Policy
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default CreateIns;
