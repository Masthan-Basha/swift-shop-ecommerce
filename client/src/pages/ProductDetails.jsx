import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { FiChevronLeft, FiShoppingBag, FiPlus, FiMinus } from 'react-icons/fi';
import Loader from '../components/Loader';
import { addToCart } from '../store/cartSlice';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // 🚀 Added userInfo to get the specific user's email for private storage
  const { manualProducts } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const manualItem = manualProducts.find((p) => p._id === id);

        if (manualItem) {
          setProduct(manualItem);
          setLoading(false);
          return;
        }

        const { data } = await axios.get(`https://fakestoreapi.com/products/${id}`);
        
        setProduct({
          _id: data.id.toString(),
          name: data.title,
          image: data.image,
          price: data.price,
          description: data.description,
          brand: data.category,
          countInStock: 10 
        });
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id, manualProducts]);

  // 🚀 UPDATED: Pass userEmail to ensure user-specific "Interest" isolation
  const addToCartHandler = () => {
    dispatch(addToCart({ 
      item: { ...product, qty }, 
      userEmail: userInfo?.email // 👈 This tells the slice which specific key to save to
    }));
    navigate('/cart');
  };

  if (loading) return <Loader />;

  if (!product) {
    return (
      <div className="container mx-auto px-6 py-20 text-center">
        <div className="bg-red-50 inline-flex p-6 rounded-full mb-6 text-red-500 text-3xl">⚠️</div>
        <h2 className="text-3xl font-black text-gray-900">Product Not Found</h2>
        <Link to="/" className="inline-block mt-4 bg-black text-white px-8 py-3 rounded-2xl font-bold hover:bg-blue-600 transition-all shadow-lg">
          Back to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center text-gray-500 hover:text-blue-600 transition-colors mb-10 group"
      >
        <div className="bg-gray-100 p-2 rounded-full group-hover:bg-blue-50 transition-colors">
          <FiChevronLeft size={20} className="group-hover:-translate-x-0.5 transition-transform" />
        </div>
        <span className="ml-3 font-bold uppercase tracking-widest text-xs text-gray-400 group-hover:text-blue-600">Go Back</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Product Image */}
        <div className="bg-white rounded-[3rem] p-8 sm:p-20 border border-gray-50 shadow-2xl shadow-gray-200/50 flex items-center justify-center relative group">
           <div className="absolute top-10 left-10 w-20 h-20 bg-blue-500/5 rounded-full blur-2xl group-hover:bg-blue-500/10 transition-colors"></div>
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full max-h-[500px] object-contain hover:scale-110 transition-transform duration-700 ease-in-out drop-shadow-2xl" 
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col space-y-10">
          <div>
            <div className="inline-block bg-blue-50 text-blue-600 font-black tracking-[0.2em] text-[10px] uppercase px-3 py-1 rounded-full mb-4">
              {product.brand}
            </div>
            <h1 className="text-4xl sm:text-6xl font-black text-gray-900 leading-tight tracking-tighter">
              {product.name}
            </h1>
          </div>

          <p className="text-gray-500 text-lg leading-relaxed max-w-xl italic">
            "{product.description}"
          </p>

          <div className="flex items-center gap-12 py-8 border-y border-gray-100">
            <div>
              <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-1">Current Price</p>
              <p className="text-5xl font-black text-gray-900">${product.price}</p>
            </div>
            <div className="h-12 w-[1px] bg-gray-100"></div>
            <div>
              <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-1">Availability</p>
              <p className={`text-lg font-bold flex items-center gap-2 ${product.countInStock > 0 ? 'text-green-600' : 'text-red-500'}`}>
                <span className={`w-2 h-2 rounded-full ${product.countInStock > 0 ? 'bg-green-600 animate-pulse' : 'bg-red-500'}`}></span>
                {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
              </p>
            </div>
          </div>

          {product.countInStock > 0 && (
            <div className="space-y-8">
              <div className="flex items-center gap-6">
                <span className="font-black text-xs uppercase tracking-widest text-gray-400">Qty</span>
                <div className="flex items-center bg-gray-50 rounded-2xl p-1 border border-gray-100">
                  <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-3 hover:bg-white hover:text-blue-600 rounded-xl transition-all">
                    <FiMinus size={16} />
                  </button>
                  <span className="px-8 font-black text-xl w-14 text-center">{qty}</span>
                  <button onClick={() => setQty(Math.min(product.countInStock, qty + 1))} className="p-3 hover:bg-white hover:text-blue-600 rounded-xl transition-all">
                    <FiPlus size={16} />
                  </button>
                </div>
              </div>

              <button 
                onClick={addToCartHandler}
                className="group w-full bg-black text-white py-6 rounded-[2rem] font-black text-xl flex items-center justify-center gap-4 hover:bg-blue-600 transition-all shadow-2xl hover:shadow-blue-200 active:scale-[0.97]"
              >
                <FiShoppingBag size={24} className="group-hover:rotate-12 transition-transform" />
                Add to Shopping Bag
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;