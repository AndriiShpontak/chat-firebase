import React, { useContext, useState } from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import Avatar from '@mui/material/Avatar';
import Container from '@mui/system/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import firebase from 'firebase';

import { Context } from '../index';
import Loader from '../components/Loader';

const Chat = () => {
    const { auth, firestore } = useContext(Context);
    const [user] = useAuthState(auth);
    const [value, setValue] = useState('');
    const [messages, loading] = useCollectionData(
        firestore.collection('messages').orderBy('createdAt')
    );

    const bgImage = `url('https://mir-s3-cdn-cf.behance.net/project_modules/disp/aec89173426833.5c08f56351139.png')`;

    const sendMessage = async () => {
        firestore.collection('messages').add({
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
            text: value,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        })
        setValue('')
    }

    if (loading) {
        return <Loader />
    }

    return (
        <Container>
            <Grid
                container
                justifyItems={"center"}
                style={{ height: window.innerHeight - 50, marginTop: 20 }}
            >
                <div style={{ width: '80%', height: '60vh', border: '5px solid gray', borderRadius: 15, overflowY: 'auto', backgroundImage: bgImage}}>
                    {messages.map((message, index) =>
                        <div
                            key={index}
                            style={{
                                margin: 10,
                                border: user.uid === message.uid ? '2px solid green' : '2px solid red',
                                marginLeft: user.uid === message.uid ? 'auto' : '10px',
                                width: 'fit-content',
                                padding: 5
                            }}
                        >
                            <Grid container>
                                <Avatar src={message.photoURL} />
                                <div>{message.displayName}</div>
                            </Grid>
                            <div>{message.text}</div>
                        </div>
                    )}
                </div>
                <Grid
                    container
                    direction={"column"}
                    alignItems={"flex-end"}
                    style={{ width: '80%' }}
                >
                    <TextField
                        fullWidth
                        rows={2}
                        variant={"standard"}
                        style={{ border: '5px solid gray', borderRadius: 15 }}
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />
                    <Button onClick={sendMessage}
                        variant={"outlined"}>Send</Button>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Chat;