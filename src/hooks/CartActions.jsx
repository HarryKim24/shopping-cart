import { useState } from "react";

const CartActions = () => {
  const [cart, setCart] = useState(JSON.parse(sessionStorage.getItem("cart")) || []);

  const addToCart = (product, quantity) => {
    setCart((prevCart) => {
      const existingProductIndex = prevCart.findIndex((item) => item.id === product.id);
      if (existingProductIndex !== -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingProductIndex].quantity += Number(quantity);
        return updatedCart;
      } else {
        return [...prevCart, { ...product, quantity: Number(quantity) }];
      }
    });
  };

  const increaseQuantity = (id) => {
    setCart((prevCart) => {
      return prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      );
    });
  };

  const decreaseQuantity = (id) => {
    setCart((prevCart) => {
      return prevCart.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
    });
  };

  const removeItem = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  return {
    cart,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
  };
};

export default CartActions;
