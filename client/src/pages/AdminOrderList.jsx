import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { FiEye, FiSearch, FiFilter, FiDownload, FiAlertCircle, FiCheck } from 'react-icons/fi';
import { updateOrderStatus, processReturn } from '../store/cartSlice';
import { toast } from 'react-toastify';

const AdminOrderList = () => {
  const { orders } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  // 🚀 New: Tab and Filter States
  const [activeTab, setActiveTab] = useState('all'); // 'all' or 'returns'
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const handleStatusChange = (orderId, newStatus) => {
    dispatch(updateOrderStatus({ orderId, newStatus }));
    toast.success(`Order status updated to ${newStatus}`);
  };

  const handleProcessReturn = (orderId, decision) => {
    dispatch(processReturn({ orderId, decision }));
    toast.info(`Return request ${decision}`);
  };

  // 🚀 Logic: Filter based on Active Tab AND Search/Status
  const filteredOrders = orders.filter((order) => {
    const isReturnTab = activeTab === 'returns';
    const matchesTab = isReturnTab ? order.status === 'Return Requested' : true;
    
    const matchesSearch = 
      order._id.toLowerCase().includes(searchTerm.toLowerCase()) || 
      order.user.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || order.status === statusFilter;
    
    return matchesTab && matchesSearch && matchesStatus;
  });

  const downloadCSV = () => {
    const headers = ['Order ID', 'User', 'Date', 'Total', 'Status'];
    const rows = filteredOrders.map(o => [
      o._id, o.user, new Date(o.paidAt).toLocaleDateString(), o.totalPrice, o.status
    ]);
    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `SwiftShop_Orders_${activeTab}.csv`;
    link.click();
  };

  return (
    <div className="container mx-auto px-6 py-10">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-10 gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tighter">Order Command Center</h1>
          <p className="text-gray-500 font-medium">Manage logistics and customer returns.</p>
        </div>

        {/* 🚀 Tab Switcher */}
        <div className="flex bg-gray-100 p-1.5 rounded-[1.5rem] w-full lg:w-auto shadow-inner">
          <button 
            onClick={() => setActiveTab('all')}
            className={`flex-1 lg:flex-none px-8 py-3 rounded-[1.2rem] text-xs font-black uppercase tracking-widest transition-all ${
              activeTab === 'all' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-400'
            }`}
          >
            All Orders
          </button>
          <button 
            onClick={() => setActiveTab('returns')}
            className={`flex-1 lg:flex-none px-8 py-3 rounded-[1.2rem] text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
              activeTab === 'returns' ? 'bg-white text-red-600 shadow-sm' : 'text-gray-400'
            }`}
          >
            {activeTab === 'returns' && <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />}
            Returns
          </button>
        </div>
      </div>

      {/* Control Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="md:col-span-1 relative">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" placeholder="Search ID or Customer..." 
            className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl border border-gray-100 focus:ring-2 focus:ring-blue-500 shadow-sm"
            value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select 
          className="py-4 px-6 bg-white rounded-2xl border border-gray-100 font-bold text-sm shadow-sm outline-none"
          value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Statuses</option>
          <option value="Processing">Processing</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
          <option value="Return Requested">Return Requested</option>
        </select>
        <button 
          onClick={downloadCSV}
          className="flex items-center justify-center gap-2 bg-black text-white px-6 py-4 rounded-2xl font-bold hover:bg-blue-600 transition-all shadow-lg"
        >
          <FiDownload /> Export {activeTab === 'all' ? 'List' : 'Returns'}
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-gray-100">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 text-[10px] font-black uppercase tracking-widest text-gray-400">
              <th className="p-6">Order Details</th>
              <th className="p-6">Date</th>
              <th className="p-6">Amount</th>
              <th className="p-6">Status</th>
              <th className="p-6">Quick Actions</th>
              <th className="p-6 text-right">Invoice</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filteredOrders.map((order) => (
              <tr key={order._id} className={`hover:bg-gray-50/50 transition-colors ${order.status === 'Return Requested' ? 'bg-red-50/30' : ''}`}>
                <td className="p-6">
                  <div className="font-bold text-xs text-gray-900">{order._id}</div>
                  <div className="text-[11px] text-gray-400 font-medium">{order.user}</div>
                </td>
                <td className="p-6 text-xs font-bold text-gray-500">
                  {new Date(order.paidAt).toLocaleDateString()}
                </td>
                <td className="p-6 font-black text-blue-600">
                  ${order.totalPrice}
                </td>
                <td className="p-6">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                    order.status === 'Return Requested' ? 'bg-red-100 text-red-600' : 
                    order.status === 'Delivered' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="p-6">
                  {order.status === 'Return Requested' ? (
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleProcessReturn(order._id, 'Refunded')}
                        className="bg-red-600 text-white p-2 rounded-lg hover:bg-black transition-all" title="Approve Refund"
                      >
                        <FiCheck />
                      </button>
                      <button 
                        onClick={() => handleStatusChange(order._id, 'Delivered')}
                        className="bg-gray-200 text-gray-600 p-2 rounded-lg hover:bg-gray-300 transition-all" title="Reject Return"
                      >
                        <FiAlertCircle />
                      </button>
                    </div>
                  ) : (
                    <select 
                      value={order.status}
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                      className="text-[10px] font-black uppercase bg-gray-100 border-none rounded-lg p-2 outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Out for Delivery">Out for Delivery</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  )}
                </td>
                <td className="p-6 text-right">
                  <Link to={`/order/${order._id}`} className="inline-flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase hover:bg-blue-600 transition-all">
                    <FiEye /> View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredOrders.length === 0 && (
          <div className="p-32 text-center">
            <div className="inline-flex p-6 bg-gray-50 rounded-full mb-4">
              <FiSearch size={32} className="text-gray-200" />
            </div>
            <p className="text-gray-400 font-black uppercase tracking-widest text-xs">No matching orders found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrderList;