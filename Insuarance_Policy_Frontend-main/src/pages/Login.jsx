import {  Button, Container,  Paper,  TextField, Typography } from "@mui/material";
import { useState } from 'react';
import { useCreateUserMutation, useLoginMutation } from "../redux/api/user";
import toast from "react-hot-toast";
import { resAndNavigate } from "../utils/features";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userExist } from "../redux/reducers/userReducer";

const Login = () => {

    const navigate=useNavigate();
    const dispatch=useDispatch()

    const [isLogin, setIslogin] = useState(true)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [mobile, setMobile] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [isLoading] = useState(false)

   const [signUp]=useCreateUserMutation()
   const [login]=useLoginMutation()

    const signUpHandler = async (e) => {
        e.preventDefault();
        const res=await signUp({name,email,mobile,password,username});
        dispatch(userExist(res.data.user))      
        resAndNavigate(res,navigate,"/");
    }


    const loginHandler = async(e) => {
        e.preventDefault();
        const res=await login({password,username});
        dispatch(userExist(res.data.user))
        resAndNavigate(res,navigate,"/");
    }




    return (
        <div 
        style={{ 
            // backgroundColor: "rgba(235, 162, 52,.3)",
             height: 'calc(100vh - 4rem)'
         }}
        >
            <Container maxWidth="sm"
                sx={{
                    height: '100%',
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Paper
                    elevation={5}
                    sx={{
                        padding: 4,
                        margin: 4,
                        width: "80%",
                        maxHeight: "90%",
                        overflow: "auto",
                        "&::-webkit-scrollbar": {
                            display: "none"
                        }

                    }}
                >
                    {
                        isLogin ?
                            <>
                                <Typography
                                    variant='h5'
                                    sx={{
                                        textAlign: "center"
                                    }}
                                >Login</Typography>
                                <form
                                    style={{
                                        width: "100%",

                                    }}
                                >
                                    <TextField
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                        label="Username"
                                        fullWidth
                                        margin="normal"
                                    />
                                    <TextField
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        label="Password"
                                        type='password'
                                        margin="normal"
                                        fullWidth
                                    />

                                    <Button
                                        variant='contained'
                                        fullWidth
                                        sx={{
                                            margin: "1rem 0"
                                        }}
                                        disabled={isLoading}
                                        onClick={loginHandler}

                                    > Login
                                    </Button>

                                    <Typography

                                        sx={{
                                            textAlign: "center"
                                        }}
                                    >
                                        OR
                                    </Typography>
                                    <Button
                                        variant='contained'
                                        fullWidth
                                        sx={{
                                            margin: "1rem 0"
                                        }}
                                        disabled={isLoading}
                                        onClick={() => setIslogin(false)}

                                    > Sign up
                                    </Button>
                                </form>

                            </> :

                            <><Typography
                                variant='h5'
                                sx={{
                                    textAlign: "center"
                                }}
                            >Sign Up</Typography>
                                <form
                                    style={{
                                        width: "100%",
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        marginTop: "1rem"

                                    }}
                                >
                                    
                                    <TextField
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                        label="Name"
                                        fullWidth
                                        margin="normal"
                                    />
                                    <TextField
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        label="Email"
                                        margin="normal"
                                        fullWidth
                                    />
                                    <TextField
                                        type="number"
                                        value={mobile}
                                        onChange={(e) => setMobile(e.target.value)}
                                        required
                                        label="Mobile No."
                                        margin="normal"
                                        fullWidth
                                    />
                                    <TextField
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                        label="Username"
                                        fullWidth
                                        margin="normal"
                                    />
                                    <TextField
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        label="Password"
                                        type='password'
                                        margin="normal"
                                        fullWidth
                                    />

                                    <Button
                                        variant='contained'
                                        fullWidth
                                        sx={{
                                            margin: "1rem 0"
                                        }}
                                        disabled={isLoading}
                                        onClick={signUpHandler}

                                    > Sign Up
                                    </Button>

                                    <Typography

                                        sx={{
                                            textAlign: "center"
                                        }}
                                    >
                                        OR
                                    </Typography>
                                    <Button
                                        variant='contained'
                                        fullWidth
                                        sx={{
                                            margin: "1rem 0"
                                        }}
                                        disabled={isLoading}

                                        onClick={() => setIslogin(true)}

                                    > Login
                                    </Button>
                                </form>
                            </>
                    }
                </Paper>
            </Container>
        </div>
    )
}

export default Login