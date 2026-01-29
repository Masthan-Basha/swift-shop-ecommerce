import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ShieldCheck, Truck, Globe, ArrowRight, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white text-black mt-24 border-t border-gray-100">
      {/* 🚀 PREMIUM NEWSLETTER SECTION (Matches Home Hero Energy) */}
      <div className="border-b border-gray-50 bg-gray-50/30">
        <div className="container mx-auto px-6 py-16 flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="text-center lg:text-left space-y-2">
            <h3 className="text-3xl font-black tracking-tighter italic uppercase text-black leading-none">
              Join the Swift Club<span className="text-blue-600">.</span>
            </h3>
            <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.3em] mt-1">
              Curated Drops • Early Access • Member Deals
            </p>
          </div>

          {/* Minimalist Newsletter - Matching Home Input Style */}
          <div className="relative w-full max-w-md group">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-600 transition-colors">
              <Mail size={18} />
            </div>
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="w-full bg-white border border-gray-200 rounded-2xl py-5 pl-14 pr-36 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 transition-all shadow-sm"
            />
            <button className="absolute right-2.5 top-2.5 bottom-2.5 bg-black text-white px-8 rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all flex items-center gap-2 shadow-lg shadow-black/10 active:scale-95">
              Join <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
          
          {/* Column 1: Brand Identity (Matches Home Premium Card) */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-4 group">
              <div className="relative w-14 h-14 bg-gray-900 rounded-[1.25rem] flex items-center justify-center group-hover:scale-105 transition-all duration-500 overflow-hidden shadow-2xl">
                {/* Internal Radial Glow matching Home Hero */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#4f46e5,transparent)] opacity-40"></div>
                <div className="relative w-4 h-4 bg-white rounded-full z-10 shadow-[0_0_15px_rgba(255,255,255,0.5)]"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tighter leading-none uppercase italic">
                  Swift<span className="text-blue-600">Shop</span>
                </span>
                <span className="text-[9px] font-black uppercase tracking-[0.4em] text-blue-500 mt-1">Premium Curated</span>
              </div>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs font-medium italic">
              Discover curated products designed for durability and style. Simplified shopping for a modern lifestyle.
            </p>
          </div>

          {/* Column 2: Collections */}
          <div>
            <h4 className="font-black text-[11px] uppercase tracking-[0.3em] text-gray-900 mb-8 flex items-center gap-2">
              <span className="w-6 h-1 bg-blue-600 rounded-full"></span> Browse
            </h4>
            <ul className="space-y-5 text-gray-500 text-sm font-bold">
              <li><Link to="/best-sellers" className="hover:text-blue-600 transition-colors flex items-center gap-3 group"><ShoppingBag size={16} className="text-gray-300 group-hover:text-blue-600" /> Best Sellers</Link></li>
              <li><Link to="/new-arrivals" className="hover:text-blue-600 transition-colors flex items-center gap-3 group"><Truck size={16} className="text-gray-300 group-hover:text-blue-600" /> New Arrivals</Link></li>
            </ul>
          </div>

          {/* Column 3: Support */}
          <div>
            <h4 className="font-black text-[11px] uppercase tracking-[0.3em] text-gray-900 mb-8 flex items-center gap-2">
              <span className="w-6 h-1 bg-black rounded-full"></span> Support
            </h4>
            <ul className="space-y-5 text-gray-500 text-sm font-bold">
              <li><Link to="/shippingpolicy" className="hover:text-blue-600 transition-colors underline decoration-blue-100 underline-offset-8">Shipping Policy</Link></li>
              <li><Link to="/termsofservice" className="hover:text-blue-600 transition-colors underline decoration-blue-100 underline-offset-8">Terms of Service</Link></li>
              <li><Link to="/profile" className="hover:text-blue-600 transition-colors underline decoration-blue-100 underline-offset-8">Track Order</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-20 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-gray-400 font-black uppercase tracking-[0.3em]">
          <div className="flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-full border border-gray-100">
             <ShieldCheck size={14} className="text-blue-600" />
             <span>Verified Secure Checkout</span>
          </div>
          <div className="flex items-center gap-8">
            <span className="hover:text-black cursor-pointer transition-colors">Privacy</span>
            <span className="text-black font-black flex items-center gap-1.5">
              <Globe size={14} className="text-blue-600" /> Global (EN)
            </span>
            <span className="text-gray-300">© 2026</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;