const CalculateTotal = (cart) => {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
};

export default CalculateTotal;
