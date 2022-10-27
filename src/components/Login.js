import React, { useContext } from 'react';
import { Container } from '@mui/system';
import { Grid } from '@mui/material';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box'
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";


import {Context} from '../index';

const Login = () => {
    const {auth} = useContext(Context);

    const login = async () => {
        const provider = new GoogleAuthProvider();
        const {user} = await signInWithPopup(auth, provider);
        console.log(user);
    }

    return (
        <Container>
            <Grid container
                  style={{height: window.innerHeight - 50}}
                  alignItems={"center"}
                  justifyContent={"center"}
            >
                <Grid style={{width: 400, background: 'lightblue'}}
                      container
                      alignItems={"center"}
                      direction={"column"}
                >
                    <Box p={5}>
                        <Button onClick={login}>Log in with google</Button>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Login;