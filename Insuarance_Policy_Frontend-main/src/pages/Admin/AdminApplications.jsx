import { Box, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import AdminPolicyCard from '../../components/specific/AdminPolicyCard';
import { useAllApplicationsQuery } from '../../redux/api/application';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AdminApplications = () => {
  const navigate=useNavigate()

  const [applications, setApplications] = useState([]);
  const [status, setStatus] = useState("");


  const {data,isLoading,isError,error}=useAllApplicationsQuery({status})

useEffect(() => {
  if(data?.policies){
      setApplications(data.policies);
  }
}, [data]);

const handleChange = (event) => {
  setStatus(event.target.value);
};

if(isError){
  toast.error(error.data?.message || "Something went Wrong!")
}

  return (
    <Box
    sx={{ padding: '2rem', maxWidth: '1200px', margin: 'auto', 

      height:"calc(100vh - 4rem)",
          overflowY:"auto",
          "&::-webkit-scrollbar":{
            display:"none"
          },
          position:"relative"
    }}
    >
      <Typography variant="h4" gutterBottom textAlign={"center"} margin={"2rem"}>
        All Applications
      </Typography>

      <Box sx={{ 
                width: "200px",
                position:"absolute",
                top:20,
                right:0
                 }}
            >
                <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Select Status</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={status}
          label="Staus"
          onChange={handleChange}
          
        >
          <MenuItem value={""}>All</MenuItem>
          <MenuItem value={"Processing"}>Processing</MenuItem>
          <MenuItem value={"Accepted"}>Accepted</MenuItem>
          <MenuItem value={"Rejected"}>Rejected</MenuItem>
        </Select>
      </FormControl>
            </Box>
      <Grid container spacing={3}>
        {
         !isLoading && 
         (
          applications.length ==0 ?
          <Typography width={"100%"} variant="h6" color="textSecondary" margin={"4rem"} textAlign={"center"}>
                  No Applications
           </Typography>
          :
          applications.map((application, index) => {
            const { 
              policyName, 
              policyNumber, 
              insuranceType, 
              coverageAmount, 
              premiumAmount, 
              policyTerm, 
              startDate, 
              endDate ,
              _id
            } = application;
  
            return (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <AdminPolicyCard
                  policyName={policyName}
                  policyNumber={policyNumber}
                  insuranceType={insuranceType}
                  coverageAmount={coverageAmount}
                  premiumAmount={premiumAmount}
                  policyTerm={policyTerm}
                  startDate={startDate}
                  endDate={endDate}
                  onViewDetails={() => navigate(`/admin/application/${_id}`)} 
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

export default AdminApplications;
