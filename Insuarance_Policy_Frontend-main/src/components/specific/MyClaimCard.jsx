import React from 'react';
import { Box, Typography, Card, CardContent, Grid } from '@mui/material';

const MyClaimCard = ({
  claimType,
  description,
  policyNumber,
  status,
  createdAt
}) => {
  // Function to get styles based on status
  const getStatusStyles = (status) => {
    switch (status) {
      case 'under review':
        return {
          backgroundColor: '#ffeb3b', // Yellow
          color: '#f57f20',
        };
      case 'approved':
        return {
          backgroundColor: '#c8e6c9', // Light Green
          color: '#388e3c',
        };
      case 'denied':
        return {
          backgroundColor: '#ffcdd2', // Light Red
          color: '#d32f2f',
        };
      default:
        return {
          backgroundColor: '#e0e0e0', // Default gray
          color: '#000000',
        };
    }
  };

  const statusStyles = getStatusStyles(status);

  return (
    <Card sx={{ marginBottom: 3, padding: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Claim Details
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography><strong>Claim Type:</strong> {claimType}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography><strong>Description:</strong> {description}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography><strong>Policy Number:</strong> {policyNumber}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography><strong>Submitted On:</strong> {new Date(createdAt).toLocaleDateString()}</Typography>
          </Grid>
        </Grid>

        {/* Status Box */}
        <Box
          sx={{
            marginTop: 2,
            padding: 1,
            borderRadius: 1,
            textAlign: 'center',
            ...statusStyles,
          }}
        >
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
            Status: {status}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default MyClaimCard;



