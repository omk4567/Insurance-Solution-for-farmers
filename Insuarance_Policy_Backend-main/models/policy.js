import mongoose from 'mongoose';

const policySchema = new mongoose.Schema({
  policyName: {
    type: String,
    required: true,
  },
  policyNumber: {
    type: String,
    required: true,
    unique: true,
  },
  insuranceType: {
    type: String,
    required: true,
  },
  coverageAmount: {
    type: Number,
    required: true,
  },
  premiumAmount: {
    type: Number,
    required: true,
  },
  policyTerm: {
    type: Number,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  minAge: {
    type: Number,
    required: true,
  },
  maxAge: {
    type: Number,
    required: true,
  },
  
}, {
  timestamps: true
});

export const Policy = mongoose.model('Policy', policySchema);
