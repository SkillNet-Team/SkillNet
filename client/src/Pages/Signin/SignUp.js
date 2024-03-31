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
  const [error, setError] = useState(''); // New state to handle errors

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    console.log(formData);
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
  
      if (response.ok) {
        setAccepted(true);
        console.log(data);
      }
      else {
        setError(data.message);
        return;
      }
    }
    catch (error) {
      console.error('Error during fetching', error);
      setError("Failed to connect to the server. Please check your connection and try again.");
    }
  };

  return (
    <div className={`signup-container ${(accepted) ? "green-bg" : ""}`}>
      {!(accepted) && (
        <>
          <h2>Sign Up</h2>
          {error && <div class-name="error-message">{error}</div>}
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <input
              type="password"
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
      {(accepted) && (
        <p>Your account has been created successfully!</p>
      )}
    </div>
  );
};

export default SignUp;
