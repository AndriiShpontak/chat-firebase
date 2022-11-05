import React, {useContext} from 'react';
import {Route, Routes} from 'react-router-dom';
import {useAuthState} from 'react-firebase-hooks/auth';

import { Context } from '../index';
import Login from '../pages/Login';
import Chat from '../pages/Chat';

const AppRouter = () => {
    const {auth} = useContext(Context);
    const [user] = useAuthState(auth);
    const path = user ? '/chat' : '/login';
    const element = user ? <Chat /> : <Login />;
    
    return(
       
        <Routes>
                <Route path={path} element={element}/>
        </Routes>)
};

export default AppRouter;