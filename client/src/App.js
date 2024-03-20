import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'; // Assuming you have some CSS file for styling
import Navbar from './Navbar/Navbar';
import Join from './Pages/JoinUs/Join'; 
import Home from './Pages/HomePage/Home';
import PersonalProfile from './Pages/Profile/PersonalProfile';
import SignUp from './Pages/Signin/SignUp';
import Login from './Pages/Signin/Login';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
  const [backendData, setBackendData] = useState([]);

  useEffect(() => {
    fetch("/api")
      .then(response => response.json())
      .then(data => {
        setBackendData(data.users);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  // Function to handle login
  const handleLogin = () => {
    // Logic to handle login
    setIsLoggedIn(true);
  };

  // Function to handle logout
  const handleLogout = () => {
    // Logic to handle logout
    setIsLoggedIn(false);
  };

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
                    <p key={i}>{user}</p>
                  ))
                )}
              </div>
            } />
            <Route path="/join" element={<Join />} /> 
            <Route path="/home" element={<Home />} />
            <Route path="/signup" element={<SignUp />} /> 
            <Route path="/login" element={<Login />} /> 
            <Route path="/personalprofile" element={<PersonalProfile />} /> 
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;