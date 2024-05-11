import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from './Login';

//babel-jest will be used for transforming modules
import '@babel/preset-env';
import '@babel/preset-react';

describe('Login component', () => {
    it('renders email and password inputs', () => {
        render(React.createElement(Login));
        expect(screen.getByPlaceholderText('Email')).toBeTruthy();
        expect(screen.getByPlaceholderText('Password')).toBeTruthy();
    });

    it('handles login without credentials', async () => {
        // Mock any login API request or function
        const mockLogin = jest.fn();

        // Render the Login component
        render(React.createElement(Login, { onLogin: mockLogin }));

        // Find the submit button and simulate a click event without entering any credentials
        const submitButton = screen.getByRole('button', { name: 'Login' });
        fireEvent.click(submitButton);

        // Wait for the login process to finish
        await waitFor(() => expect(mockLogin).not.toHaveBeenCalled());

        // Check if the component handles login without credentials appropriately
        // Check if the component remains on the login page
        expect(screen.getByRole('button', { name: 'Login' })).toBeDefined();
        expect(screen.getByPlaceholderText('Email')).toBeDefined();
        expect(screen.getByPlaceholderText('Password')).toBeDefined();
    });
    
});
