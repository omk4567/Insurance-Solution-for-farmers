import { Box,Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

import toast from 'react-hot-toast';
import AdminPolicyCard from '../../components/specific/AdminPolicyCard';
import { useDeletePolicyMutation, useSearchPoliciesQuery } from '../../redux/api/policy';
import { resAndNavigate } from '../../utils/features';

const AllInsu = () => {
  const [policies, setPolicies] = useState([]);

  const {data,isLoading,isError,error}=useSearchPoliciesQuery("");
  const [deletePolicy]=useDeletePolicyMutation()

  useEffect(() => {
    if(data?.policies){
      setPolicies(data.policies)
    }
  
  }, [data]);

 

  const deleteInsuarance=async (id)=>{
      const res=await deletePolicy({id})
      resAndNavigate(res)
  }

  if(isError){
    toast.error(error.data?.message || "Something went Wrong!")
  }

  return (
    <Box sx={{ padding: '2rem', maxWidth: '1200px', margin: 'auto', 

      height:"calc(100vh - 4rem)",
          overflowY:"auto",
          "&::-webkit-scrollbar":{
            display:"none"
          }
    }}>
      <Typography variant="h4" mb={4} textAlign={"center"}>
        All Insurance Policies
      </Typography>
      <Grid container spacing={3}>
      { !isLoading && 
      (
        policies.length ==0 ?
        <Box sx={{ padding: '2rem', textAlign: 'center',  width:"100%"}}>
            <Typography variant="h5" textAlign={"center"}>No Insurance Policies Found</Typography>
        </Box>
        :
      policies.map((policy, index) => {
          const {
            policyName,
            policyNumber,
            insuranceType,
            coverageAmount,
            premiumAmount,
            policyTerm,
            startDate,
            endDate,
            _id
          } = policy;

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
                deleteInsu={()=>deleteInsuarance(_id)}
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

export default AllInsu;
