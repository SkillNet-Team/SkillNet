import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../Pages/HomePage/Home'; // Adjust the import path to where your Home component is located

describe('Home Component', () => {
  test('renders "Welcome to Our Website" as a header', () => {
    render(<Home />);

    // Check if the "Welcome to Our Website" header is in the document
    expect(screen.getByRole('heading', { name: 'Welcome to Our Website' })).toBeInTheDocument();
  });
});
