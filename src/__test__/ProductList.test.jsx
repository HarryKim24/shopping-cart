/* eslint-disable no-undef */
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ProductList from "../hooks/ProductList";
import { BrowserRouter } from "react-router-dom";

vi.mock("../component/AddToCart", () => ({
  default: ({ product, onAddToCart }) => (
    <div>
      <button onClick={() => onAddToCart(product, 1)}>Add to Cart</button>
    </div>
  ),
}));

global.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve([
        { id: 1, title: "Product 1", price: 10.99, image: "https://via.placeholder.com/150" },
        { id: 2, title: "Product 2", price: 12.99, image: "https://via.placeholder.com/150" },
      ]),
  })
);

describe("ProductList Component", () => {
  test("renders loading message initially", () => {
    render(<ProductList onAddToCart={() => {}} />, { wrapper: BrowserRouter });
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  test("renders error message when API fails", async () => {
    global.fetch.mockImplementationOnce(() =>
      Promise.reject(new Error("Failed to fetch products"))
    );

    render(<ProductList onAddToCart={() => {}} />, { wrapper: BrowserRouter });

    await waitFor(() => {
      expect(screen.getByText(/Error: Failed to fetch products/i)).toBeInTheDocument();
    });
  });

  test("renders product list after successful API fetch", async () => {
    render(<ProductList onAddToCart={() => {}} />, { wrapper: BrowserRouter });

    await waitFor(() => {
      expect(screen.getByText(/Product 1/i)).toBeInTheDocument();
      expect(screen.getByText(/Product 2/i)).toBeInTheDocument();
      expect(screen.getByText("$10.99")).toBeInTheDocument();
      expect(screen.getByText("$12.99")).toBeInTheDocument();
    });
  });

  test("calls onAddToCart when Add to Cart button is clicked", async () => {
    const mockOnAddToCart = vi.fn();
    render(<ProductList onAddToCart={mockOnAddToCart} />, { wrapper: BrowserRouter });

    await waitFor(() => {
      const addButton = screen.getAllByText("Add to Cart")[0];
      fireEvent.click(addButton);

      expect(mockOnAddToCart).toHaveBeenCalledWith(
        expect.objectContaining({
          id: 1,
          title: "Product 1",
          price: 10.99,
          image: "https://via.placeholder.com/150",
        }),
        1
      );
    });
  });

  test("increases and decreases quantity and calls onAddToCart with updated quantity", async () => {
    const mockOnAddToCart = vi.fn();
    render(<ProductList onAddToCart={mockOnAddToCart} />, { wrapper: BrowserRouter });

    await waitFor(() => {
      const increaseButton = screen.getAllByText("+")[0];
      const decreaseButton = screen.getAllByText("-")[0];

      fireEvent.click(increaseButton);
      expect(screen.getByText("2")).toBeInTheDocument();

      fireEvent.click(decreaseButton);
      expect(screen.getByText("1")).toBeInTheDocument();

      const addButton = screen.getAllByText("Add to Cart")[0];
      fireEvent.click(addButton);

      expect(mockOnAddToCart).toHaveBeenCalledWith(
        expect.objectContaining({
          id: 1,
          title: "Product 1",
          price: 10.99,
          image: "https://via.placeholder.com/150",
        }),
        2
      );
    });
  });
});
