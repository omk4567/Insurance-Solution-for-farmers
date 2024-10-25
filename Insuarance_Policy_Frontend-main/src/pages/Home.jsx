import { Box,  Grid,  TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"

import PolicyCard from "../components/specific/PolicyCard"
import { useNavigate } from "react-router-dom"
import { useSearchPoliciesQuery } from "../redux/api/policy"
import toast from "react-hot-toast"


const Home = () => {


  const navigate=useNavigate();

   
  const [searchTerm, setSearchTerm] = useState('');

  const [policies, setPolicies] = useState([]);

  const {data,isLoading,isError,error}=useSearchPoliciesQuery(searchTerm);

  useEffect(() => {
    if(data?.policies){
      setPolicies(data.policies)
    }
  
  }, [data]);

  

    const handleApply = (policyNumber) => {
        navigate(`/apply/${policyNumber}`); 
      };

    // const filteredPolicies = policies.filter(policy =>
    //     policy.policyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //     policy.insuranceType.toLowerCase().includes(searchTerm.toLowerCase())
    //   );

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
              }
        }}
        >
          


<Box >
      <Typography variant="h4" mb={4} textAlign={"center"}>
        Insurance Policies for Farmers
      </Typography>
      
      <TextField
        label="Search Policies"
        variant="outlined"
        fullWidth
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 3 }}
      />
      
      <Grid container spacing={3}>
        {
          !isLoading &&
          (
            policies.length > 0 ? (
              policies.map((policy, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <PolicyCard
                    policyName={policy.policyName}
                    policyNumber={policy.policyNumber}
                    insuranceType={policy.insuranceType}
                    coverageAmount={policy.coverageAmount}
                    premiumAmount={policy.premiumAmount}
                    policyTerm={policy.policyTerm}
                    startDate={policy.startDate}
                    endDate={policy.endDate}
                    onApply={()=>handleApply(policy.policyNumber)} // Handle apply action
                  />
                </Grid>
              ))
            ) : (
              <Typography width={"100%"} variant="h6" color="textSecondary" margin={"4rem"} textAlign={"center"}>
                No policies found matching your search.
              </Typography>
            )
          )
        }
      </Grid>
    </Box>
        </Box>
    )
}

export default Home