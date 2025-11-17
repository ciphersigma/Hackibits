'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Checkout() {
  const router = useRouter();
  const [cart, setCart] = useState<any>({ items: [] });
  const [customer, setCustomer] = useState({ name: '', email: '', phone: '', address: '' });
  const [sessionId] = useState(() => 
    typeof window !== 'undefined' ? localStorage.getItem('sessionId') || '' : ''
  );

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    const res = await fetch(`http://localhost:5000/api/cart/${sessionId}`);
    const data = await res.json();
    if (data.success) setCart(data.data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/api/orders/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId, customer })
    });
    const data = await res.json();
    if (data.success) {
      router.push(`/order/${data.data.orderId}`);
    }
  };

  const total = cart.items?.reduce((sum: number, item: any) => 
    sum + (item.product?.price || 0) * item.quantity, 0) || 0;

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-orbitron font-bold mb-12 text-slate-900 dark:text-white">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400">Checkout</span>
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 border-2 border-slate-200 dark:border-slate-700">
            <h2 className="text-2xl font-orbitron font-bold mb-6 text-slate-900 dark:text-white">Customer Details</h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                required
                value={customer.name}
                onChange={(e) => setCustomer({...customer, name: e.target.value})}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 rounded-xl focus:border-emerald-500 outline-none"
              />
              <input
                type="email"
                placeholder="Email"
                required
                value={customer.email}
                onChange={(e) => setCustomer({...customer, email: e.target.value})}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 rounded-xl focus:border-emerald-500 outline-none"
              />
              <input
                type="tel"
                placeholder="Phone"
                required
                value={customer.phone}
                onChange={(e) => setCustomer({...customer, phone: e.target.value})}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 rounded-xl focus:border-emerald-500 outline-none"
              />
              <textarea
                placeholder="Address"
                required
                value={customer.address}
                onChange={(e) => setCustomer({...customer, address: e.target.value})}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 rounded-xl focus:border-emerald-500 outline-none h-24"
              />
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 border-2 border-slate-200 dark:border-slate-700">
            <h2 className="text-2xl font-orbitron font-bold mb-4 text-slate-900 dark:text-white">Order Summary</h2>
            <div className="space-y-2 mb-6">
              {cart.items?.map((item: any) => (
                <div key={item.product?._id} className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>{item.product?.name} x {item.quantity}</span>
                  <span>₹{item.product?.price * item.quantity}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center pt-4 border-t-2 border-slate-200 dark:border-slate-700">
              <span className="text-2xl font-orbitron font-bold text-slate-900 dark:text-white">Total</span>
              <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400">₹{total}</span>
            </div>
          </div>

          <button type="submit" className="w-full px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-bold text-lg hover:shadow-lg transition-all">
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
}
