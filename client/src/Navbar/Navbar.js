import React, { useState, useEffect } from 'react';
import './Navbar.css';
import logo from '../Images/logo.png';
import { Link } from 'react-router-dom'; // Import Link component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSun, faMoon, faEnvelope } from '@fortawesome/free-solid-svg-icons'; // Import envelope icon for messages

const Navbar = ({ isLoggedIn, handleLogin, handleLogout }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(getInitialMode());

  function getInitialMode() {
    const savedMode = JSON.parse(localStorage.getItem('darkMode'));
    if (savedMode !== null) {
      return savedMode;
    } else {
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
  }

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
    localStorage.setItem('darkMode', JSON.stringify(!isDarkMode)); // Save mode to local storage
  };

  useEffect(() => {
    const body = document.body;
    if (isDarkMode) {
      body.classList.add('dark-mode');
    } else {
      body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleDropdownClick = (event) => {
    event.stopPropagation(); // Prevent event propagation
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <a href="/join">
          <img src={logo} alt="Logo" />
        </a>
      </div>
      <ul className="navbar-menu">
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/swaprequests">Swap Requests</Link></li>
        <li><Link to="/aboutus">About Us</Link></li>
        <li><Link to="/resources">Resources</Link></li>
        <li><Link to="/community">Community</Link></li>
      </ul>
      <div className="navbar-search">
        <input type="text" placeholder="Search" />
        <button>Search</button>
      </div>
      <div className="navbar-profile">
        <div className="dropdown">
          <button onClick={toggleDropdown} className="dropbtn">
            <FontAwesomeIcon icon={faUser} size="2x" className="user-icon" />
          </button>
          {isDropdownOpen && (
            <div className="dropdown-content" onClick={handleDropdownClick}>
              <a href="/personalprofile">Profile</a>
              <a href="/messages">Messages</a> {/* Add Messages option */}
              <button onClick={handleLogout}>Log Out</button>
            </div>
          )}
        </div>
      </div>
      {/* Adjusted dark mode button */}
      <button onClick={toggleDarkMode} className="dark-mode-button" data-testid="dark-mode-button" data-dark-mode={isDarkMode}>
        <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} size="1x" /> {/* Adjusted size to 1x */}
      </button>
    </nav>
  );
};

export default Navbar;
