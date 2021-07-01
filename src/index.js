import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAlTZgtQG93vxOX-kWn-H_Oub0yJkQAaH8",
  authDomain: "cartapp-ad677.firebaseapp.com",
  projectId: "cartapp-ad677",
  storageBucket: "cartapp-ad677.appspot.com",
  messagingSenderId: "449809670042",
  appId: "1:449809670042:web:835ab1f48e7afbbe7a6423",
  measurementId: "G-02H3JSD5R5"
};

  firebase.initializeApp(firebaseConfig)


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
