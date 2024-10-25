import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  userId: {
    type: String, // Assuming you store user's email in userId
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  isRead: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Notification', notificationSchema);
