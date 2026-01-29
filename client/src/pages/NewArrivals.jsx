import React from 'react';
import { useSelector } from 'react-redux';
import Product from '../components/Product';

const NewArrivals = () => {
  // 1. Point to state.cart because that's where manualProducts lives
  // 2. Use a fallback empty object || {} to prevent crashes
  const { manualProducts = [] } = useSelector((state) => state.cart || {});

  // 3. Logic: Sort by newest added and take top 8
  // We use [...manualProducts] to avoid mutating the original Redux state
  const latestProducts = [...manualProducts]
    .reverse() 
    .slice(0, 8);

  return (
    <div className="py-10">
      <div className="mb-10 text-center">
        <span className="text-blue-600 font-bold uppercase tracking-widest text-[10px]">Just Added</span>
        <h1 className="text-4xl font-black tracking-tighter mt-2">NEW ARRIVALS</h1>
      </div>

      {latestProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {latestProducts.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-50 rounded-[2rem] border-2 border-dashed border-gray-200">
          <p className="text-gray-400 font-medium">No new arrivals found. Add some in the Admin panel!</p>
        </div>
      )}
    </div>
  );
};

export default NewArrivals;