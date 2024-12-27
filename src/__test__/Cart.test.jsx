/* eslint-disable no-undef */
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Cart from '../pages/Cart';
import CartActions from '../hooks/CartActions';
import calculateTotal from '../utils/calculateTotal';
import handleCheckout from '../utils/HandleCheckout';

vi.mock('../hooks/CartActions', () => ({
  default: vi.fn().mockReturnValue({
    cart: [
      { id: 1, title: 'Product 1', price: 10.99, quantity: 2, image: 'https://via.placeholder.com/150' },
      { id: 2, title: 'Product 2', price: 5.99, quantity: 1, image: 'https://via.placeholder.com/150' },
    ],
    increaseQuantity: vi.fn(),
    decreaseQuantity: vi.fn(),
    removeItem: vi.fn(),
  }),
}));

vi.mock('../utils/calculateTotal', () => ({
  default: vi.fn().mockReturnValue(27.97),
}));

vi.mock('../utils/HandleCheckout', () => ({
  default: vi.fn(),
}));

describe('Cart Component', () => {
  const mockIncreaseQuantity = vi.fn();
  const mockDecreaseQuantity = vi.fn();
  const mockRemoveItem = vi.fn();
  const mockCart = [
    { id: 1, title: 'Product 1', price: 10.99, quantity: 2, image: 'https://via.placeholder.com/150' },
    { id: 2, title: 'Product 2', price: 5.99, quantity: 1, image: 'https://via.placeholder.com/150' },
  ];
  const mockCalculateTotal = vi.fn().mockReturnValue(27.97);

  beforeEach(() => {
    CartActions.mockReturnValue({
      cart: mockCart,
      increaseQuantity: mockIncreaseQuantity,
      decreaseQuantity: mockDecreaseQuantity,
      removeItem: mockRemoveItem,
    });

    calculateTotal.mockReturnValue(mockCalculateTotal());
    handleCheckout.mockClear();
  });

  test('renders cart items and details', () => {
    render(
      <Router>
        <Cart />
      </Router>
    );

    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Quantity: 2')).toBeInTheDocument();
    expect(screen.getByText('Price: $10.99')).toBeInTheDocument();
    expect(screen.getByText('Total: $21.98')).toBeInTheDocument();

    expect(screen.getByText('Product 2')).toBeInTheDocument();
    expect(screen.getByText('Quantity: 1')).toBeInTheDocument();
    expect(screen.getByText('Price: $5.99')).toBeInTheDocument();
    expect(screen.getByText('Total: $5.99')).toBeInTheDocument();

    expect(screen.getByText('Total: $27.97')).toBeInTheDocument();
  });

  test('displays "Your cart is empty" when cart is empty', () => {
    CartActions.mockReturnValue({
      cart: [],
      increaseQuantity: mockIncreaseQuantity,
      decreaseQuantity: mockDecreaseQuantity,
      removeItem: mockRemoveItem,
    });

    render(
      <Router>
        <Cart />
      </Router>
    );

    expect(screen.getByText('Your cart is empty.')).toBeInTheDocument();
  });

  test('calls increaseQuantity when "+" button is clicked', () => {
    render(
      <Router>
        <Cart />
      </Router>
    );

    const increaseButton = screen.getAllByText('+')[0];
    fireEvent.click(increaseButton);

    expect(mockIncreaseQuantity).toHaveBeenCalledWith(1);
  });

  test('calls decreaseQuantity when "-" button is clicked', () => {
    render(
      <Router>
        <Cart />
      </Router>
    );

    const decreaseButton = screen.getAllByText('-')[0];
    fireEvent.click(decreaseButton);

    expect(mockDecreaseQuantity).toHaveBeenCalledWith(1);
  });

  test('calls removeItem when "Remove" button is clicked', () => {
    render(
      <Router>
        <Cart />
      </Router>
    );

    const removeButton = screen.getAllByText('Remove')[0];
    fireEvent.click(removeButton);

    expect(mockRemoveItem).toHaveBeenCalledWith(1);
  });

  test('calls handleCheckout when "Proceed to Payment" button is clicked', () => {
    render(
      <Router>
        <Cart />
      </Router>
    );

    const checkoutButton = screen.getByText('Proceed to Payment');
    fireEvent.click(checkoutButton);

    expect(handleCheckout).toHaveBeenCalled();
  });

  test('sessionStorage is cleared and page is reloaded after checkout', () => {
    const sessionStorageMock = vi.fn();
    global.sessionStorage = { clear: sessionStorageMock };
    
    const locationMock = { reload: vi.fn() };
    global.location = locationMock;
  
    handleCheckout.mockImplementation(() => {
      sessionStorage.clear();
      locationMock.reload();
    });
  
    render(
      <Router>
        <Cart />
      </Router>
    );
  
    const checkoutButton = screen.getByText('Proceed to Payment');
    fireEvent.click(checkoutButton);
  
    expect(sessionStorageMock).toHaveBeenCalled();
    expect(locationMock.reload).toHaveBeenCalled();
  });
});
