'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

declare global {
  interface Window {
    Razorpay: any;
  }
}

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
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart/${sessionId}`);
    const data = await res.json();
    if (data.success) setCart(data.data);
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payment/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, customer })
      });
      const data = await res.json();
      
      if (!data.success) {
        alert(data.message || 'Failed to create order');
        return;
      }
      
      if (!window.Razorpay) {
        alert('Razorpay SDK not loaded');
        return;
      }
      
      const options = {
        key: data.keyId,
        amount: data.amount,
        currency: data.currency,
        name: 'HackiBits',
        description: 'Cybersecurity Hardware',
        order_id: data.orderId,
        handler: async function (response: any) {
          try {
            const verifyRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payment/verify`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                sessionId
              })
            });
            const verifyData = await verifyRes.json();
            if (verifyData.success) {
              router.push(`/order/${verifyData.order.orderId}`);
            } else {
              alert('Payment verification failed');
            }
          } catch (err) {
            console.error('Verification error:', err);
            alert('Payment verification failed');
          }
        },
        prefill: {
          name: customer.name,
          email: customer.email,
          contact: customer.phone
        },
        theme: { color: '#059669' },
        modal: {
          ondismiss: function() {
            console.log('Payment cancelled');
          }
        }
      };
      
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error('Order creation error:', err);
      alert('Failed to create order. Please try again.');
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
