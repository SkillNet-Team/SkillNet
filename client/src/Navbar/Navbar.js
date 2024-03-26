import React, { useState, useEffect } from 'react';
import './Navbar.css'; // Import the CSS file for styling
import logo from '../Images/logo.png'; // Import the logo image
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt, faMoon, faSun } from '@fortawesome/free-solid-svg-icons'; // Import icons for dark mode button

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(getInitialMode()); // State to track dark mode

  // Function to get initial dark mode preference from local storage or system preference
  function getInitialMode() {
    const savedMode = JSON.parse(localStorage.getItem('darkMode'));
    if (savedMode !== null) {
      return savedMode;
    } else {
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
  }

  // Function to toggle dark mode state and update local storage
  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
    const body = document.body;
    if (body.classList.contains('dark-mode')) {
      body.classList.remove('dark-mode');
    } else {
      body.classList.add('dark-mode');
    }
  };
  


  // Apply dark mode class on component mount
  useEffect(() => {
    document.body.classList.toggle('dark-mode', isDarkMode);
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    // Implement your logout functionality here
    console.log("Logout clicked");
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <a href="/join">
          <img src={logo} alt="Logo" /> {/* Wrap logo inside anchor tag */}
        </a>
      </div>
      <ul className="navbar-menu">
        <li><a href="/home">Home</a></li>
        <li><a href="/aboutus">About Us</a></li>
        <li><a href="/resources">Resources</a></li>
        <li><a href="/community">Community</a></li>
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
            <div className="dropdown-content">
              <a href="/profile">Profile</a>
              <button onClick={handleLogout}>Log Out</button>
            </div>
          )}
        </div>
        {/* Dark mode button */}
        <button onClick={toggleDarkMode} className="dark-mode-button" data-testid="dark-mode-button" data-dark-mode={isDarkMode}>
  <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} size="2x" />
</button>

      </div>
    </nav>
  );
};

export default Navbar;