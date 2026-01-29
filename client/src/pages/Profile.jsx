import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../store/authSlice'; // Ensure this exists
import { FiChevronRight, FiClock, FiCheckCircle, FiArrowLeft, FiLogOut, FiPackage } from 'react-icons/fi';

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { orders } = useSelector((state) => state.cart);

  // 🚀 Filter past orders specifically for this user
  const userOrders = orders.filter((order) => order.user === userInfo?.email);

  const logoutHandler = () => {
    dispatch(logout());
    navigate('/'); // 🚀 Directly to Home on logout
  };

  return (
    <div className="container mx-auto px-6 py-12 max-w-5xl animate-in fade-in duration-700">
      
      {/* 🚀 QUICK ACTION BAR */}
      <div className="flex justify-between items-center mb-12">
        <button 
          onClick={() => navigate('/')} 
          className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-blue-600 transition-colors"
        >
          <FiArrowLeft size={14}/> Back to Store
        </button>
        
        <button 
          onClick={logoutHandler}
          className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-red-500 hover:bg-red-50 px-4 py-2 rounded-full transition-all"
        >
          Logout <FiLogOut size={14}/>
        </button>
      </div>

      <div className="mb-12">
        <h1 className="text-5xl font-black tracking-tighter italic text-gray-900">Account.</h1>
        <div className="flex items-center gap-3 mt-4">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-black">
                {userInfo?.name?.charAt(0).toUpperCase()}
            </div>
            <div>
                <p className="text-gray-900 font-bold leading-none">{userInfo?.name}</p>
                <p className="text-gray-400 text-xs font-medium">{userInfo?.email}</p>
            </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-2 mb-4">
            <FiPackage className="text-blue-600" />
            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Order History</h2>
        </div>

        {userOrders.length > 0 ? (
          userOrders.map((order) => (
            <div key={order._id} className="group bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col md:flex-row items-center justify-between hover:shadow-xl hover:border-blue-100 transition-all duration-300">
              <div className="flex items-center gap-6 w-full md:w-auto">
                <div className={`w-16 h-16 rounded-3xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 ${
                  order.status === 'Delivered' ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-blue-600'
                }`}>
                  {order.status === 'Delivered' ? <FiCheckCircle size={28}/> : <FiClock size={28}/>}
                </div>
                <div>
                  <h4 className="font-black text-lg text-gray-900">#{order._id}</h4>
                  <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-1">
                    {new Date(order.paidAt || order.createdAt).toLocaleDateString()} • {order.orderItems.length} Items
                  </p>
                  <div className={`inline-block mt-2 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                    order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {order.status}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between md:justify-end gap-10 w-full md:w-auto mt-6 md:mt-0 pt-6 md:pt-0 border-t md:border-t-0 border-gray-50">
                <div className="text-left md:text-right">
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em]">Paid Amount</p>
                  <p className="font-black text-2xl text-gray-900">${order.totalPrice}</p>
                </div>
                <Link 
                  to={`/order/${order._id}`}
                  className="bg-black text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 transition-all shadow-lg active:scale-95 flex items-center gap-2"
                >
                  Details <FiChevronRight />
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-24 bg-gray-50 rounded-[3.5rem] border-2 border-dashed border-gray-200">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                <FiPackage className="text-gray-300" size={32} />
            </div>
            <p className="text-gray-400 font-black text-xl tracking-tighter uppercase italic">No history yet.</p>
            <Link 
                to="/" 
                className="mt-6 inline-block bg-blue-600 text-white px-10 py-4 rounded-full font-black text-xs uppercase tracking-widest hover:bg-black transition-all"
            >
                Start Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;