import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';

const PolicyCard = ({
  policyName,
  policyNumber,
  insuranceType,
  coverageAmount,
  premiumAmount,
  policyTerm,
  startDate,
  endDate,
  onApply
}) => {
  return (
    <Card>
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
        <Button
          variant="contained"
          color="primary"
          sx={{ marginTop: '1rem' }}
          onClick={onApply}
        >
          Apply
        </Button>
      </CardContent>
    </Card>
  );
};

export default PolicyCard;
