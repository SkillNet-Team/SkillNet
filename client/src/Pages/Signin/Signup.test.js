// signup.test.js

import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter
import SignUp from './SignUp';

describe('Signup integration tests', () => {
  it('should allow user to sign up with valid credentials', async () => {
    // Mock the fetch function to return a successful response
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ message: 'User created successfully!' }),
    });
    // jest.spyOn(global, 'fetch')

    const { getByLabelText, getByText } = render(
      <Router>
        <SignUp />
      </Router>
    );

    // Fill out the form with valid credentials
    
    fireEvent.change(getByLabelText('First Name'), { target: { value: 'jow' } });
    fireEvent.change(getByLabelText('Last Name'), { target: { value: 'drop' } });
    fireEvent.change(getByLabelText('Email'), { target: { value: 'rufus@example.com' } });
    fireEvent.change(getByLabelText('Password'), { target: { value: 'password123' } });
    fireEvent.change(getByLabelText('Confirm Password'), { target: { value: 'password123' } });

    // Submit the form
    await act(async () => {
        fireEvent.click(getByText('sign up'))
    });

    // Wait for the submission to be processed
    await waitFor(() => {
      // Ensure fetch is called with the correct endpoint and request body
      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:5000/api/users/signup',
        {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstName: 'jow',
            lastName: 'drop',
            email: 'rufus@example.com',
            password: 'password123',
            confirmPassword: 'password123'
          }),
        });
    });
    console.log(document.body.innerHTML)

    // Verify that success message is displayed
    expect(getByText('Your account has been created successfully!')).toBeInTheDocument();
  });
});
