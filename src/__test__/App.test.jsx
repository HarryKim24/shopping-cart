import { describe, test, expect } from "vitest";  
import { render, screen } from "@testing-library/react";  
import { BrowserRouter } from 'react-router-dom';
import App from "../App";

const MockApp = () => {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};

describe('header and paragraph', () => {
  test('should render heading', () => {
    render(<MockApp />);
    const headerElement = screen.getByRole('heading', {
      name: 'Welcome to Our Website!',
    });
    expect(headerElement).toBeInTheDocument();
  });

  test('should render paragraph', () => {
    render(<MockApp />);
    const paragraphElement = screen.getByText(
      'This website is a simulated online shopping mall that features a shopping cart. Users can browse various products and add the items they want to the cart. In the cart, users can adjust the quantity of items or remove them. However, the website does not include an actual payment feature.'
    );
    expect(paragraphElement).toBeInTheDocument();
  });
});
