import { Link } from "react-router-dom";
import CartActions from "../hooks/CartActions";
import ProductList from "../hooks/ProductList";
import NavigationBar from "./NavigationBar";
import { useEffect } from "react";

const Shop = () => {
  const { cart, addToCart } = CartActions();

  useEffect(() => {
    sessionStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <div>
      <NavigationBar />
      <h1>Shop Page</h1>
      <ProductList onAddToCart={addToCart} />

      <div style={{ marginTop: "30px" }}>
        <h2>Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul>
            {cart.map((item) => (
              <li key={item.id}>
                {item.title} - Quantity: {item.quantity}
              </li>
            ))}
          </ul>
        )}

        <Link to="/cart">
          <button>Go to Cart</button>
        </Link>
      </div>
    </div>
  );
};

export default Shop;
