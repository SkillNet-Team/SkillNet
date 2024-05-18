jest.mock('./Navbar.css', () => ({})); // Mock the CSS file import
jest.mock('../Images/logo.png', () => 'logo.png');

import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter
import fetchMock from 'jest-fetch-mock';
import Navbar from './Navbar';

//babel-jest will be used for transforming modules
import '@babel/preset-env';
import '@babel/preset-react';

describe('Navbar component', () => {
  it('navigates to home page when "Home" button is clicked', () => {
    // Render the Navbar component inside MemoryRouter
    render(
      <MemoryRouter>
        {React.createElement(Navbar)}
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Home'));


    // Check if the page navigates to the correct URL
    expect(window.location.pathname).toBe('/');
  });

  //checks if the navbar redirects the user to the correct page despite receiving an error
  beforeEach(() => {
    fetchMock.resetMocks();
  });
  it('handles link click even if an error occurs', () => {
    // Render the Navbar component
    render(React.createElement(Navbar));

    // Simulate a user clicking on the link in the navbar
    fireEvent.click(getByText('Resources'));

    // Assert that navigation behavior works as expected
    // For example, you might check the current URL or navigate to a different page

    // Introduce an error condition (mocking an API call, for example)
    // For demonstration purposes, let's simulate an error by throwing an exception
    jest.spyOn(console, 'error').mockImplementation(() => {});
    jest.spyOn(global, 'fetch').mockRejectedValueOnce(new Error('API Error'));

    // Simulate clicking on the link again
    fireEvent.click(getByText('Resources'));

    // Wait for the navigation behavior to complete
    await waitFor(() => {
        // Assert that the navigation occurred despite the fetch error
        expect(window.location.pathname).toBe('/resources');
      }, { timeout: 3000 }); 
    });




});
