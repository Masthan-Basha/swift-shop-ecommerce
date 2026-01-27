import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Components
import Header from './components/Header';
import AdminRoute from './components/AdminRoute';
import ScrollToTop from './components/ScrollToTop';

// Pages
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminAddProduct from './pages/AdminAddProduct';
import AdminOrderList from './pages/AdminOrderList'; // 🚀 New: Admin Management

// Feature Pages
import Profile from './pages/Profile';
import OrderDetails from './pages/OrderDetails';
import Shipping from './pages/Shipping'; // 🚀 New: Shipping Address Entry
import PlaceOrder from './pages/PlaceOrder'; // 🚀 New: Final Summary
import ShippingPolicy from './pages/ShippingPolicy';
import TermsOfService from './pages/TermsOfService';

function App() {
  return (
    <Router>
      <ScrollToTop /> 
      <ToastContainer position="bottom-right" autoClose={3000} theme="dark" />
      <Header />
      
      <main className="min-h-[80vh] bg-gray-50/50 py-8">
        <div className="container mx-auto px-4 md:px-6">
          <Routes>
            {/* --- Public Routes --- */}
            <Route path="/" element={<Home />} />
            <Route path="/search/:keyword" element={<Home />} /> 
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* --- 📦 Checkout & Order Routes --- */}
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/placeorder" element={<PlaceOrder />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/order/:id" element={<OrderDetails />} />
            
            {/* --- Support Routes --- */}
            <Route path="/shipping-policy" element={<ShippingPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />

            {/* --- 🔒 Protected Admin Routes --- */}
            <Route path="" element={<AdminRoute />}>
              <Route path='/admin/add' element={<AdminAddProduct />} />
              <Route path='/admin/orders' element={<AdminOrderList />} /> {/* 🚀 New */}
            </Route>

            <Route path="*" element={<Home />} /> 
          </Routes>
        </div>
      </main>
      
      <footer className="bg-white border-t border-gray-100 pt-16 pb-8 mt-20">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
          <div>
            <h3 className="font-black text-black mb-6 uppercase text-xs tracking-[0.2em]">Shop</h3>
            <ul className="space-y-4 text-sm text-gray-500 font-medium">
              <li><Link to="/" className="hover:text-blue-600 transition-colors">New Arrivals</Link></li>
              <li><Link to="/" className="hover:text-blue-600 transition-colors">Best Sellers</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-black text-black mb-6 uppercase text-xs tracking-[0.2em]">Support</h3>
            <ul className="space-y-4 text-sm text-gray-500 font-medium">
              <li><Link to="/shipping-policy" className="hover:text-blue-600 transition-colors">Shipping Policy</Link></li>
              <li><Link to="/terms" className="hover:text-blue-600 transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-black text-black mb-6 uppercase text-xs tracking-[0.2em]">Contact</h3>
            <p className="text-sm text-gray-500 font-medium">support@swiftshop.com</p>
          </div>
        </div>
        <div className="container mx-auto px-6 mt-16 pt-8 border-t border-gray-50 text-center">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em]">
            &copy; {new Date().getFullYear()} SWIFT SHOP. ALL RIGHTS RESERVED.
          </p>
        </div>
      </footer>
    </Router>
  );
}

export default App;