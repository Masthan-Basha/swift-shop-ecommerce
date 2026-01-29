import React from 'react';
import { useSelector } from 'react-redux';
import Product from '../components/Product';

const BestSellers = () => {
  // 1. Get both orders and products from the cart slice
  const { orders = [], manualProducts = [] } = useSelector((state) => state.cart || {});

  // 2. Logic: Count occurrences/quantity of each product in the orders list
  const getTopSellers = () => {
    const salesMap = {};

    // Loop through all orders and all items in those orders
    orders.forEach((order) => {
      order.orderItems.forEach((item) => {
        const id = item._id;
        const qty = Number(item.qty) || 1;
        salesMap[id] = (salesMap[id] || 0) + qty;
      });
    });

    // Sort manualProducts based on the salesMap counts
    return [...manualProducts]
      .filter(product => salesMap[product._id] > 0) // Only show items actually sold
      .sort((a, b) => (salesMap[b._id] || 0) - (salesMap[a._id] || 0))
      .slice(0, 8); // Top 8 sellers
  };

  const topSellers = getTopSellers();

  return (
    <div className="py-10">
      <div className="mb-10 text-center">
        <span className="text-orange-500 font-bold uppercase tracking-widest text-[10px]">Most Wanted</span>
        <h1 className="text-4xl font-black tracking-tighter mt-2">BEST SELLERS</h1>
        <p className="text-gray-500 text-sm mt-2 font-medium italic">Based on recent customer purchases</p>
      </div>

      {topSellers.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {topSellers.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-50 rounded-[2rem] border-2 border-dashed border-gray-200">
          <p className="text-gray-400 font-medium">No sales data yet. Once orders are placed, best sellers will appear here!</p>
        </div>
      )}
    </div>
  );
};

export default BestSellers;