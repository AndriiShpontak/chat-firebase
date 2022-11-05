import {LOGIN_ROUTE, CHAT_ROUTE} from './utils/consts';
import Login from './pages/Login';
import Chat from './pages/Chat';

export const loginRoute = [
    {
        path: LOGIN_ROUTE,
        Component: Login
    }
]

export const chatRoute = [
    {
        path: CHAT_ROUTE,
        Component: Chat
    }
]