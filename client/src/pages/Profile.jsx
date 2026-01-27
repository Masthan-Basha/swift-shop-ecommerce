import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FiChevronRight, FiClock, FiCheckCircle } from 'react-icons/fi';

const Profile = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { orders } = useSelector((state) => state.cart);

  // 🚀 Filter past orders specifically for this user
  const userOrders = orders.filter((order) => order.user === userInfo?.email);

  return (
    <div className="container mx-auto px-6 py-10">
      <div className="mb-10">
        <h1 className="text-4xl font-black tracking-tighter">Purchase History</h1>
        <p className="text-gray-500 mt-2 font-medium">Manage your past orders and tracking status.</p>
      </div>

      <div className="space-y-4">
        {userOrders.length > 0 ? (
          userOrders.map((order) => (
            <div key={order._id} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex items-center justify-between hover:shadow-md transition-all">
              <div className="flex items-center gap-6">
                <div className={`p-4 rounded-2xl ${order.status === 'Delivered' ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-blue-600'}`}>
                  {order.status === 'Delivered' ? <FiCheckCircle size={24}/> : <FiClock size={24}/>}
                </div>
                <div>
                  <h4 className="font-black text-sm text-gray-900">Order #{order._id}</h4>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">
                    {new Date(order.paidAt).toLocaleDateString()} • {order.orderItems.length} Items
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-8">
                <div className="text-right hidden md:block">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Amount</p>
                  <p className="font-black text-lg">${order.totalPrice}</p>
                </div>
                <Link 
                  to={`/order/${order._id}`}
                  className="bg-gray-900 text-white px-6 py-3 rounded-xl font-bold text-xs hover:bg-blue-600 transition-all flex items-center gap-2"
                >
                  Track & Invoice <FiChevronRight />
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-200">
            <p className="text-gray-400 font-bold text-xl">No past orders found.</p>
            <Link to="/" className="text-blue-600 font-bold mt-4 inline-block underline">Start Shopping</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;