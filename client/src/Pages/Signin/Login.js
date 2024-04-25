import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css'; // Reusing the same CSS file

const Login = ({ onLoginSuccess }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState(''); // New state to handle errors

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(formData);

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      // console.log(data);

      if (response.ok) {
        onLoginSuccess();
        navigate('/home');
        localStorage.setItem('user', JSON.stringify(data));
        console.log(data);
      } 
      else {
        setError(data.message);
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Request failed:', error);
      setError("Failed to connect to the server. Please check your connection and try again.");
    }
  };

  return (
    <div className="signup-container">
      <h2>Login</h2>
      {error && <div class-name="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
