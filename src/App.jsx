import "./App.css";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
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
import ProductList from "./pages/(admin)/productList/ProductList";
import CategoryList from "./pages/(admin)/categoryList/CategoryList";
import AddProduct from "./pages/(admin)/product/AddProduct";
import SearchProduct from "./pages/(user)/searchProduct/SearchProduct";
import { useSelector } from "react-redux";
import FeedbackList from "./pages/(admin)/feedbackList/FeedbackList";
import OrderList from "./pages/(admin)/orderList/OrderList";
import CustomerList from "./pages/(admin)/customerList/CustomerList";

function App() {
  const { isLogin, user } = useSelector((state) => state.user);
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
            <Route exact path="/searchProduct" element={<SearchProduct />} />
            <Route exact path="/categories/:category" element={<Category />} />
            <Route
              exact
              path="/products/:productName"
              element={<ProductDetail />}
            />
            <Route exact path="/contact" element={<Contact />} />
          </Route>

          {/* for admin or authorized person only */}
          <Route
            path="/dashboard"
            element={
              !isLogin || user?.role?.toLowerCase() === "user" ? (
                <Navigate to="/" />
              ) : (
                <AdminLayout />
              )
            }
          >
            <Route exact index element={<Dashboard />} />
            <Route
              exact
              path="/dashboard/productList"
              element={<ProductList />}
            />
            <Route exact path="/dashboard/product" element={<AddProduct />} />
            <Route
              exact
              path="/dashboard/categoryList"
              element={<CategoryList />}
            />
            <Route
              exact
              path="/dashboard/feedbackList"
              element={<FeedbackList />}
            />
            <Route exact path="/dashboard/orderList" element={<OrderList />} />
            <Route exact path="/dashboard/customerList" element={<CustomerList />} />
          </Route>
        </Routes>
        <ScrollToTop />
      </Router>
    </>
  );
}

export default App;
