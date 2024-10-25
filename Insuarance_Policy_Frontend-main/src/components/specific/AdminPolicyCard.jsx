import { Card, CardContent, Typography, Button, IconButton } from '@mui/material';
import {Delete as DeleteIcon} from "@mui/icons-material"

const AdminPolicyCard = ({ policyName, policyNumber, insuranceType, coverageAmount, 
              premiumAmount, policyTerm, startDate, endDate, onViewDetails,deleteInsu }) => {
  return (
    <Card
      sx={{
        position:"relative"
      }}
    >
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {policyName}
        </Typography>
        <Typography variant="body2">Policy Number: {policyNumber}</Typography>
        <Typography variant="body2">Insurance Type: {insuranceType}</Typography>
        <Typography variant="body2">Coverage Amount: Rs.{coverageAmount}</Typography>
        <Typography variant="body2">Premium Amount: Rs.{premiumAmount}</Typography>
        <Typography variant="body2">Policy Term: {policyTerm} years</Typography>
        <Typography variant="body2">Start Date: {startDate}</Typography>
        <Typography variant="body2">End Date: {endDate}</Typography>
        {
          onViewDetails ?
          <Button
          variant="outlined"
          color="primary"
          sx={{ marginTop: '1rem' }}
          onClick={()=>onViewDetails(policyNumber)}
        >
          View Details
        </Button>
        :
        <></>
        }

      {
          deleteInsu ?
          <IconButton
          color="error"
          sx={{ position:"absolute" , top:"0px",right:"0px"}}
          onClick={()=>deleteInsu(policyNumber)}
        >
          <DeleteIcon />
        </IconButton>
        :
        <></>
        }
        
      </CardContent>
    </Card>
  );
};

export default AdminPolicyCard;
