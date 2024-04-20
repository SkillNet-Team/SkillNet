import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'; // Import your main CSS file for styling
import Navbar from './Navbar/Navbar';
import Join from './Pages/JoinUs/Join';
import Home from './Pages/HomePage/Home';
import PersonalProfile from './Pages/Profile/PersonalProfile';
import SignUp from './Pages/Signin/SignUp';
import Login from './Pages/Signin/Login';
import SwapRequests from './Pages/Requests/Requests';
import Inbox from './Pages/Messages/Inbox';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to handle login
  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true'); // Store login status in local storage
  };

  // Function to handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.setItem('isLoggedIn', 'false'); // Store login status in local storage
    localStorage.removeItem("user");
  };

  return (
    <Router>
      <div>
        {/* Conditional rendering of Navbar based on login status */}
        <Navbar isLoggedIn={isLoggedIn} handleLogin={handleLogin} handleLogout={handleLogout} />

        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<Join />} />
            <Route path="/home" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login onLoginSuccess={handleLogin} />} />
            <Route path="/personalprofile" element={<PersonalProfile isLoggedIn={isLoggedIn} />} /> {/* Pass isLoggedIn prop */}
            <Route path="/swaprequests" element={<SwapRequests />} />
            <Route path="/messages" element={<Inbox />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
