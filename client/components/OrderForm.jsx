'use client';
import React, { useState } from 'react';
import API from '../utils/api';
import { Users, Package, FileText, ArrowRight, Check, AlertCircle, Upload, X } from 'lucide-react';

export default function OrderForm() {
  const [form, setForm] = useState({
    customerName: '', email: '', contactNumber: '', shippingAddress: '', productName: '', quantity: 1
  });
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setMsg(null);
    try {
      const data = new FormData();
      Object.keys(form).forEach(k => data.append(k, form[k]));
      if (file) data.append('productImage', file);

      const res = await API.post('/orders', data, { headers: { 'Content-Type': 'multipart/form-data' } });
      setMsg({ type: 'success', text: 'Order placed successfully!' });
      setForm({ customerName:'', email:'', contactNumber:'', shippingAddress:'', productName:'', quantity:1 });
      setFile(null);
    } catch (err) {
      const text = err.response?.data?.message || 'Failed to place order';
      setMsg({ type: 'error', text });
    } finally { setLoading(false); }
  };

   const removeFile = () => setFile(null);
  return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-2xl mb-6">
            <Package className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Place Your Order</h1>
          <p className="text-lg text-gray-600 max-w-md mx-auto">
            Fill out the form below and we'll get your order processed quickly and efficiently.
          </p>
        </div>

        {/* Alert Message */}
        {msg && (
          <div className={`mb-8 p-4 rounded-xl border-l-4 ${
            msg.type === 'success' 
              ? 'bg-emerald-50 border-emerald-500 text-emerald-700' 
              : 'bg-red-50 border-red-500 text-red-700'
          } flex items-center gap-3 animate-in slide-in-from-top duration-300`}>
            {msg.type === 'success' ? (
              <Check className="w-5 h-5 text-emerald-600" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-600" />
            )}
            <span className="font-medium">{msg.text}</span>
          </div>
        )}

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="px-8 py-6 border-b border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-900">Order Information</h2>
            <p className="text-gray-600 mt-1">Please provide accurate details for processing</p>
          </div>
          
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Customer Name</label>
                <input
                  name="customerName"
                  value={form.customerName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 text-gray-900 placeholder-gray-500"
                  required
                  minLength={3}
                  maxLength={30}
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Email Address</label>
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  type="email"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 text-gray-900 placeholder-gray-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Contact Number</label>
              <input
                name="contactNumber"
                value={form.contactNumber}
                onChange={handleChange}
                placeholder="1234567890"
                pattern="\d{10}"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 text-gray-900 placeholder-gray-500"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Shipping Address</label>
              <textarea
                name="shippingAddress"
                value={form.shippingAddress}
                onChange={handleChange}
                placeholder="Enter your complete shipping address"
                maxLength={100}
                required
                rows={3}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 text-gray-900 placeholder-gray-500 resize-none"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Product Name</label>
                <input
                  name="productName"
                  value={form.productName}
                  onChange={handleChange}
                  placeholder="What would you like to order?"
                  minLength={3}
                  maxLength={50}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 text-gray-900 placeholder-gray-500"
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Quantity</label>
                <input
                  name="quantity"
                  value={form.quantity}
                  onChange={handleChange}
                  type="number"
                  min={1}
                  max={100}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 text-gray-900"
                />
              </div>
            </div>

            {/* File Upload */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Product Image (Optional)</label>
              <div className="relative">
                {!file ? (
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-2 text-gray-400" />
                      <p className="text-sm text-gray-600 font-medium">Click to upload image</p>
                      <p className="text-xs text-gray-500">PNG, JPG or JPEG (MAX. 10MB)</p>
                    </div>
                    <input
                      type="file"
                      accept=".jpg,.jpeg,.png"
                      onChange={(e) => setFile(e.target.files?.[0] || null)}
                      className="hidden"
                    />
                  </label>
                ) : (
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl border border-blue-200">
                    <div className="flex items-center gap-3">
                      <FileText className="w-8 h-8 text-blue-600" />
                      <div>
                        <p className="text-sm font-medium text-blue-900">{file.name}</p>
                        <p className="text-xs text-blue-600">{Math.round(file.size / 1024)} KB</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={removeFile}
                      className="p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Placing Order...
                </>
              ) : (
                <>
                  Place Order
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
