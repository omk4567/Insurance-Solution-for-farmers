import mongoose from "mongoose";

const claimSchema = new mongoose.Schema({
  userId: {
    type: String, // Changed from ObjectId to String to store the user's email
    required: true,
  },
  policyId: {
    type: String, // Change to String to store policy number
    required: true,
  },
  claimType: {
    type: String,
    enum: ['crop', 'equipment'],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['submitted', 'under review', 'approved', 'denied'],
    default: 'submitted',
  },
  photo: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Claim', claimSchema);


