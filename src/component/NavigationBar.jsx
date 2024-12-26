import { Link } from "react-router-dom"

const NavigationBar = () => {

  return (
    <div>
      <Link to="/"><h1>Shopping Cart</h1></Link>
      <Link to='/shop'>SHOP</Link>
      <br />
      <Link to='/cart'>CART</Link>
    </div>
  )
}

export default NavigationBar;