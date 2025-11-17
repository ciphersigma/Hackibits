'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Package, Mail, Phone, MapPin } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function OrderConfirmation() {
  const params = useParams();
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    fetchOrder();
  }, []);

  const fetchOrder = async () => {
    const res = await fetch(`http://localhost:5000/api/orders/${params.orderId}`);
    const data = await res.json();
    if (data.success) setOrder(data.data);
  };

  if (!order) return <div className="min-h-screen pt-24 flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 print:pt-0 print:pb-0 print:bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 print:px-0">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center mb-12 print:hidden"
        >
          <CheckCircle className="w-20 h-20 text-emerald-600 dark:text-emerald-400 mx-auto mb-6" />
          <h1 className="text-5xl font-orbitron font-bold mb-4 text-slate-900 dark:text-white">
            Order <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400">Confirmed!</span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400">Thank you for your purchase</p>
        </motion.div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 border-2 border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3 mb-6">
              <Package className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              <h2 className="text-2xl font-orbitron font-bold text-slate-900 dark:text-white">Order Details</h2>
            </div>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">Order ID</span>
                <span className="font-bold text-slate-900 dark:text-white">{order.orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">Status</span>
                <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-full text-sm font-bold">{order.status}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">Date</span>
                <span className="font-bold text-slate-900 dark:text-white">{new Date(order.createdAt).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="border-t-2 border-slate-200 dark:border-slate-700 pt-6">
              <h3 className="font-bold text-lg mb-4 text-slate-900 dark:text-white">Items</h3>
              <div className="space-y-3">
                {order.items?.map((item: any) => (
                  <div key={item._id} className="flex justify-between items-center">
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">{item.product?.name}</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t-2 border-slate-200 dark:border-slate-700 pt-6 mt-6">
              <div className="flex justify-between items-center">
                <span className="text-2xl font-orbitron font-bold text-slate-900 dark:text-white">Total</span>
                <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400">₹{order.total}</span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 border-2 border-slate-200 dark:border-slate-700">
            <h2 className="text-2xl font-orbitron font-bold mb-6 text-slate-900 dark:text-white">Delivery Information</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mt-1" />
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Email</p>
                  <p className="font-bold text-slate-900 dark:text-white">{order.customer?.email}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mt-1" />
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Phone</p>
                  <p className="font-bold text-slate-900 dark:text-white">{order.customer?.phone}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mt-1" />
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Address</p>
                  <p className="font-bold text-slate-900 dark:text-white">{order.customer?.address}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4 print:hidden">
            <Link href="/products" className="flex-1 px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-bold text-center hover:shadow-lg transition-all">
              Continue Shopping
            </Link>
            <button onClick={() => window.print()} className="flex-1 px-8 py-4 bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white rounded-xl font-bold hover:border-emerald-500 transition-all">
              Print Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
