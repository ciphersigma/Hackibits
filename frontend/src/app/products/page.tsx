'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Plus } from 'lucide-react';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({ items: [] });
  const [sessionId] = useState(() => 
    typeof window !== 'undefined' ? localStorage.getItem('sessionId') || Math.random().toString(36).substr(2, 9) : ''
  );

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('sessionId', sessionId);
    }
    fetchProducts();
    fetchCart();
  }, [sessionId]);

  const fetchProducts = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
    const data = await res.json();
    if (data.success) setProducts(data.data);
  };

  const fetchCart = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart/${sessionId}`);
    const data = await res.json();
    if (data.success) setCart(data.data);
  };

  const addToCart = async (productId: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId, productId, quantity: 1 })
    });
    const data = await res.json();
    if (data.success) setCart(data.data);
  };

  const cartCount = cart.items?.reduce((sum: number, item: any) => sum + item.quantity, 0) || 0;

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-5xl font-orbitron font-bold text-slate-900 dark:text-white">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400">Modules</span>
          </h1>
          <a href="/cart" className="relative px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold flex items-center gap-2 hover:bg-emerald-700 transition-colors">
            <ShoppingCart className="w-5 h-5" />
            Cart {cartCount > 0 && `(${cartCount})`}
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product: any, idx: number) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white dark:bg-slate-800 rounded-3xl border-2 border-slate-200 dark:border-slate-700 p-6 hover:border-emerald-400 dark:hover:border-emerald-500 transition-all shadow-lg"
            >
              <h3 className="text-2xl font-orbitron font-bold mb-3 text-slate-900 dark:text-white">{product.name}</h3>
              <p className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 mb-4">₹{product.price}</p>
              <p className="text-slate-600 dark:text-slate-400 mb-4">{product.description}</p>
              <ul className="space-y-2 mb-6">
                {product.features?.map((feature: string, i: number) => (
                  <li key={i} className="text-sm text-slate-600 dark:text-slate-400">• {feature}</li>
                ))}
              </ul>
              <button
                onClick={() => addToCart(product._id)}
                disabled={!product.inStock}
                className="w-full px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Plus className="w-5 h-5" />
                {product.inStock ? 'Add to Cart' : 'Out of Stock'}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
