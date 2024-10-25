import { useState, useEffect } from 'react';
import { IconButton, Stack, Tooltip, Badge } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import { LinkComponent } from '../styles/StyledComponents';
import { pinkishWhite } from '../../constants/colors';
import { useLogoutMutation } from '../../redux/api/user';
import { resAndNavigate } from '../../utils/features';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userNotExist } from '../../redux/reducers/userReducer';
import { AdminPanelSettings, Fingerprint, Home, Logout } from '@mui/icons-material'; 
import NotificationsIcon from '@mui/icons-material/Notifications';    
import { useGetNotificationsQuery } from '../../redux/api/claim'; // Add this import

const Header = ({ user }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const [unreadCount, setUnreadCount] = useState(0); // State to track unread notifications count

    const { data: notificationsData, refetch } = useGetNotificationsQuery(); // Fetch notifications
    const [logout] = useLogoutMutation();

    const logoutHandler = async () => {
        const res = await logout();
        dispatch(userNotExist(null));
        resAndNavigate(res, navigate, "/");
    };

    // Effect to update unread notifications count
    useEffect(() => {
        if (notificationsData) {
            const unreadNotifications = notificationsData.notifications.filter(notification => !notification.isRead);
            setUnreadCount(unreadNotifications.length);
            refetch(); 
        }
    }, [notificationsData]); // Runs when notifications data changes

    useEffect(() => {
        if (user) {
            refetch(); // Fetch notifications when user changes (logs in)
        }
    }, [user, refetch]);

    return (
        <Stack
            sx={{
                flexDirection: "row",
                justifyContent: "flex-end",
                alignItems: "center",
                height: "4rem",
                gap: "2rem",
                padding: "1rem",
                backgroundColor: pinkishWhite,
                margin: "0",
                position: "relative"
            }}
        >
            <LinkComponent to="/" >
                <Tooltip title={"Home"}>
                    <IconButton>
                        <Home />
                    </IconButton>
                </Tooltip>
            </LinkComponent>
            {user?.role === "admin" && (
                <LinkComponent to="/admin" >
                    <Tooltip title={"Admin Panel"}>
                        <IconButton>
                            <AdminPanelSettings />
                        </IconButton>
                    </Tooltip>
                </LinkComponent>
            )}     

           {/* Show notifications icon with unread count only if user is logged in and not an admin */}
{user && user.role !== "admin" && (
    <LinkComponent to="/notifications" >
        <Tooltip title="Notifications">
            <IconButton>
                <Badge badgeContent={unreadCount} color="error">
                    <NotificationsIcon />
                </Badge>
            </IconButton>
        </Tooltip>
    </LinkComponent>
)}

            
            {
                user ?
                    <LinkComponent to="/login" onClick={logoutHandler}>
                        <Tooltip title={"LogOut"}>
                            <IconButton>
                                <Logout />
                            </IconButton>
                        </Tooltip>
                    </LinkComponent>
                    :
                    <LinkComponent to="/login" >
                        <Tooltip title={"Login"}>
                            <IconButton>
                                <Fingerprint color='secondary' />
                            </IconButton>
                        </Tooltip>
                    </LinkComponent>
            }

            <IconButton onClick={() => setIsOpen(prev => !prev)}
                sx={{
                    backgroundColor: "white",
                    padding: "0.4rem"
                }}
            >
                <PersonIcon />
            </IconButton>

            {isOpen && (
                <div
                    style={{
                        position: "absolute",
                        top: "100%",
                        right: "0",
                        backgroundColor: "white",
                        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
                        borderRadius: "4px",
                        zIndex: 1000,
                        padding: "1rem"
                    }}
                >
                    <Stack gap={"1rem"}>
                        <LinkComponent to="/profile" onClick={() => setIsOpen(prev => !prev)}>
                            Profile    
                        </LinkComponent>
                        <LinkComponent to="/my/application" onClick={() => setIsOpen(prev => !prev)}>
                            My Applications
                        </LinkComponent>
                        <LinkComponent to="/my-claims" onClick={() => setIsOpen(prev => !prev)}>
                            My Claims
                        </LinkComponent>
                    </Stack>                                                       
                </div>
            )}
        </Stack>
    );
};

export default Header;


