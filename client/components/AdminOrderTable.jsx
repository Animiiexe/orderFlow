'use client';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders, updateQuantity, deleteOrder, addOrderRealtime, updateOrderRealtime, deleteOrderRealtime } from '../store/orderSlice';

import { io } from 'socket.io-client';
import Link from 'next/link';
import { Package } from 'lucide-react';

export default function AdminOrdersTable() {
  const dispatch = useDispatch();
  const orders = useSelector(state => state.orders.list);
  const status = useSelector(state => state.orders.status);
  
  // Modal states
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [newQuantity, setNewQuantity] = useState('');
  const [errors, setErrors] = useState('');

  useEffect(() => {
    dispatch(fetchOrders());
    const socket = io(process.env.NEXT_PUBLIC_API_WS || 'http://localhost:5000', { withCredentials: true });

    socket.on('newOrder', (order) => dispatch(addOrderRealtime(order)));
    socket.on('updateOrder', (order) => dispatch(updateOrderRealtime(order)));
    socket.on('deleteOrder', (payload) => dispatch(deleteOrderRealtime(payload)));

    return () => { socket.disconnect(); };
  }, [dispatch]);

  const onUpdate = (order) => {
    setSelectedOrder(order);
    setNewQuantity(order.quantity.toString());
    setIsEditModalOpen(true);
    setErrors('');
  };

  const onDelete = (order) => {
    setSelectedOrder(order);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedOrder) {
      dispatch(deleteOrder(selectedOrder._id));
      closeDeleteModal();
    }
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    const q = parseInt(newQuantity, 10);
    
    if (!Number.isInteger(q) || q < 1 || q > 100) {
      setErrors('Quantity must be between 1 and 100');
      return;
    }
    
    dispatch(updateQuantity({ id: selectedOrder._id, quantity: q }));
    closeEditModal();
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedOrder(null);
    setNewQuantity('');
    setErrors('');
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedOrder(null);
  };

  if (status === 'loading') return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>
  );

  return (
    <>
      <div className="w-full min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
        {/* Navigation */}
        <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center gap-2">
                <Package className="w-8 h-8 text-blue-600" />
                <span className="text-xl font-bold text-gray-900">OrderFlow</span>
              </div>
              <div className="flex items-center gap-4">
                <Link
                  href="/"
                  className="px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700"
                >
                  <Package className="w-4 h-4" />
                  Client Page
                </Link>
              </div>
            </div>
          </div>
        </nav>
        
        <div className="p-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Orders</h2>
              <p className="text-gray-600">Manage and track your customer orders</p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200/50">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Customer</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Product</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Qty</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {orders.map(o => (
                      <tr key={o._id} className="hover:bg-gray-50/50 transition-colors duration-200 group">
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0 w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center">
                              <span className="text-white font-semibold text-sm">
                                {o.customerName.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">{o.customerName}</div>
                              <div className="text-sm text-gray-500">{o.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-3">
                            {o.productImageUrl && (
                              <img 
                                src={`${process.env.NEXT_PUBLIC_API_URL?.replace('/api','') || 'http://localhost:5000'}${o.productImageUrl}`} 
                                className="w-12 h-12 object-cover rounded-lg shadow-sm border border-gray-200" 
                                alt="Product" 
                              />
                            )}
                            <div>
                              <div className="text-sm font-medium text-gray-900">{o.productName}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
                            {o.quantity}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">
                            {new Date(o.createdAt).toLocaleDateString()}
                          </div>
                          <div className="text-xs text-gray-500">
                            {new Date(o.createdAt).toLocaleTimeString()}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex space-x-2">
                            <button 
                              className="inline-flex items-center px-3 py-2 text-xs font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 hover:border-blue-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                              onClick={() => onUpdate(o)}
                            >
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                              Edit Qty
                            </button>
                            <button 
                              className="inline-flex items-center px-3 py-2 text-xs font-medium text-red-700 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 hover:border-red-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                              onClick={() => onDelete(o)}
                            >
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Quantity Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 transform transition-all">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Update Quantity</h3>
              <button 
                onClick={closeEditModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {selectedOrder && (
              <div className="mb-6">
                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-700 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">
                      {selectedOrder.customerName.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{selectedOrder.customerName}</div>
                    <div className="text-sm text-gray-600">{selectedOrder.productName}</div>
                    <div className="text-xs text-gray-500">Current quantity: {selectedOrder.quantity}</div>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleUpdateSubmit}>
              <div className="mb-4">
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                  New Quantity
                </label>
                <input
                  type="number"
                  id="quantity"
                  min="1"
                  max="100"
                  value={newQuantity}
                  onChange={(e) => setNewQuantity(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter quantity (1-100)"
                  autoFocus
                />
                {errors && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {errors}
                  </p>
                )}
              </div>

              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="flex-1 px-4 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 text-sm font-medium text-white bg-blue-700 rounded-xl hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all transform hover:scale-105"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 transform transition-all">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-red-600">Delete Order</h3>
              <button 
                onClick={closeDeleteModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {selectedOrder && (
              <div className="mb-6">
                <div className="flex items-center space-x-3 p-4 bg-red-50 rounded-xl border border-red-200">
                  <div className="flex-shrink-0 w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{selectedOrder.customerName}</div>
                    <div className="text-sm text-gray-600">{selectedOrder.productName}</div>
                    <div className="text-xs text-gray-500">Quantity: {selectedOrder.quantity}</div>
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-red-50 rounded-lg border border-red-200">
                  <p className="text-sm text-red-700 font-medium">
                    Are you sure you want to delete this order? This action cannot be undone.
                  </p>
                </div>
              </div>
            )}

            <div className="flex space-x-3">
              <button
                type="button"
                onClick={closeDeleteModal}
                className="flex-1 px-4 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteConfirm}
                className="flex-1 px-4 py-3 text-sm font-medium text-white bg-red-600 rounded-xl hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all transform hover:scale-105"
              >
                Delete Order
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}