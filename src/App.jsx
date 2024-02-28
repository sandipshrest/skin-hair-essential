import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "./components/Header";
import Homepage from "./pages/home/Homepage";
import Footer from "./components/Footer";
import Cart from "./pages/cart/Cart";
import ProductDetail from "./pages/products/ProductDetail";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/products/:productName" element={<ProductDetail />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
