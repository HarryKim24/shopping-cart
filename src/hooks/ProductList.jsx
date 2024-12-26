/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import AddToCart from "../component/AddToCart";
import "../styles/ProductList.css";

const ProductList = ({ onAddToCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.ok ? res.json() : Promise.reject("Failed to fetch products"))
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="loading-message">Loading...</div>;
  if (error) return <p>Error: {error}</p>;

  const truncateTitle = (title) => {
    return title.length > 20 ? title.slice(0, 20) + "..." : title;
  };

  return (
    <div className="product-list">
      {products.map((product) => (
        <div key={product.id} className="product-item">
          <img src={product.image} alt={product.title} className="product-image" />
          <p className="product-title">{truncateTitle(product.title)}</p>
          <p className="product-price">${product.price.toFixed(2)}</p>
          <AddToCart product={product} onAddToCart={onAddToCart} />
        </div>
      ))}
    </div>
  );
};

export default ProductList;
