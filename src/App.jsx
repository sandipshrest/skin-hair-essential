import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "./components/Header";
import Homepage from "./pages/home/Homepage";
import Footer from "./components/Footer";
import Cart from "./pages/cart/Cart";
import ProductDetail from "./pages/products/ProductDetail";
import Category from "./pages/categories/Category";
import ScrollToTop from "./components/ScrollToTop";
import Wishlist from "./pages/wishlist/Wishlist";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Contact from "./pages/contact/Contact";
import About from "./pages/about/About";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/wishlist" element={<Wishlist />} />
          <Route exact path="/categories/:category" element={<Category />} />
          <Route exact path="/products/:productName" element={<ProductDetail />} />
          <Route exact path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
        <ScrollToTop />
      </Router>
    </>
  );
}

export default App;
