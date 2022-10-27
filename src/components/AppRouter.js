import React, {useContext} from 'react';
import {Route, Routes} from 'react-router-dom';
import { privateRoutes, publickRoutes } from '../routes';
import { CHAT_ROUTE, LOGIN_ROUTE } from '../utils/consts';
import {useAuthState} from 'react-firebase-hooks/auth';

import { Context } from '../index';

const AppRouter = () => {
    const {auth} = useContext(Context);
    const [user] = useAuthState(auth);
    
    return user ?
        (
            <Routes>
                {privateRoutes.map(({path, Component}) =>
                    <Route key={path} path={path} element={<Component/>}/>
                )}
                <Route  to={CHAT_ROUTE}/>
            </Routes>
        )
        :
        (
            <Routes>
                {publickRoutes.map(({path, Component}) =>
                    <Route key={path} path={path} element={<Component/>}/>
                )}
                <Route  to={LOGIN_ROUTE}/>
            </Routes>
        )
};

export default AppRouter;