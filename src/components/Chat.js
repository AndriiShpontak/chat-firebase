import React, {useContext, useState} from 'react';
import {useAuthState} from "react-firebase-hooks/auth";
import Avatar from '@mui/material/Avatar';
import { Container } from '@mui/system';
import { Grid } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {useCollectionData} from 'react-firebase-hooks/firestore'; 
import { collection } from 'firebase/firestore'; 

import { Context } from '../index';
import Loader from './Loader';

const Chat = () => {
    const {auth, firestore} = useContext(Context);
    const [user] = useAuthState(auth);
    const [value, setValue] = useState('');
    const [messages , loading] = useCollectionData(
        collection('messages').orderBy('createdAt')
    );

    const sendMessage = async () => {
        firestore.collection('messages').add({
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
            text: value,
            createdAt: firestore.FieldValue.serverTimestamp()
        })
        setValue('')
    }

    if (loading) {
        return <Loader/>
    }

    return (
        <Container>
            <Grid container
                  justifyItems={"center"}
                  style={{height: window.innerHeight - 50, marginTop: 20, backgroundImage: 'https://lh3.googleusercontent.com/-Uwd8Cr-7C5g/WdIaWHqBnWI/AAAAAAAANmc/Mdv_tZIIRnIOR_zvAJJ0VuztB1Q9k50bwCHMYCw/s1600/whatsapp.jpg'}}>
                <div style={{width: '80%', height: '60vh', border: '5px solid gray', overflowY: 'auto'}}>
                    {messages.map(message => 
                            <div style={{
                                margin: 10,
                                border: user.uid === message.uid ? '2px solid green' : '2px solid red',
                                marginLeft: user.uid === message.uid ? 'auto' : '10px',
                                width: 'fit-content',
                                padding: 5
                            }}>
                                <Grid container>
                                    <Avatar src={message.photoURL}/>
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
                    style={{width: '80%'}}
                >
                    <TextField 
                        fullWidth
                        rowsMax={2}
                        variant={"outlined"}
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />
                    <Button onClick={sendMessage} variant={"outlined"}>Send</Button>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Chat;