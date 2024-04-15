import React, { useState, useEffect } from 'react';
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopyright } from '@fortawesome/free-regular-svg-icons';
import { faFacebook, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';


const Footer = () => {

  return (
    <div className="footer"> 
      <nav className="navbar">
        <div className="copyright_text">
          <ul className="navbar-menu">
            <li><FontAwesomeIcon icon={faCopyright}/></li>
            <li>SkillNet all rights reserved</li>
          </ul>
        </div>
        
        <ul className="navbar-menu">
          <li>
            <a href="https://www.facebook.com/"> 
              <FontAwesomeIcon icon={faFacebook} size="2x" style={{color: "#316FF6",}}/> 
            </a> 
          </li>
          <li>
            <a href="https://www.instagram.com/">
              <FontAwesomeIcon icon={faInstagram} size="2x"/>

            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/">
              <FontAwesomeIcon icon={faLinkedin} size="2x" style={{color: "#0077B5",}}/>
            </a>
          </li>
        </ul>
        
        


        
      </nav>
    </div>
  );
};

export default Footer;