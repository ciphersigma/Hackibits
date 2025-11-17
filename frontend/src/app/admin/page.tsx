'use client';

import { useState, useEffect } from 'react';
import { Package, DollarSign, ShoppingCart, TrendingUp } from 'lucide-react';
import { API_URL } from '@/lib/config';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalProducts: 0,
    pendingOrders: 0
  });
  const [apiStatus, setApiStatus] = useState<Record<string, boolean>>({});

  useEffect(() => {
    fetchStats();
    checkApiStatus();
  }, []);

  const fetchStats = async () => {
    try {
      const [ordersRes, productsRes] = await Promise.all([
        fetch(`${API_URL}/orders`),
        fetch(`${API_URL}/products`)
      ]);

      if (!ordersRes.ok || !productsRes.ok) return;

      const ordersData = await ordersRes.json();
      const productsData = await productsRes.json();

      if (ordersData.success && productsData.success) {
        const orders = ordersData.data;
        const completedOrders = orders.filter((o: any) => o.status !== 'cancelled');
        setStats({
          totalOrders: orders.length,
          totalRevenue: completedOrders.reduce((sum: number, o: any) => sum + o.total, 0),
          totalProducts: productsData.data.length,
          pendingOrders: orders.filter((o: any) => o.status === 'pending').length
        });
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  };

  const checkApiStatus = async () => {
    const apis = [
      { name: 'Products API', url: `${API_URL}/products` },
      { name: 'Orders API', url: `${API_URL}/orders` },
      { name: 'Beta Users API', url: `${API_URL}/beta/users` },
      { name: 'Email Service', url: `${API_URL}/beta/email-status` },
      { name: 'Visitors API', url: `${API_URL}/visitors/count` },
      { name: 'Health Check', url: `${API_URL}/health` }
    ];

    const status: Record<string, boolean> = {};
    
    await Promise.all(
      apis.map(async (api) => {
        try {
          const res = await fetch(api.url);
          status[api.name] = res.ok;
        } catch {
          status[api.name] = false;
        }
      })
    );

    setApiStatus(status);
  };

  const statCards = [
    { icon: ShoppingCart, label: 'Total Orders', value: stats.totalOrders, gradient: 'from-emerald-500 to-emerald-600' },
    { icon: DollarSign, label: 'Total Revenue', value: `₹${stats.totalRevenue}`, gradient: 'from-blue-500 to-blue-600' },
    { icon: Package, label: 'Total Products', value: stats.totalProducts, gradient: 'from-purple-500 to-purple-600' },
    { icon: TrendingUp, label: 'Pending Orders', value: stats.pendingOrders, gradient: 'from-orange-500 to-orange-600' }
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">Dashboard</h1>
        <p className="text-slate-600 dark:text-slate-400">Welcome back! Here's what's happening today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all group">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-14 h-14 bg-gradient-to-br ${stat.gradient} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-sm mb-1 font-medium">{stat.label}</p>
              <p className="text-3xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <a href="/admin/products" className="flex items-center gap-3 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-lg hover:shadow-md transition-all group">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-lg flex items-center justify-center">
                <Package className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-slate-900 dark:text-white">Manage Products</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">Add, edit or remove products</p>
              </div>
            </a>
            <a href="/admin/orders" className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg hover:shadow-md transition-all group">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <ShoppingCart className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-slate-900 dark:text-white">View Orders</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">Process and track orders</p>
              </div>
            </a>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">System Status</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-slate-600 dark:text-slate-400">Server Status</span>
              <span className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold">
                <span className="w-2 h-2 bg-emerald-600 rounded-full animate-pulse"></span>
                Online
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-600 dark:text-slate-400">Database</span>
              <span className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold">
                <span className="w-2 h-2 bg-emerald-600 rounded-full animate-pulse"></span>
                Connected
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-600 dark:text-slate-400">Last Updated</span>
              <span className="text-slate-900 dark:text-white font-semibold">{new Date().toLocaleTimeString()}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">API Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(apiStatus).map(([name, status]) => (
            <div key={name} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
              <span className="text-sm text-slate-600 dark:text-slate-400">{name}</span>
              <span className={`flex items-center gap-2 font-semibold text-sm ${
                status ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'
              }`}>
                <span className={`w-2 h-2 rounded-full ${
                  status ? 'bg-emerald-600 animate-pulse' : 'bg-red-600'
                }`}></span>
                {status ? 'Active' : 'Down'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
