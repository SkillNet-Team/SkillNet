//Unit test

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Navbar from '../Navbar/Navbar';

test('Navbar renders logo and menu items', () => {
  const { getByAltText, getByText } = render(<Navbar />);
  
  // Check if logo is rendered
  const logoElement = getByAltText('Logo');
  expect(logoElement).toBeInTheDocument();

  // Check if menu items are rendered
  const homeMenuItem = getByText('Home');
  const aboutUsMenuItem = getByText('About Us');
  const resourcesMenuItem = getByText('Resources');
  const communityMenuItem = getByText('Community');
  expect(homeMenuItem).toBeInTheDocument();
  expect(aboutUsMenuItem).toBeInTheDocument();
  expect(resourcesMenuItem).toBeInTheDocument();
  expect(communityMenuItem).toBeInTheDocument();
});

test('Navbar toggles dropdown on click', () => {
  const { getByTestId, queryByTestId } = render(<Navbar />);
  
  // Check initial state: dropdown content should not be present
  expect(queryByTestId('dropdown-content')).toBeNull();

  // Click on dropdown button
  const dropdownButton = getByTestId('dropdown-toggle');
  fireEvent.click(dropdownButton);
  
  // Check after clicking: dropdown content should be present
  expect(queryByTestId('dropdown-content')).toBeInTheDocument();

  // Click again on dropdown button
  fireEvent.click(dropdownButton);
  
  // Check after second click: dropdown content should not be present again
  expect(queryByTestId('dropdown-content')).toBeNull();
});
