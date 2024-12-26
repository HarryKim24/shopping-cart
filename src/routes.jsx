import App from "./App";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";

const Routes = [
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/shop",
    element: <Shop />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
];

export default Routes;
