'use client';

import { useState, useEffect } from 'react';
import { Bell, User, Moon, Sun, X } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { API_URL } from '@/lib/config';
import { useRouter } from 'next/navigation';

export default function AdminHeader() {
  const router = useRouter();
  const [adminEmail, setAdminEmail] = useState('');
  const [notifications, setNotifications] = useState<any[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const email = localStorage.getItem('adminEmail');
    setAdminEmail(email || '');
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 10000);
    return () => clearInterval(interval);
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await fetch(`${API_URL}/orders`);
      if (!res.ok) return;
      const data = await res.json();
      if (data.success) {
        const pendingOrders = data.data.filter((o: any) => o.status === 'pending');
        setNotifications(pendingOrders);
      }
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    }
  };

  return (
    <header className="fixed top-0 right-0 left-64 h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-end px-8 gap-4 transition-colors z-40">
      <button 
        onClick={toggleTheme}
        className="p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
      >
        {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>

      <div className="relative">
        <button 
          onClick={() => setShowNotifications(!showNotifications)}
          className="relative p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <Bell className="w-5 h-5" />
          {notifications.length > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
              {notifications.length}
            </span>
          )}
        </button>

        {showNotifications && (
          <div className="absolute right-0 top-12 w-80 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-xl z-50">
            <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
              <h3 className="font-bold text-slate-900 dark:text-white">Notifications</h3>
              <button onClick={() => setShowNotifications(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {notifications.length === 0 ? (
                <p className="p-4 text-center text-slate-500 dark:text-slate-400">No new orders</p>
              ) : (
                notifications.map((order: any) => (
                  <div 
                    key={order._id} 
                    onClick={() => {
                      router.push('/admin/orders');
                      setShowNotifications(false);
                    }}
                    className="p-4 border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                  >
                    <p className="font-bold text-slate-900 dark:text-white">{order.orderId}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">₹{order.total} - {order.customer?.name}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">{new Date(order.createdAt).toLocaleString()}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
      
      <div className="flex items-center gap-3 px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg transition-colors">
        <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center shadow-lg">
          <User className="w-4 h-4 text-white" />
        </div>
        <span className="text-sm font-medium text-slate-900 dark:text-white">{adminEmail}</span>
      </div>
    </header>
  );
}
