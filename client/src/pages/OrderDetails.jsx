import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FiPrinter, FiPackage, FiTruck, FiCheckCircle, FiChevronLeft, FiRefreshCw, FiClock } from 'react-icons/fi';
import { requestReturn } from '../store/cartSlice';

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { orders } = useSelector((state) => state.cart);
  const order = orders.find((o) => o._id === id);

  if (!order) return (
    <div className="p-20 text-center">
      <h2 className="text-2xl font-bold">Order Not Found</h2>
      <button onClick={() => navigate('/')} className="mt-4 text-blue-600 underline">Back to Home</button>
    </div>
  );

  const steps = ['Processing', 'Shipped', 'Out for Delivery', 'Delivered'];
  const currentStepIndex = steps.indexOf(order.status);
  const isReturnRequested = order.status === 'Return Requested';
  const isRefunded = order.status === 'Refunded' || order.status === 'Replacement Sent';

  return (
    <div className="container mx-auto px-6 py-10 max-w-4xl">
      {/* 🛠️ Action Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4 print:hidden">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-gray-500 hover:text-black font-bold transition-colors"
        >
          <FiChevronLeft /> Back to Orders
        </button>
        
        <div className="flex gap-3">
          {order.status === 'Delivered' && (
            <button 
              onClick={() => dispatch(requestReturn(order._id))}
              className="flex items-center gap-2 bg-gray-100 text-gray-700 px-6 py-3 rounded-2xl font-bold hover:bg-red-50 hover:text-red-600 transition-all"
            >
              <FiRefreshCw /> Request Return
            </button>
          )}
          <button 
            onClick={() => window.print()}
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-black transition-all shadow-lg shadow-blue-200"
          >
            <FiPrinter /> Print Invoice
          </button>
        </div>
      </div>

      {/* 🚚 Section 1: Visual Tracking Bar (Hidden if Return/Refund is active) */}
      {!isReturnRequested && !isRefunded ? (
        <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-gray-100 mb-8 print:hidden">
          <h3 className="font-black uppercase tracking-widest text-[10px] text-gray-400 mb-8">Delivery Progress</h3>
          <div className="flex justify-between relative">
            <div className="absolute top-5 left-0 w-full h-1 bg-gray-100 -z-0"></div>
            {steps.map((step, index) => (
              <div key={step} className="relative z-10 flex flex-col items-center w-1/4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-4 transition-all duration-500 ${
                  index <= currentStepIndex ? 'bg-blue-600 border-blue-100 text-white' : 'bg-white border-gray-100 text-gray-300'
                }`}>
                  {index === 0 && <FiPackage />}
                  {index === 1 && <FiTruck />}
                  {index === 2 && <FiTruck className="scale-x-[-1]" />}
                  {index === 3 && <FiCheckCircle />}
                </div>
                <span className={`mt-3 text-[9px] font-black uppercase tracking-tighter text-center ${
                  index <= currentStepIndex ? 'text-blue-600' : 'text-gray-300'
                }`}>{step}</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className={`p-8 rounded-[2rem] mb-8 flex items-center gap-4 ${isReturnRequested ? 'bg-orange-50 text-orange-700' : 'bg-green-50 text-green-700'}`}>
          <FiRefreshCw className={isReturnRequested ? 'animate-spin' : ''} size={24} />
          <div>
            <p className="font-black uppercase tracking-widest text-xs">Order Status: {order.status}</p>
            <p className="text-sm font-medium opacity-80">
              {isReturnRequested ? 'The admin is currently reviewing your return request.' : 'Your refund/replacement has been processed.'}
            </p>
          </div>
        </div>
      )}

      {/* 🧾 Section 2: Invoice Content */}
      <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl border border-gray-100 print:shadow-none print:border-0 print:p-0">
        <div className="flex justify-between items-start mb-12">
          <div>
            <h1 className="text-3xl font-black tracking-tighter mb-2">INVOICE</h1>
            <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Order ID: {order._id}</p>
            <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Date: {new Date(order.paidAt).toLocaleDateString()}</p>
          </div>
          <div className="text-right">
            <h2 className="font-black text-blue-600">SWIFT SHOP</h2>
            <p className="text-xs text-gray-500 font-bold tracking-widest">OFFICIAL RECEIPT</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 mb-12 py-8 border-y border-gray-50">
          <div>
            <h4 className="font-black uppercase tracking-widest text-[10px] text-gray-400 mb-3">Shipping To</h4>
            <p className="font-bold text-gray-800">{order.shippingAddress?.address}</p>
            <p className="text-gray-600 text-sm font-medium">{order.shippingAddress?.city}, {order.shippingAddress?.postalCode}</p>
          </div>
          <div className="text-right">
            <h4 className="font-black uppercase tracking-widest text-[10px] text-gray-400 mb-3">Payment Info</h4>
            <p className="font-bold text-gray-800">{order.paymentMethod}</p>
            <p className="text-green-600 text-[10px] font-black uppercase tracking-widest">Transaction: Verified</p>
          </div>
        </div>

        <div className="mb-12">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] font-black uppercase text-gray-400 border-b border-gray-100">
                <th className="pb-4">Product Description</th>
                <th className="pb-4 text-center">Qty</th>
                <th className="pb-4 text-right">Price</th>
                <th className="pb-4 text-right">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {order.orderItems.map((item) => (
                <tr key={item._id}>
                  <td className="py-5 font-bold text-sm text-gray-900">{item.name}</td>
                  <td className="py-5 text-center font-medium text-gray-500">{item.qty}</td>
                  <td className="py-5 text-right text-gray-500 font-medium">${item.price}</td>
                  <td className="py-5 text-right font-black text-gray-900">${(item.price * item.qty).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-end pt-6 border-t-2 border-dashed border-gray-100">
          {/* 🚀 NEW: Vertical Tracking History Log (Left side of footer) */}
          <div className="hidden md:block w-1/2">
             <h4 className="font-black uppercase tracking-widest text-[9px] text-gray-300 mb-4">Tracking History</h4>
             <div className="space-y-4">
               {order.trackingHistory?.slice(-3).reverse().map((log, i) => (
                 <div key={i} className="flex gap-3 items-center">
                   <FiClock className="text-gray-300" size={12}/>
                   <span className="text-[10px] font-bold text-gray-400 uppercase">{log.status}</span>
                   <span className="text-[10px] text-gray-300">{new Date(log.time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                 </div>
               ))}
             </div>
          </div>

          <div className="w-full md:w-1/3 space-y-3">
            <div className="flex justify-between text-gray-400 text-[11px] font-bold uppercase tracking-widest">
              <span>Items Subtotal</span>
              <span>${order.itemsPrice}</span>
            </div>
            <div className="flex justify-between text-gray-400 text-[11px] font-bold uppercase tracking-widest">
              <span>Shipping</span>
              <span>${order.shippingPrice}</span>
            </div>
            <div className="flex justify-between text-2xl font-black text-blue-600 pt-4">
              <span>Total Paid</span>
              <span>${order.totalPrice}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;