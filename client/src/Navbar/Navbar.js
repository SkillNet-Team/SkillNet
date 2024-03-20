import React, { useState, useEffect } from 'react';
import './Navbar.css';
import logo from '../Images/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt, faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

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
    const body = document.body;
    if (body.classList.contains('dark-mode')) {
      body.classList.remove('dark-mode');
    } else {
      body.classList.add('dark-mode');
    }
  };

  useEffect(() => {
    document.body.classList.toggle('dark-mode', isDarkMode);
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
      {isLoggedIn ? (
        <>
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
                <div className="dropdown-content" onClick={handleDropdownClick}>
                  <a href="/personalprofile">Profile</a>
                  <button onClick={handleLogout}>Log Out</button>
                </div>
              )}
            </div>
          </div>
          {/* Adjusted dark mode button */}
          <button onClick={toggleDarkMode} className="dark-mode-button" data-testid="dark-mode-button" data-dark-mode={isDarkMode}>
            <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} size="1x" /> {/* Adjusted size to 1x */}
          </button>
        </>
      ) : (
        <div className="navbar-login">
          <button onClick={handleLogin}>Login</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
