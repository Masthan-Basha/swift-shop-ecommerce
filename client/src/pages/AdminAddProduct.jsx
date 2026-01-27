import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addManualProduct } from '../store/cartSlice'; // 🚀 Import the action

const AdminAddProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState(''); // 👈 Added description state
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 🛡️ Create the object exactly how your Redux and UI expect it
    const newProduct = {
      _id: `manual-${Date.now()}`, // Added prefix to avoid ID clashes with API
      name,
      price: Number(price),
      image,
      brand: category,
      countInStock: 10,
      description: description || "Premium quality product.",
    };

    // ✅ Dispatch to Redux
    dispatch(addManualProduct(newProduct)); 
    
    alert("Product Published Successfully!");
    navigate('/');
  };

  return (
    <div className="container mx-auto px-6 py-10 max-w-2xl animate-in fade-in duration-500">
      <h1 className="text-4xl font-black mb-8 tracking-tighter">Publish New Product</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-10 rounded-[2.5rem] shadow-2xl border border-gray-100">
        <div>
          <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">Product Name</label>
          <input type="text" className="w-full p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-blue-500 transition-all outline-none" 
                 placeholder="e.g. Wireless Headphones"
                 value={name} onChange={(e) => setName(e.target.value)} required />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">Price ($)</label>
            <input type="number" className="w-full p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-blue-500 transition-all outline-none" 
                   placeholder="99.99"
                   value={price} onChange={(e) => setPrice(e.target.value)} required />
          </div>
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">Category</label>
            <input type="text" className="w-full p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-blue-500 transition-all outline-none" 
                   placeholder="Electronics"
                   value={category} onChange={(e) => setCategory(e.target.value)} required />
          </div>
        </div>

        <div>
          <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">Image URL</label>
          <input type="text" className="w-full p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-blue-500 transition-all outline-none" 
                 placeholder="https://images.unsplash.com/..." 
                 value={image} onChange={(e) => setImage(e.target.value)} required />
        </div>

        <div>
          <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">Description</label>
          <textarea className="w-full p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-blue-500 transition-all outline-none min-h-[120px]" 
                 placeholder="Tell customers about this product..."
                 value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>

        <button type="submit" className="w-full bg-black text-white py-5 rounded-[2rem] font-black text-lg hover:bg-blue-600 transition-all shadow-xl active:scale-95 flex items-center justify-center gap-2">
          Add to Shop Inventory
        </button>
      </form>
    </div>
  );
};

export default AdminAddProduct;