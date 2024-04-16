import React, { useState, useEffect } from 'react';
import './Navbar.css';
import logo from '../Images/logo.png';
import { Link } from 'react-router-dom'; // Import Link component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSun, faMoon } from '@fortawesome/free-solid-svg-icons'; 

const Navbar = ({ isLoggedIn, handleLogout }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(getInitialMode());
  const [isMounted, setIsMounted] = useState(false); // New state variable

  function getInitialMode() {
    const savedMode = JSON.parse(localStorage.getItem('darkMode'));
    if (savedMode !== null) {
      return savedMode;
    } else {
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
  }

  useEffect(() => {
    setIsMounted(true); // Set isMounted to true when component mounts
    setIsDarkMode(getInitialMode()); // Initialize isDarkMode
  }, []);

  useEffect(() => {
    const body = document.body;
    if (isMounted && isDarkMode !== null) {
      if (isDarkMode) {
        body.classList.add('dark-mode');
      } else {
        body.classList.remove('dark-mode');
      }
    }
  }, [isDarkMode, isMounted]);

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
    localStorage.setItem('darkMode', JSON.stringify(!isDarkMode)); // Save mode to local storage
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleDropdownClick = (event) => {
    event.stopPropagation(); // Prevent event propagation
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/join"> {/* Use Link component for navigation */}
          <img src={logo} alt="Logo" />
        </Link>
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
      {/* Conditional rendering of profile icon with dropdown */}
      {isLoggedIn && (
        <div className="navbar-profile">
          <div className="dropdown">
            <button onClick={toggleDropdown} className="dropbtn">
              <FontAwesomeIcon icon={faUser} size="2x" className="user-icon" />
            </button>
            {isDropdownOpen && (
              <div className="dropdown-content" onClick={handleDropdownClick}>
                <a href="/personalprofile">Profile</a>
                <a href="/messages">Messages</a> {/* Add Messages option */}
                <button onClick={handleLogout}>Log Out</button> {/* Call handleLogout on click */}
              </div>
            )}
          </div>
        </div>
      )}
      {/* Dark mode toggle button */}
      <button onClick={toggleDarkMode} className="dark-mode-button" data-testid="dark-mode-button" data-dark-mode={isDarkMode}>
        <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} size="1x" /> {/* Adjusted size to 1x */}
      </button>
    </nav>
  );
};

export default Navbar;
