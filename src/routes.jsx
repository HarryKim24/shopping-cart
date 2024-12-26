import App from "./App";
import Cart from "./component/Cart";
import Shop from "./component/Shop";

const routes = [
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

export default routes;