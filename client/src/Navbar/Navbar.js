import React, { useState } from 'react';
import './Navbar.css'; // Import the CSS file for styling
import logo from '../Images/logo.png'; // Import the logo image
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    // Implement your logout functionality here
    console.log("Logout clicked");
  };

  const handleDropdownClick = (event) => {
    event.stopPropagation(); // Prevent event propagation
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
            <div className="dropdown-content" onClick={handleDropdownClick}>
              <a href="/personalprofile">Profile</a>
              <button onClick={handleLogout}>Log Out</button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;