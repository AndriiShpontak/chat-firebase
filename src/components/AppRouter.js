import React from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import { privateRoutes, publickRoutes } from '../routes';
import { CHAT_ROUTE, LOGIN_ROUTE } from '../utils/consts';

const AppRouter = () => {
    const user = false;
    return user ?
        (
            <Routes>
                {privateRoutes.map(({path, Component}) =>
                    <Route path={path} element={<Component/>}/>
                )}
                <Route path='/chat' element={<Navigate  to={CHAT_ROUTE}/>}/>
            </Routes>
        )
        :
        (
            <Routes>
                {publickRoutes.map(({path, Component}) =>
                    <Route path={path} element={<Component/>}/>
                )}
                <Route path='/login' element={<Navigate  to={LOGIN_ROUTE}/>}/>
            </Routes>
        )
};

export default AppRouter;