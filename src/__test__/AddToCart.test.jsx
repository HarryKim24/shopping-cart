/* eslint-disable no-undef */
import { render, screen, fireEvent } from "@testing-library/react";
import AddToCart from "../component/AddToCart";

describe("AddToCart Component", () => {
  const mockOnAddToCart = vi.fn();
  const product = { id: 1, title: "Product 1", price: 10.99, image: "https://via.placeholder.com/150" };

  beforeEach(() => {
    mockOnAddToCart.mockClear();
  });

  test("renders with initial quantity of 1", () => {
    render(<AddToCart product={product} onAddToCart={mockOnAddToCart} />);
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  test("increases quantity when + button is clicked", () => {
    render(<AddToCart product={product} onAddToCart={mockOnAddToCart} />);
    const increaseButton = screen.getByText("+");

    fireEvent.click(increaseButton);

    expect(screen.getByText("2")).toBeInTheDocument();
  });

  test("decreases quantity when - button is clicked", () => {
    render(<AddToCart product={product} onAddToCart={mockOnAddToCart} />);
    const decreaseButton = screen.getByText("-");

    fireEvent.click(decreaseButton);
    expect(screen.getByText("1")).toBeInTheDocument();

    fireEvent.click(decreaseButton);
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  test("calls onAddToCart with correct product and quantity when Add to Cart button is clicked", () => {
    render(<AddToCart product={product} onAddToCart={mockOnAddToCart} />);
    const addToCartButton = screen.getByText("Add to Cart");

    fireEvent.click(addToCartButton);

    expect(mockOnAddToCart).toHaveBeenCalledWith(product, 1);
  });

  test("calls onAddToCart with updated quantity when quantity is changed", () => {
    render(<AddToCart product={product} onAddToCart={mockOnAddToCart} />);
    const increaseButton = screen.getByText("+");
    const addToCartButton = screen.getByText("Add to Cart");

    fireEvent.click(increaseButton);
    fireEvent.click(addToCartButton);

    expect(mockOnAddToCart).toHaveBeenCalledWith(product, 2);
  });
});
