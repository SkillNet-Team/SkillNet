import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SignUp.css';

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [accepted, setAccepted] = useState(false); // Boolean state to change page content if data was processed correctly
  const [error, setError] = useState(null); // State to handle errors

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
  
    // Validate form data
    if (formData.firstName === '' || formData.lastName === '' || formData.email === '' || formData.password === '' || formData.confirmPassword === '') {
      setError('Please fill out all fields.'); // Set error message for missing fields
      return; // Exit early if there are missing fields
    }
  
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.'); // Set error message if passwords do not match
      return; // Exit early if passwords do not match
    }
  
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
  
      if (response.ok) {
        setAccepted(true);
        console.log(data);
      } else {
        setError(data.message); // Set error message from response
      }
    } catch (error) {
      console.error('Error signing up:', error);
      setError('An error occurred while signing up. Please try again later.');
    }
  };
  

  return (
    <div className={`signup-container ${(accepted) ? "green-bg" : ""}`}>
      {!(accepted) && (
        <>
          <h2>Sign Up</h2>
          <form onSubmit={handleSubmit} data-testid="signup-form">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <button type="submit">Sign Up</button>
          </form>
          <p>Already have an account? <Link to="/login">Log In</Link></p>
        </>
      )}
      {accepted && (
        <p>Your account has been created successfully!</p>
      )}
      {error && (
        <p className="error">{error}</p>
      )}
    </div>
  );
};

export default SignUp;
