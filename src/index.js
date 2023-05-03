import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

firebase.initializeApp({
  apiKey: "AIzaSyCAzY7F5iMQPZLQa9Cbo6LyVSkFXPsKzsI",
  authDomain: "challenge-31010.firebaseapp.com",
  databaseURL: "https://challenge-31010-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "challenge-31010",
  storageBucket: "challenge-31010.appspot.com",
  messagingSenderId: "350911309103",
  appId: "1:350911309103:web:d90957ac42e575b4456dda"
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
