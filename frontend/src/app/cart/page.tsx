'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trash2, Plus, Minus } from 'lucide-react';
import Link from 'next/link';

export default function Cart() {
  const [cart, setCart] = useState<any>({ items: [] });
  const [sessionId] = useState(() => 
    typeof window !== 'undefined' ? localStorage.getItem('sessionId') || '' : ''
  );

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart/${sessionId}`);
    const data = await res.json();
    if (data.success) setCart(data.data);
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    if (quantity < 1) return;
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart/update`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId, productId, quantity })
    });
    const data = await res.json();
    if (data.success) setCart(data.data);
  };

  const removeItem = async (productId: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart/remove`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId, productId })
    });
    const data = await res.json();
    if (data.success) setCart(data.data);
  };

  const total = cart.items?.reduce((sum: number, item: any) => 
    sum + (item.product?.price || 0) * item.quantity, 0) || 0;

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-orbitron font-bold mb-12 text-slate-900 dark:text-white">
          Shopping <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400">Cart</span>
        </h1>

        {cart.items?.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-6">Your cart is empty</p>
            <Link href="/products" className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-bold inline-block">
              Browse Products
            </Link>
          </div>
        ) : (
          <>
            <div className="space-y-4 mb-8">
              {cart.items?.map((item: any) => (
                <motion.div
                  key={item.product?._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white dark:bg-slate-800 rounded-2xl p-6 border-2 border-slate-200 dark:border-slate-700 flex items-center gap-6"
                >
                  <div className="flex-1">
                    <h3 className="text-xl font-orbitron font-bold text-slate-900 dark:text-white mb-2">{item.product?.name}</h3>
                    <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">₹{item.product?.price}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button onClick={() => updateQuantity(item.product._id, item.quantity - 1)} className="p-2 bg-slate-200 dark:bg-slate-700 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600">
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="text-xl font-bold w-8 text-center">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.product._id, item.quantity + 1)} className="p-2 bg-slate-200 dark:bg-slate-700 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600">
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <button onClick={() => removeItem(item.product._id)} className="p-3 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </motion.div>
              ))}
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 border-2 border-slate-200 dark:border-slate-700">
              <div className="flex justify-between items-center mb-6">
                <span className="text-2xl font-orbitron font-bold text-slate-900 dark:text-white">Total</span>
                <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400">₹{total}</span>
              </div>
              <Link href="/checkout" className="block w-full px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-bold text-center text-lg hover:shadow-lg transition-all">
                Proceed to Checkout
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
