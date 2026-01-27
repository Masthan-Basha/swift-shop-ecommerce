import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom'; // 🚀 Added useParams
import { useSelector } from 'react-redux'; 
import Product from '../components/Product';
import Loader from '../components/Loader';

const Home = () => {
  const { keyword } = useParams(); // 🚀 Capture search term
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();
  const productsRef = useRef(null);

  const { manualProducts } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const scrollToProducts = () => {
    productsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get('https://fakestoreapi.com/products');
        
        const formattedProducts = data.map((p) => ({
          _id: p.id.toString(),
          name: p.title,
          image: p.image,
          price: p.price,
          brand: p.category,
          description: p.description,
          countInStock: 5
        }));

        const allProducts = [...manualProducts, ...formattedProducts];

        // 🚀 Filter logic: If keyword exists, filter by name
        const filtered = keyword 
          ? allProducts.filter(p => p.name.toLowerCase().includes(keyword.toLowerCase()))
          : allProducts;

        setProducts(filtered);
        setError(null);
      } catch (err) {
        setProducts(manualProducts);
        if (manualProducts.length === 0) setError("Server connection issues.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [manualProducts, keyword]); // 🚀 Re-run when keyword changes

  if (loading) return <Loader />;

  return (
    <div className="container mx-auto px-6 py-8 animate-in fade-in duration-700">
      {/* Hero Section stays same... */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-indigo-800 to-black rounded-[2.5rem] p-10 md:p-16 mb-12 text-white shadow-2xl">
         {/* ... (Hero content from your original Home.jsx) ... */}
         <div className="relative z-10 md:w-2/3 space-y-8">
            <h1 className="text-5xl md:text-7xl font-black leading-[1.1] tracking-tighter">
                {keyword ? `Search: ${keyword}` : <>Elevate Your <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">Daily Style.</span></>}
            </h1>
            <p className="text-blue-100/80 text-lg md:text-xl max-w-lg leading-relaxed">
               {keyword ? `Found ${products.length} matching results.` : "Streaming live essentials directly to your screen."}
            </p>
            <div className="flex flex-wrap gap-5 pt-4">
               <button onClick={scrollToProducts} className="bg-white text-blue-900 px-10 py-4 rounded-2xl font-bold hover:shadow-xl transition-all">
                  Explore Collection
               </button>
            </div>
         </div>
      </div>

      <div ref={productsRef} className="pt-4 scroll-mt-10">
        <h2 className="text-4xl font-black tracking-tight text-gray-900 mb-8">
            {keyword ? `Results for "${keyword}"` : "Latest Arrivals"}
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.length > 0 ? (
            products.map((p) => <Product key={p._id} product={p} />)
          ) : (
            <div className="col-span-full text-center py-20 bg-white rounded-[3rem] border border-dashed">
               <p className="text-gray-400 text-xl font-bold">No items found matching your search.</p>
               <button onClick={() => navigate('/')} className="mt-4 text-blue-600 font-bold underline">Clear Search</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;