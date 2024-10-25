import mongoose from 'mongoose';

const farmerApplicationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  policyNumber: {
    type: String,
    required: true,
  },
  cropType: {
    type: String,
    required: true,
  },
  cropArea: {
    type: Number,
    required: true,
  },
  region: {
    type: String,
    required: true,
  },
  coverageType: {
    type: String,
    required: true,
  },
  user:{
    type:mongoose.Types.ObjectId,
    required: true,
    ref:"User"
  },
  status:{
    type:String,
    enum:["Processing","Accepted","Rejected"],
    default:"Processing"
  }
  
}, {
  timestamps: true, 
});

export const FarmerApplication = mongoose.model('FarmerApplication', farmerApplicationSchema);
