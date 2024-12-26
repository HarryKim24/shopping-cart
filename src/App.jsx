import './styles/App.css';
import NavigationBar from './component/NavigationBar';

function App() {
  return (
    <>
      <NavigationBar />
      <div className="app">
        <h2>Welcome to Our Website!</h2>
        <p>
        This website is a simulated online shopping mall that features a shopping cart. Users can browse various products and add the items they want to the cart. In the cart, users can adjust the quantity of items or remove them. However, the website does not include an actual payment feature.
        </p>
      </div>
    </>
  );
}

export default App;
