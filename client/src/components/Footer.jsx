import React from 'react';
import { Link } from 'react-router-dom'; // 🚀 Import Link

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8 mt-20">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        
        {/* Shop Column */}
        <div>
          <h4 className="font-black text-sm uppercase tracking-widest mb-6">Shop</h4>
          <ul className="space-y-4 text-gray-500 text-sm font-medium">
            {/* 🚀 Use <Link> instead of <a> */}
            <li><Link to="/" className="hover:text-blue-600 transition-colors">Shop All</Link></li>
            <li><Link to="/new" className="hover:text-blue-600 transition-colors">New Arrivals</Link></li>
            <li><Link to="/best" className="hover:text-blue-600 transition-colors">Best Sellers</Link></li>
          </ul>
        </div>

        {/* Support Column */}
        <div>
          <h4 className="font-black text-sm uppercase tracking-widest mb-6">Support</h4>
          <ul className="space-y-4 text-gray-500 text-sm font-medium">
            <li><Link to="/support" className="hover:text-blue-600 transition-colors">Support</Link></li>
            <li><Link to="/shipping" className="hover:text-blue-600 transition-colors">Shipping Policy</Link></li>
            <li><Link to="/terms" className="hover:text-blue-600 transition-colors">Terms of Service</Link></li>
          </ul>
        </div>

      </div>
      
      <div className="text-center mt-16 pt-8 border-t border-gray-50 text-[10px] text-gray-400 font-bold uppercase tracking-[0.3em]">
        © 2026 Swift Shop. Designed for speed.
      </div>
    </footer>
  );
};

export default Footer;