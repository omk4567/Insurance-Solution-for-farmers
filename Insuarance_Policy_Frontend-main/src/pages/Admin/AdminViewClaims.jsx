import { Box, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import AdminClaimCard from '../../components/specific/AdminClaimCard'; 
import { useGetAllClaimsForAdminQuery } from '../../redux/api/claim';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AdminViewClaims = () => {
  const navigate = useNavigate();
  const [claims, setClaims] = useState([]);
  const [status, setStatus] = useState("");

  // Fetch all claims based on the status
  const { data, isLoading, isError, error } = useGetAllClaimsForAdminQuery({ status });    

  useEffect(() => {
    if (data?.claims) {
      setClaims(data.claims);
    }
  }, [data]);

  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  if (isError) {
    toast.error(error?.data?.message || "Something went wrong!");
  }

  return (
    <Box
      sx={{
        padding: '2rem',
        maxWidth: '1200px',
        margin: 'auto',
        height: "calc(100vh - 4rem)",
        overflowY: "auto",
        "&::-webkit-scrollbar": {
          display: "none",
        },
        position: "relative",
      }}
    >
      <Typography variant="h4" gutterBottom textAlign={"center"} margin={"2rem"}>
        All Claim Requests
      </Typography>

      <Box sx={{ 
        width: "200px",
        position: "absolute",
        top: 20,
        right: 0,
      }}>
        <FormControl fullWidth>
          <InputLabel id="select-status-label">Select Status</InputLabel>
          <Select
            labelId="select-status-label"
            id="select-status"
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
        {!isLoading && (
          claims.length === 0 ? (
            <Typography width={"100%"} variant="h6" color="textSecondary" margin={"4rem"} textAlign={"center"}>
              No Claims Found
            </Typography>
          ) : (
            claims.map((claim) => (
              <Grid item xs={12} sm={6} md={4} key={claim._id}>
                <AdminClaimCard claim={claim} />
              </Grid>
            ))
          )
        )}
      </Grid>
    </Box>
  );
};

export default AdminViewClaims;
 
