import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { app } from './Components/Database/Firebase';
import './App.css';
import Welcome from './Components/Welcome/Welcome';
import Signup from './Components/Authentication/Signup';
import Login from './Components/Authentication/Login';
import MailClient from './Components/MailClient/MailClient';
import Compose from './Components/MailClient/Compose';
import Inbox from './Components/MailClient/Inbox';
import Starred from './Components/MailClient/Starred';
import Sent from './Components/MailClient/Sent';
import Trash from './Components/MailClient/Trash';
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = auth.onAuthStateChanged(user => {
      setIsLoggedIn(!!user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Routes>
      <Route path="/" element={isLoggedIn ? <Navigate to="/MailBox" /> : <Welcome />} />
      <Route path="/Login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
      <Route path="/Signup" element={<Signup />} />
      <Route path="/MailBox/*" element={<MailClient setIsLoggedIn={setIsLoggedIn} />} >
        <Route path="Compose" element={<Compose />} />
        <Route path="Inbox" element={<Inbox />} />
        <Route path="Starred" element={<Starred />} />
        <Route path="Sent" element={<Sent />} />
        <Route path="Trash" element={<Trash />} />
      </Route>
    </Routes>
  );
};
export default App;