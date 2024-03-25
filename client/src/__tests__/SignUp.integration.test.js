import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import SignUp from '../Pages/Signin/SignUp';
import { BrowserRouter as Router } from 'react-router-dom';

describe('Integration tests for signing up', () => {
  beforeEach(() => {
    jest.restoreAllMocks(); // Restore mocked functions before each test
  });

  it('should allow user to sign up with valid input', async () => {
    // Mock the fetch function to return a successful response
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ message: 'User created successfully!' }),
    });

    const { getByLabelText, getByTestId, findByText } = render(
      <Router>
        <SignUp />
      </Router>
    );

    // Fill out the form with valid credentials
    fireEvent.change(getByLabelText('First Name'), { target: { value: 'John' } });
    fireEvent.change(getByLabelText('Last Name'), { target: { value: 'Doe' } });
    fireEvent.change(getByLabelText('Email'), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(getByLabelText('Password'), { target: { value: 'password123' } });
    fireEvent.change(getByLabelText('Confirm Password'), { target: { value: 'password123' } });

    // Submit the form
    await act(async () => {
      fireEvent.submit(getByTestId('signup-form'));
    });

    // Assert
    const successMessage = await findByText('Your account has been created successfully!');
    expect(successMessage).toBeInTheDocument();
  });

  it('should display error message if sign up fails', async () => {
    // Mock the fetch function to return an error response
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: false,
      status: 400,
      json: () => Promise.resolve({ message: 'Invalid data provided' }), // Mimicking an error response from the server
    });

    const { getByLabelText, getByTestId, findByText } = render(
      <Router>
        <SignUp />
      </Router>
    );

    // Fill out the form with valid credentials
    fireEvent.change(getByLabelText('First Name'), { target: { value: 'John' } });
    fireEvent.change(getByLabelText('Last Name'), { target: { value: '' } });
    fireEvent.change(getByLabelText('Email'), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(getByLabelText('Password'), { target: { value: 'password' } });
    fireEvent.change(getByLabelText('Confirm Password'), { target: { value: 'password123' } });

    // Submit the form
    await act(async () => {
      fireEvent.submit(getByTestId('signup-form'));
    });

    // Assert that the error message is displayed
    const errorMessage = await findByText("An error occurred while signing up. Please try again later.");
    expect(errorMessage).toBeInTheDocument();
  });
});
