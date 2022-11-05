import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from '@mui/system';
import { Box, Button, Grid } from '@mui/material';
import firebase from 'firebase';


import {Context} from '../index';

const Login = () => {
    const {auth} = useContext(Context);
    const navigate = useNavigate()

    const login = async () => {
        try {
            const provider = new firebase.auth.GoogleAuthProvider();
            const {user} = await auth.signInWithPopup(provider);
            if (user) {
                navigate('/chat');
            }
        } catch (e) {
            console.log(e);
        }
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