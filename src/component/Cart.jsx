import NavigationBar from "./NavigationBar";

const Cart = () => {
  const cart = JSON.parse(sessionStorage.getItem("cart")) || [];  // sessionStorage에서 cart 복원

  return (
    <div>
      <NavigationBar />
      <h1>Cart Page</h1>
      <div style={{ marginTop: "30px" }}>
        <h2>Your Cart</h2>
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
      </div>
    </div>
  );
};

export default Cart;