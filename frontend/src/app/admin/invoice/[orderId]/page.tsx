'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Download, ArrowLeft } from 'lucide-react';
import { API_URL } from '@/lib/config';

export default function Invoice() {
  const params = useParams();
  const router = useRouter();
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    fetchOrder();
  }, []);

  const fetchOrder = async () => {
    const res = await fetch(`${API_URL}/orders/${params.orderId}`);
    const data = await res.json();
    if (data.success) setOrder(data.data);
  };

  const handlePrint = () => {
    window.print();
  };

  if (!order) return <div className="p-8 text-white">Loading...</div>;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex gap-4 mb-6 print:hidden">
          <button onClick={() => router.back()} className="flex items-center gap-2 px-4 py-2 bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg hover:bg-slate-300 dark:hover:bg-slate-700 transition-all">
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <button onClick={handlePrint} className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg hover:shadow-lg transition-all">
            <Download className="w-4 h-4" />
            Download PDF
          </button>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-8 shadow-lg print:shadow-none print:border-0">
          <div className="flex justify-between items-start mb-8 pb-6 border-b border-slate-200 dark:border-slate-800">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">INVOICE</h1>
              <p className="text-slate-600 dark:text-slate-400">Order ID: {order.orderId}</p>
              <p className="text-slate-600 dark:text-slate-400">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
            </div>
            <div className="text-right">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent print:text-emerald-600 print:bg-none">HackiBits</h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">Made in India</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white mb-2">Bill To:</h3>
              <p className="text-slate-700 dark:text-slate-300">{order.customer?.name}</p>
              <p className="text-slate-600 dark:text-slate-400">{order.customer?.email}</p>
              <p className="text-slate-600 dark:text-slate-400">{order.customer?.phone}</p>
              <p className="text-slate-600 dark:text-slate-400">{order.customer?.address}</p>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white mb-2">Payment Status:</h3>
              <p className="text-slate-700 dark:text-slate-300 capitalize">{order.status}</p>
            </div>
          </div>

          <table className="w-full mb-8">
            <thead>
              <tr className="border-b-2 border-slate-200 dark:border-slate-800">
                <th className="text-left py-3 text-slate-900 dark:text-white">Item</th>
                <th className="text-center py-3 text-slate-900 dark:text-white">Qty</th>
                <th className="text-right py-3 text-slate-900 dark:text-white">Price</th>
                <th className="text-right py-3 text-slate-900 dark:text-white">Total</th>
              </tr>
            </thead>
            <tbody>
              {order.items?.map((item: any) => (
                <tr key={item._id} className="border-b border-slate-200 dark:border-slate-800">
                  <td className="py-3 text-slate-700 dark:text-slate-300">{item.product?.name}</td>
                  <td className="py-3 text-center text-slate-700 dark:text-slate-300">{item.quantity}</td>
                  <td className="py-3 text-right text-slate-700 dark:text-slate-300">₹{item.price}</td>
                  <td className="py-3 text-right text-slate-700 dark:text-slate-300">₹{item.price * item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-end">
            <div className="w-64">
              <div className="flex justify-between py-2 border-t-2 border-slate-200 dark:border-slate-800">
                <span className="font-bold text-slate-900 dark:text-white">Total:</span>
                <span className="font-bold text-2xl bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">₹{order.total}</span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 text-center text-sm text-slate-500 dark:text-slate-400">
            <p>Thank you for your business!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
