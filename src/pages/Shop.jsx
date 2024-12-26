import { Link } from "react-router-dom";
import CartActions from "../hooks/CartActions";
import ProductList from "../hooks/ProductList";
import { useEffect, useState } from "react";
import calculateTotal from "../utils/calculateTotal";
import NavigationBar from "../component/NavigationBar";
import "../styles/Shop.css";

const Shop = () => {
  const { cart, addToCart, increaseQuantity, decreaseQuantity, removeItem } = CartActions();
  const [currentCart, setCurrentCart] = useState(cart);

  useEffect(() => {
    setCurrentCart(cart);
    sessionStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <>
      <NavigationBar />
      <div className="shop-container">
        <div className="shop-content">
          <h1 className="shop-title">Shopping List</h1>
          <ProductList onAddToCart={addToCart} />
  
          <div className="cart-section">
            <h2 className="cart-title">Cart</h2>
            {currentCart.length === 0 ? (
              <p className="empty-cart">Your cart is empty.</p>
            ) : (
              <div className="cart-details">
                <ul>
                  {currentCart.map((item) => (
                    <li key={item.id} className="cart-item">
                      <p>{item.title}</p>
                      <p>Quantity: {item.quantity}</p>
                      <p>Price: ${item.price.toFixed(2)}</p>
                      <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
                      <div className="cart-buttons">
                        <button className="cart-btn" onClick={() => increaseQuantity(item.id)}>+</button>
                        <button className="cart-btn" onClick={() => decreaseQuantity(item.id)}>-</button>
                        <button className="cart-btn" onClick={() => removeItem(item.id)}>Remove</button>
                      </div>
                    </li>
                  ))}
                </ul>
                <h3 className="total-price">Total: ${calculateTotal(currentCart)}</h3>
              </div>
            )}
            <Link to="/cart">
              <button className="go-to-cart-btn">Go to Cart</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;
