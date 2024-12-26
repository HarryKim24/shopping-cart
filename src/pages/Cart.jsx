import calculateTotal from "../utils/calculateTotal";
import CartActions from "../hooks/CartActions";
import NavigationBar from "../component/NavigationBar";
import "../styles/Cart.css";

const Cart = () => {
  const { cart, increaseQuantity, decreaseQuantity, removeItem } = CartActions();

  return (
    <>
      <NavigationBar />
      <div className="cart-container">
        <h1 className="cart-title">Summary</h1>
        <h2 className="cart-header">Your Cart</h2>
        {cart.length === 0 ? (
          <p className="empty-cart">Your cart is empty.</p>
        ) : (
          <div className="cart-items">
            <ul>
              {cart.map((item) => (
                <li key={item.id} className="cart-item">
                  <img src={item.image} alt={item.title} className="cart-item-image" />
                  <div className="cart-item-details">
                    <p className="cart-item-title"><strong>{item.title}</strong></p>
                    <p className="cart-item-quantity">Quantity: {item.quantity}</p>
                    <p className="cart-item-price">Price: ${item.price.toFixed(2)}</p>
                    <p className="cart-item-total">Total: ${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                  <div className="cart-item-actions">
                    <button onClick={() => increaseQuantity(item.id)} className="quantity-btn">+</button>
                    <button onClick={() => decreaseQuantity(item.id)} className="quantity-btn">-</button>
                    <button onClick={() => removeItem(item.id)} className="remove-btn">Remove</button>
                  </div>
                </li>
              ))}
            </ul>
            <h3 className="total-price">Total: ${calculateTotal(cart)}</h3>
            <button className="checkout-btn">Proceed to Payment</button>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
