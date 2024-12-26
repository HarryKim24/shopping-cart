/* eslint-disable react/prop-types */
const AddToCart = ({ product, onAddToCart }) => {
  const handleClick = () => {
    onAddToCart(product);
  };

  return (
    <button onClick={handleClick} style={{ marginTop: "10px" }}>
      Add to Cart
    </button>
  );
};

export default AddToCart;
