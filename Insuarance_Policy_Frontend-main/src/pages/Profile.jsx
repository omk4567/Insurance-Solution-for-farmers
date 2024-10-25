import { Button, Container, Paper, Stack, TextField } from '@mui/material';
import ProfileCard from '../components/shared/ProfileCard';
import { useEffect, useState } from 'react';
import { useGetMyProfileQuery, useUpdateProfileMutation } from '../redux/api/user';
import { toast } from "react-hot-toast";
import { resAndNavigate } from "../utils/features";

const Profile = () => {
    // Fetch profile data   
    const { data, isLoading, isError, error, refetch } = useGetMyProfileQuery();
    const [updateProfile] = useUpdateProfileMutation();

    const [isEdit, setIsEdit] = useState(false);

    const [username, setUsername] = useState("");
    const [mobile, setMobile] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");   

    useEffect(() => {
        if (data?.user) {
            setUsername(data.user.username || "");
            setMobile(data.user.mobile || "");
            setName(data.user.name || "");
            setEmail(data.user.email || "");
        }
    }, [data]);

    useEffect(() => {
        // Refetch the profile data when component mounts or the `isEdit` changes
        if (!isEdit) {
            refetch();
        }
    }, [isEdit, refetch]);

    const updateMyProfile = async () => {
        const res = await updateProfile({ name, email, mobile, password, username });
        resAndNavigate(res, null, "");
        setIsEdit(false);
    };

    if (isError) {
        toast.error(error?.data?.message || "Something went wrong!");
    }

    return (
        <Container
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            {isEdit ? (
                <>
                    <Paper
                        sx={{
                            margin: "4rem",
                            padding: "2rem",
                            width: "100%",
                            maxWidth: "600px",
                        }}
                    >
                        <Stack sx={{ width: "90%", maxWidth: "400px" }}>
                            <TextField
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                label="Name"
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                label="Email"
                                margin="normal"
                                fullWidth
                            />
                            <TextField
                                type="number"
                                value={mobile}
                                onChange={(e) => setMobile(e.target.value)}
                                label="Mobile No."
                                margin="normal"
                                fullWidth
                            />
                            <TextField
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                label="Username"
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                label="Password"
                                fullWidth
                                margin="normal"
                            />
                        </Stack>
                    </Paper>
                </>
            ) : (
                <>
                    <Paper
                        sx={{
                            margin: "4rem",
                            padding: "2rem",
                            width: "100%",
                            maxWidth: "600px",
                        }}
                    >
                        {!isLoading &&  (
                            <ProfileCard
                                name={data?.user?.name}
                                email={data?.user?.email}
                                mobile={data?.user?.mobile}
                                username={data?.user?.username}
                            />
                        )}
                    </Paper>
                </>
            )}

            {isEdit ? (
                <Button variant="contained" onClick={updateMyProfile}>
                    Done
                </Button>
            ) : (
                <Button variant="contained" onClick={() => setIsEdit(true)}>
                    Edit
                </Button>
            )}
        </Container>
    );
};

export default Profile;

