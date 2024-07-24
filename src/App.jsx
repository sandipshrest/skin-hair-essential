import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Cart from "./pages/(user)/cart/Cart";
import ProductDetail from "./pages/(user)/products/ProductDetail";
import Category from "./pages/(user)/categories/Category";
import ScrollToTop from "./components/ScrollToTop";
import Wishlist from "./pages/(user)/wishlist/Wishlist";
import Login from "./pages/(user)/login/Login";
import Signup from "./pages/(user)/signup/Signup";
import Contact from "./pages/(user)/contact/Contact";
import About from "./pages/(user)/about/About";
import Homepage from "./pages/(user)/home/Homepage";
import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/(admin)/dashboard/Dashboard";

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* for public users */}
          <Route path="/" element={<MainLayout />}>
            <Route exact index element={<Homepage />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/cart" element={<Cart />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/wishlist" element={<Wishlist />} />
            <Route exact path="/categories/:category" element={<Category />} />
            <Route exact path="/products/:productName" element={<ProductDetail />} />
            <Route exact path="/contact" element={<Contact />} />
          </Route>

          {/* for admin or authorized person only */}
          <Route path="/dashboard" element={<AdminLayout/>}>
          <Route exact index element={<Dashboard />} />
          </Route>
        </Routes>
        <ScrollToTop />
      </Router>
    </>
  );
}

export default App;
