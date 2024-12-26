/* eslint-disable react/prop-types */
import { useState } from "react";
import "../styles/AddToCart.css";

const AddToCart = ({ product, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);

  const handleIncrease = () => setQuantity(prevQuantity => prevQuantity + 1);
  const handleDecrease = () => quantity > 1 && setQuantity(prevQuantity => prevQuantity - 1);
  const handleClick = () => onAddToCart(product, quantity);

  return (
    <div className="add-to-cart">
      <div className="quantity-controls">
        <button onClick={handleDecrease} className="quantity-btn">-</button>
        <span className="quantity">{quantity}</span>
        <button onClick={handleIncrease} className="quantity-btn">+</button>
      </div>
      <button onClick={handleClick} className="add-btn">Add to Cart</button>
    </div>
  );
};

export default AddToCart;
