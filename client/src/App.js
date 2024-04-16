import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'; // Import your main CSS file for styling
import Navbar from './Navbar/Navbar';
import Join from './Pages/JoinUs/Join'; 
import Home from './Pages/HomePage/Home';
import PersonalProfile from './Pages/Profile/PersonalProfile';
import SignUp from './Pages/Signin/SignUp';
import Login from './Pages/Signin/Login';
import About from './Pages/AboutUs/About';
import SwapRequests from './Pages/Requests/Requests'; // Import the SwapRequests component

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
  const [backendData, setBackendData] = useState([]);

  useEffect(() => {
    fetch("/api/users")
      .then(response => response.json())
      .then(data => {
        setBackendData(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  // Function to handle login
  const handleLogin = () => setIsLoggedIn(true);

  // Function to handle logout
  const handleLogout = () => setIsLoggedIn(false);

  return (
    <Router>
      <div>
        {/* Conditional rendering of Navbar based on login status */}
        <Navbar isLoggedIn={isLoggedIn} handleLogin={handleLogin} handleLogout={handleLogout} />
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={ // Adjusted the Route component
              <div>
                <h1>Welcome to SkillNet</h1>
                {backendData.length === 0 ? (
                  <p>Start building SkillNet</p>
                ) : (
                  backendData.map((user, i) => (
                    <p className="user-display" key={i}>{user.firstName} {user.lastName} | {user.email}</p>
                  ))
                )}
              </div>
            } />
            <Route path="/join" element={<Join />} /> 
            <Route path="/home" element={<Home />} />
            <Route path="aboutus" element={<About />} />
            <Route path="/signup" element={<SignUp />} /> 
            <Route path="/login" element={<Login onLoginSuccess={handleLogin} />} />
            <Route path="/personalprofile" element={<PersonalProfile />} /> 
            <Route path="/swaprequests" element={<SwapRequests />} /> {/* Add Route for SwapRequests */}
          </Routes>
        </div>
      </div>
    </Router>
    
  );
}

export default App;