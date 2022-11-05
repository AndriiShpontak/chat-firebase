import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import firebase from "firebase";
import 'firebase/firestore';
import 'firebase/auth';

import './index.css';

firebase.initializeApp({
  apiKey: "AIzaSyDHlnwoxMSI2RAAdqOjTyWJau14mFkcBvI",
  authDomain: "chat-react-as.firebaseapp.com",
  projectId: "chat-react-as",
  storageBucket: "chat-react-as.appspot.com",
  messagingSenderId: "149567352749",
  appId: "1:149567352749:web:afda2fd716d1e06c73bb24",
  measurementId: "G-RHN0PHYM3G"
} 
);

export const Context = createContext(null);

const auth = firebase.auth();
const firestore = firebase.firestore();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Context.Provider value={{
    firebase,
    auth,
    firestore
  }}>
    <App/>
  </Context.Provider>
);