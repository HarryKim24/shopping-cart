import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import NavigationBar from "../component/NavigationBar";
import { describe, expect, test } from "vitest";

const MockNavigationBar = () => {
  return (
    <BrowserRouter>
      <NavigationBar />
    </BrowserRouter>
  );
};

describe("navigation bar", () => {
  test("renders the logo link with the correct text", () => {
    render(<MockNavigationBar />);
    const logoLink = screen.getByRole("link", { name: /shopping cart/i });
    expect(logoLink).toBeInTheDocument();
    expect(logoLink).toHaveAttribute("href", "/");
  });

  test("renders the SHOP link", () => {
    render(<MockNavigationBar />);
    const links = screen.getAllByRole("link");
    const shopLink = links.find(link => link.textContent === "SHOP");
    expect(shopLink).toBeInTheDocument();
    expect(shopLink).toHaveAttribute("href", "/shop");
  });

  test("renders the CART link", () => {
    render(<MockNavigationBar />);
    const links = screen.getAllByRole("link");
    const cartLink = links.find(link => link.textContent === "CART");
    expect(cartLink).toBeInTheDocument();
    expect(cartLink).toHaveAttribute("href", "/cart");
  });
});
