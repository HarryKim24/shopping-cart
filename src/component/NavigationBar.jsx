import styled from "styled-components";
import { Link } from "react-router-dom";
import "../styles/NavigationBar.css";

const LinkStyle = styled(Link)`
  text-decoration: none;
  color: white;
`;

const NavigationBar = () => {
  return (
    <div className="navigation-bar">
      <LinkStyle to="/" className="logo">
        <h1>Shopping Cart</h1>
      </LinkStyle>
      <div className="nav-links">
        <Link to="/shop" className="nav-link">SHOP</Link>
        <Link to="/cart" className="nav-link">CART</Link>
      </div>
    </div>
  );
};

export default NavigationBar;
