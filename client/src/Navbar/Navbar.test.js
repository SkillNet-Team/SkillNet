import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Navbar from '../Navbar/Navbar';

describe('Navbar', () => {
  it('should toggle dark mode when dark mode button is clicked', () => {
    const { getByTestId } = render(<Navbar />);
    const darkModeButton = getByTestId('dark-mode-button');

    // Initially, dark mode should be off
    expect(document.body.classList.contains('dark-mode')).toBeTruthy();

    // Click the dark mode button
    fireEvent.click(darkModeButton);

    // After clicking, dark mode should be on
    expect(document.body.classList.contains('dark-mode')).toBeFalsy();

    // Click the dark mode button again
    fireEvent.click(darkModeButton);

    // After clicking again, dark mode should be off
    expect(document.body.classList.contains('dark-mode')).toBeTruthy();
  });

  it('should render the logo', () => {
    const { getByAltText } = render(<Navbar />);
    const logo = getByAltText('Logo');
    expect(logo).toBeInTheDocument();
  });
});