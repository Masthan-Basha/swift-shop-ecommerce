import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Components
import Header from './components/Header';
import Footer from './components/Footer'; // ✅ Successfully imported
import AdminRoute from './components/AdminRoute';
import ScrollToTop from './components/ScrollToTop';

// Pages
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminAddProduct from './pages/AdminAddProduct';
import AdminOrderList from './pages/AdminOrderList';
import NewArrivals from './pages/NewArrivals'; 
import BestSellers from './pages/BestSellers';   

// Feature Pages
import Profile from './pages/Profile';
import OrderDetails from './pages/OrderDetails';
import Shipping from './pages/Shipping';
import PlaceOrder from './pages/PlaceOrder';
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
            {/* --- Public & Search Routes --- */}
            <Route path="/" element={<Home />} />
            <Route path="/search/:keyword" element={<Home />} /> 
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* --- 🚀 Collection Filters --- */}
            <Route path="/new-arrivals" element={<NewArrivals />} />
            <Route path="/best-sellers" element={<BestSellers />} />

            {/* --- 📦 Checkout & Account --- */}
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/placeorder" element={<PlaceOrder />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/order/:id" element={<OrderDetails />} />
            
            {/* --- 🛡️ Support & Policy --- */}
            <Route path="/shippingpolicy" element={<ShippingPolicy />} />
            <Route path="/termsofservice" element={<TermsOfService />} />

            {/* --- 🔒 Protected Admin Routes --- */}
            <Route path="" element={<AdminRoute />}>
              <Route path='/admin/add' element={<AdminAddProduct />} />
              <Route path='/admin/orders' element={<AdminOrderList />} />
            </Route>

            {/* Catch-all redirect to Home */}
            <Route path="*" element={<Home />} /> 
          </Routes>
        </div>
      </main>

      {/* ✅ Footer component rendering here */}
      <Footer />
    </Router>
  );
}

export default App;