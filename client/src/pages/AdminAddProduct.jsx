import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addManualProduct, deleteProduct } from '../store/cartSlice'; 
import { FiUpload, FiTrash2, FiPackage, FiPlus } from 'react-icons/fi';

const AdminAddProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [isCompressing, setIsCompressing] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { manualProducts } = useSelector((state) => state.cart);

  // 🚀 HELPER: Compress Image to prevent QuotaExceededError
  const compressImage = (base64Str) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = base64Str;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 400; // Small but clear for mobile/web
        const MAX_HEIGHT = 400;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        
        // 0.6 = 60% quality. Drastically reduces string length.
        resolve(canvas.toDataURL('image/jpeg', 0.6));
      };
    });
  };

  // 📸 Capture and Compress
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsCompressing(true);
      const reader = new FileReader();
      reader.onloadend = async () => {
        const compressed = await compressImage(reader.result);
        setImage(compressed);
        setIsCompressing(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!image) return alert("Please upload an image");

    const newProduct = {
      _id: `manual-${Date.now()}`,
      name,
      price: Number(price),
      image, 
      brand: category,
      countInStock: 10,
      description: description || "Premium quality product.",
    };

    dispatch(addManualProduct(newProduct)); 
    alert("Product Published Successfully!");
    
    // Reset Form
    setName(''); setPrice(''); setImage(''); setCategory(''); setDescription('');
  };

  const handleDelete = (id) => {
    if (window.confirm("Remove this product from inventory?")) {
      dispatch(deleteProduct(id));
    }
  };

  return (
    <div className="container mx-auto px-6 py-10 max-w-6xl animate-in fade-in duration-500">
      <div className="flex flex-col lg:flex-row gap-12">
        
        {/* 1. ADD PRODUCT FORM */}
        <div className="lg:w-5/12">
          <h1 className="text-4xl font-black mb-8 tracking-tighter flex items-center gap-3">
            <FiPlus className="text-blue-600" /> Publish
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-5 bg-white p-8 rounded-[2.5rem] shadow-2xl border border-gray-100">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">Product Name</label>
              <input type="text" className="w-full p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-blue-500 transition-all outline-none" 
                     placeholder="e.g. Wireless Headphones"
                     value={name} onChange={(e) => setName(e.target.value)} required />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">Price ($)</label>
                <input type="number" className="w-full p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-blue-500 transition-all outline-none" 
                       placeholder="99.99"
                       value={price} onChange={(e) => setPrice(e.target.value)} required />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">Category</label>
                <input type="text" className="w-full p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-blue-500 transition-all outline-none" 
                       placeholder="Electronics"
                       value={category} onChange={(e) => setCategory(e.target.value)} required />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">
                Image {isCompressing && <span className="text-blue-500 animate-pulse">(Processing...)</span>}
              </label>
              <div className="relative group">
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className="p-4 bg-blue-50 border-2 border-dashed border-blue-200 rounded-2xl flex items-center justify-center gap-3 text-blue-600 group-hover:bg-blue-100 transition-all">
                  <FiUpload />
                  <span className="text-sm font-bold">{image ? "Image Optimized ✅" : "Upload Local Image"}</span>
                </div>
              </div>
              {image && (
                <div className="mt-4 relative inline-block">
                   <img src={image} alt="Preview" className="h-24 w-24 object-cover rounded-2xl border shadow-md" />
                   <div className="absolute -top-2 -right-2 bg-green-500 text-white text-[8px] font-bold px-2 py-1 rounded-full uppercase">Ready</div>
                </div>
              )}
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">Description</label>
              <textarea className="w-full p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-blue-500 transition-all outline-none min-h-[100px]" 
                     placeholder="Details..."
                     value={description} onChange={(e) => setDescription(e.target.value)} required />
            </div>

            <button type="submit" disabled={isCompressing} className="w-full bg-blue-600 disabled:bg-gray-400 text-white py-5 rounded-[2rem] font-black text-lg hover:bg-black transition-all shadow-xl active:scale-95">
              {isCompressing ? "Optimizing..." : "Add to Shop Inventory"}
            </button>
          </form>
        </div>

        {/* 2. CURRENT INVENTORY (REMOVE FEATURE) */}
        <div className="lg:w-7/12">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-black tracking-tighter flex items-center gap-3">
              <FiPackage className="text-gray-400" /> Stock
            </h1>
            <span className="bg-gray-100 px-4 py-1.5 rounded-full text-[10px] font-black text-gray-500 uppercase tracking-widest">
              {manualProducts.length} Items
            </span>
          </div>
          
          <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl overflow-hidden">
            <div className="max-h-[650px] overflow-y-auto">
              {manualProducts.length > 0 ? (
                <div className="divide-y divide-gray-50">
                  {manualProducts.map((product) => (
                    <div key={product._id} className="p-5 flex items-center justify-between hover:bg-gray-50/50 transition-colors">
                      <div className="flex items-center gap-5">
                        <img src={product.image} className="w-16 h-16 rounded-2xl object-cover bg-gray-100 shadow-sm" alt="" />
                        <div>
                          <p className="font-bold text-gray-900 leading-tight">{product.name}</p>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="text-blue-600 font-black text-sm">${product.price}</span>
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter bg-gray-100 px-2 py-0.5 rounded-md">{product.brand}</span>
                          </div>
                        </div>
                      </div>
                      <button 
                        onClick={() => handleDelete(product._id)}
                        className="p-4 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all"
                      >
                        <FiTrash2 size={20} />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-32 text-gray-400 flex flex-col items-center gap-4">
                  <FiPackage size={40} className="opacity-20" />
                  <p className="font-bold italic">No products found in your local inventory.</p>
                </div>
              )}
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default AdminAddProduct;