'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Sidebar from './Sidebar';
import AdminHeader from './AdminHeader';

export default function AdminWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth');
    if (auth !== 'true' && pathname !== '/admin/login') {
      router.push('/admin/login');
    } else {
      setIsAuthenticated(true);
    }
  }, [pathname, router]);

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors print:bg-white">
      <div className="print:hidden">
        <Sidebar />
      </div>
      <div className="flex-1 ml-64 print:ml-0">
        <div className="print:hidden">
          <AdminHeader />
        </div>
        <main className="p-8 pt-24 print:p-0">{children}</main>
      </div>
    </div>
  );
}
