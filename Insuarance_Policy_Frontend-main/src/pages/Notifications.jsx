import { Box, Typography, Button, List, ListItem } from '@mui/material';
import { useGetMyProfileQuery } from '../redux/api/user';
import { useGetNotificationsQuery, useMarkAsReadMutation } from '../redux/api/claim'; // Include the hook for marking as read
import { useEffect } from 'react';

const Notifications = () => {
  const { data: userProfile, isLoading: isProfileLoading, error: profileError } = useGetMyProfileQuery();
  const { data: notificationsData, isLoading: isNotificationsLoading, error: notificationsError, refetch } = useGetNotificationsQuery();
  const [markAsRead] = useMarkAsReadMutation(); // Use the markAsRead mutation hook
  

  useEffect(() => {
    if (userProfile) {
      refetch(); // Refetch notifications if the user profile is available
    }
  }, [userProfile, refetch]); // Dependency array includes userProfile  

  
  // Handle loading and error states for profile
  if (isProfileLoading) return <Typography>Loading user profile...</Typography>;
  if (profileError) return <Typography>Error loading user profile.</Typography>;

  // Handle loading and error states for notifications
  if (isNotificationsLoading) return <Typography>Loading notifications...</Typography>;
  if (notificationsError) return <Typography>Error loading notifications.</Typography>;

  const notifications = notificationsData?.notifications || []; // Use optional chaining to avoid errors  

  const handleMarkAsRead = async (notificationId) => {
    try {
      await markAsRead(notificationId).unwrap(); // Call the mutation and wait for it to complete
      refetch(); // Refetch notifications to update the state
    } catch (error) {
      console.error('Failed to mark as read: ', error);
    }
  };   

  // Filter unread notifications
  const unreadNotifications = notifications.filter(notification => !notification.isRead);   

  

  return (
    <Box sx={{ padding: '1rem', maxWidth: '600px', margin: 'auto' }}>
      <Typography variant="h6">Notifications</Typography>
      <List>
        {unreadNotifications.length > 0 ? (
          unreadNotifications.map((notification) => (       
            <ListItem key={notification._id} sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography>{notification.message}</Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleMarkAsRead(notification._id)} // Call the mark as read function
              >
                Mark as Read
              </Button>
            </ListItem>
          ))
        ) : (
          <Typography>No Notifications</Typography> // Display message if there are no notifications
        )}
      </List>
    </Box>
  );
};

export default Notifications;





