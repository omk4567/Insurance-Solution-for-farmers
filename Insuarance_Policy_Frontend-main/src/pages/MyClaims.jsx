import React, { useEffect, useState } from 'react';
import { Box, Typography, FormControl, InputLabel, Select, MenuItem, Grid } from '@mui/material';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import MyClaimCard from '../components/specific/MyClaimCard'; // Reference to MyClaimCard component
import { useGetMyClaimsQuery } from '../redux/api/claim';

const MyClaims = () => {
  const { user } = useSelector((state) => state.userReducer); 
  const [claims, setClaims] = useState([]);
  const [status, setStatus] = useState("");

  const { data, isLoading, isError, error } = useGetMyClaimsQuery(user?.email || ''); // No need to pass user email 

  useEffect(() => {
    if (data?.claims) { 
      console.log(data); 
      setClaims(data.claims);
    }
  }, [data]);

  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  if (isError) {
    toast.error(error?.message || "Something went wrong!");
  }

  // Filter claims based on selected status
  const filteredClaims = status
    ? claims.filter(claim => claim.status === status)
    : claims;

  return (
    <Box
      sx={{ padding: '2rem', maxWidth: '1200px', margin: 'auto', height: "calc(100vh - 4rem)", overflowY: "auto", "&::-webkit-scrollbar": { display: "none" }, position: "relative" }}
    >
      <Typography variant="h4" gutterBottom textAlign={"center"}>
        My Claims
      </Typography>

      <Box sx={{ width: "200px", position: "absolute", top: 20, right: 0 }}>
        <FormControl fullWidth>
          <InputLabel id="claim-status-select-label">Select Status</InputLabel>
          <Select
            labelId="claim-status-select-label"
            id="claim-status-select"
            value={status}
            label="Status"
            onChange={handleChange}
          >
            <MenuItem value={""}>All</MenuItem>
            <MenuItem value={"submitted"}>Submitted</MenuItem>
            <MenuItem value={"under review"}>Under Review</MenuItem>
            <MenuItem value={"approved"}>Approved</MenuItem>
            <MenuItem value={"denied"}>Denied</MenuItem>
          </Select>
        </FormControl>
      </Box>
      
      <Grid container spacing={3}>
        {
          !isLoading && (
            filteredClaims.length === 0 ? 
            <Typography width={"100%"} variant="h6" color="textSecondary" margin={"4rem"} textAlign={"center"}>
              No Claims Found    
            </Typography>
            :
            filteredClaims.map((claim, index) => {
              const { claimType, description, policyId, status, createdAt } = claim;

              return (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <MyClaimCard
                    claimType={claimType}
                    description={description}
                    policyNumber={policyId}         
                    status={status}
                    createdAt={createdAt}
                  />
                </Grid>
              );
            })
          )
        }
      </Grid>
    </Box>
  );
};

export default MyClaims;

