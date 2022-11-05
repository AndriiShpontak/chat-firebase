import { useContext } from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import {useAuthState} from 'react-firebase-hooks/auth';

import {Context} from './index';
import Navbar from './components/Navbar';
import AppRouter from './components/AppRouter';
import Loader from './components/Loader';

import './App.css';

function App() {
  const {auth} = useContext(Context);
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return <Loader/>
  }

  return (
      <BrowserRouter>
        <Navbar/>
        <div>
          <Link to="/">Home</Link> <Link to="/login">Go to login</Link> <Link to="/chat">Go to chat</Link>
        </div>
        <AppRouter/>
      </BrowserRouter>
  );
}

export default App;
