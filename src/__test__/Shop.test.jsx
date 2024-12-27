/* eslint-disable no-undef */
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Shop from '../pages/Shop';
import CartActions from '../hooks/CartActions';
import ProductList from '../hooks/ProductList';
import calculateTotal from '../utils/calculateTotal';

vi.mock('../hooks/CartActions', () => ({
  default: vi.fn().mockReturnValue({
    cart: [
      { id: 1, title: 'Product 1', price: 10.99, quantity: 2 },
      { id: 2, title: 'Product 2', price: 5.99, quantity: 1 },
    ],
    addToCart: vi.fn(),
    increaseQuantity: vi.fn(),
    decreaseQuantity: vi.fn(),
    removeItem: vi.fn(),
  }),
}));
vi.mock('../hooks/ProductList', () => ({
  default: vi.fn().mockReturnValue(<div>Product List</div>),
}));
vi.mock('../utils/calculateTotal', () => ({
  default: vi.fn().mockReturnValue(27.97),
}));

describe('Shop Component', () => {
  const mockAddToCart = vi.fn();
  const mockIncreaseQuantity = vi.fn();
  const mockDecreaseQuantity = vi.fn();
  const mockRemoveItem = vi.fn();
  const mockCart = [
    { id: 1, title: 'Product 1', price: 10.99, quantity: 2 },
    { id: 2, title: 'Product 2', price: 5.99, quantity: 1 },
  ];
  const mockCalculateTotal = vi.fn().mockReturnValue(27.97);

  beforeEach(() => {
    CartActions.mockReturnValue({
      cart: mockCart,
      addToCart: mockAddToCart,
      increaseQuantity: mockIncreaseQuantity,
      decreaseQuantity: mockDecreaseQuantity,
      removeItem: mockRemoveItem,
    });

    ProductList.mockReturnValue(<div>Product List</div>);

    calculateTotal.mockReturnValue(mockCalculateTotal());
  });

  test('renders Shop component with ProductList and cart details', () => {
    render(
      <Router>
        <Shop />
      </Router>
    );

    expect(screen.getByText('Product List')).toBeInTheDocument();
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

  test("displays 'Your cart is empty' when cart is empty", () => {
    CartActions.mockReturnValue({
      cart: [],
      addToCart: mockAddToCart,
      increaseQuantity: mockIncreaseQuantity,
      decreaseQuantity: mockDecreaseQuantity,
      removeItem: mockRemoveItem,
    });

    render(
      <Router>
        <Shop />
      </Router>
    );

    expect(screen.getByText('Your cart is empty.')).toBeInTheDocument();
  });

  test('increases quantity of an item', () => {
    render(
      <Router>
        <Shop />
      </Router>
    );

    const increaseButton = screen.getAllByText('+')[0];
    fireEvent.click(increaseButton);

    expect(mockIncreaseQuantity).toHaveBeenCalledWith(1);
  });

  test('decreases quantity of an item', () => {
    render(
      <Router>
        <Shop />
      </Router>
    );

    const decreaseButton = screen.getAllByText('-')[0];
    fireEvent.click(decreaseButton);

    expect(mockDecreaseQuantity).toHaveBeenCalledWith(1);
  });

  test('removes item from the cart', () => {
    render(
      <Router>
        <Shop />
      </Router>
    );

    const removeButton = screen.getAllByText('Remove')[0];
    fireEvent.click(removeButton);

    expect(mockRemoveItem).toHaveBeenCalledWith(1);
  });

  test('navigates to cart page when "Go to Cart" button is clicked', () => {
    render(
      <Router>
        <Shop />
      </Router>
    );

    const goToCartButton = screen.getByText('Go to Cart');
    fireEvent.click(goToCartButton);

    expect(window.location.pathname).toBe('/cart');
  });
});