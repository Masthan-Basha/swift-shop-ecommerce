import React, { useRef, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux'; 
import Product from '../components/Product';

const Home = () => {
  const { keyword } = useParams();
  const navigate = useNavigate();
  const productsRef = useRef(null);
  
  // 🚀 Local state to handle the sort selection
  const [sortBy, setSortBy] = useState('Newest');

  const { manualProducts = [] } = useSelector((state) => state.cart || {});

  const scrollToProducts = () => {
    productsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // 🔍 🚀 COMBINED FILTER & SORT LOGIC
  const processedProducts = useMemo(() => {
    // 1. Filter by keyword first
    let filtered = [...manualProducts];
    if (keyword) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(keyword.toLowerCase()) || 
        p.brand?.toLowerCase().includes(keyword.toLowerCase())
      );
    }

    // 2. Sort the results based on dropdown selection
    if (sortBy === 'Price: Low to High') {
      filtered.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (sortBy === 'Price: High to Low') {
      filtered.sort((a, b) => Number(b.price) - Number(a.price));
    } else if (sortBy === 'Newest') {
      // Assuming manualProducts are added to the end of the array, 
      // we reverse to show the latest first.
      filtered.reverse();
    }

    return filtered;
  }, [keyword, manualProducts, sortBy]);

  return (
    <div className="container mx-auto px-6 py-8 animate-in fade-in duration-700">
      
      {/* 🏙️ PROFESSIONAL HERO SECTION */}
      <div className="relative overflow-hidden bg-gray-900 rounded-[2rem] mb-12 shadow-xl">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_50%,#4f46e5,transparent)]"></div>
        </div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-center p-8 md:p-16">
          <div className="md:w-1/2 space-y-6">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight tracking-tight">
                {keyword ? `Search Results` : <>Quality Essentials <br/> <span className="text-blue-400 text-3xl md:text-5xl">For Your Every Day.</span></>}
            </h1>
            
            <p className="text-gray-300 text-base md:text-lg max-w-md">
              {keyword 
                ? `Showing items matching "${keyword}" from our collection.`
                : "Discover curated products designed for durability and style. Simplified shopping for a modern lifestyle."}
            </p>
            
            <div className="flex gap-4 pt-4">
              <button 
                onClick={scrollToProducts} 
                className="bg-blue-600 text-white px-10 py-4 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-900/20 active:scale-95"
              >
                Browse Collection
              </button>
            </div>
          </div>

          <div className="hidden md:flex md:w-1/2 justify-center items-center">
             <div className="border border-white/10 p-4 rounded-3xl backdrop-blur-sm bg-white/5 rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="bg-white/10 p-10 rounded-2xl flex flex-col items-center">
                   <span className="text-blue-400 text-xs font-black uppercase tracking-[0.3em] mb-2 text-center">Since 2024</span>
                   <span className="text-white text-2xl font-black">PREMIUM</span>
                   <span className="text-gray-400 text-xs font-medium">CURATED GOODS</span>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* 📦 PRODUCT DISPLAY AREA */}
      <div ref={productsRef} className="pt-4 scroll-mt-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 uppercase tracking-tight">
                {keyword ? `Found ${processedProducts.length} Items` : "Featured Items"}
            </h2>
            <div className="h-1.5 w-10 bg-blue-600 mt-1 rounded-full"></div>
          </div>
          
          {/* ✅ FUNCTIONAL SORT DROPDOWN */}
          <div className="flex items-center gap-3">
             <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Sort By</span>
             <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-gray-200 rounded-xl text-sm font-bold py-2.5 px-4 outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer shadow-sm"
             >
                <option value="Newest">Newest Arrivals</option>
                <option value="Price: Low to High">Price: Low to High</option>
                <option value="Price: High to Low">Price: High to Low</option>
             </select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {processedProducts.length > 0 ? (
            processedProducts.map((p) => <Product key={p._id} product={p} />)
          ) : (
            <div className="col-span-full text-center py-24 bg-gray-50 rounded-3xl border border-gray-100">
               <p className="text-gray-400 text-lg font-medium">
                 {keyword ? `No matches for "${keyword}"` : "Our collection is being updated."}
               </p>
               <button onClick={() => navigate('/')} className="mt-4 text-blue-600 font-bold hover:underline">
                 Return Home
               </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;