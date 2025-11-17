'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Mail, Github, Linkedin, Instagram, Youtube, Eye } from 'lucide-react';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

export default function Footer() {
  const [visitors, setVisitors] = useState(0);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem('hasVisited');
    
    const fetchVisitors = async () => {
      try {
        if (!hasVisited) {
          const data = await api.incrementVisitors();
          setVisitors(data.count);
          sessionStorage.setItem('hasVisited', 'true');
        } else {
          const data = await api.getVisitorCount();
          setVisitors(data.count);
        }
      } catch (error) {
        console.error('Failed to fetch visitor count:', error);
        setVisitors(0);
      }
    };
    fetchVisitors();
  }, []);
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-orbitron font-bold text-emerald-600 dark:text-emerald-400 mb-4">HackiBits</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm flex items-center gap-2">
              Democratizing cybersecurity education with affordable, modular hardware kits. Made in India <Image src="/india.png" alt="Indian Flag" width={20} height={20} className="rounded-sm inline" />
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400">Home</Link></li>
              <li><Link href="/products" className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400">Products</Link></li>
              <li><Link href="/games" className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400">Games</Link></li>
              <li><Link href="/community" className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400">Community</Link></li>
              <li><Link href="/about" className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400">About</Link></li>
              <li><Link href="/contact" className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/privacy" className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400">Terms of Service</Link></li>
              <li><Link href="/shipping" className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400">Shipping Policy</Link></li>
              <li><Link href="/refund-policy" className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400">Refund Policy</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Connect</h4>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="text-emerald-600 dark:text-emerald-400 hover:opacity-80"><Instagram size={20} /></a>
              <a href="#" className="text-emerald-600 dark:text-emerald-400 hover:opacity-80"><Linkedin size={20} /></a>
              <a href="#" className="text-emerald-600 dark:text-emerald-400 hover:opacity-80"><Youtube size={20} /></a>
              <a href="#" className="text-emerald-600 dark:text-emerald-400 hover:opacity-80"><Github size={20} /></a>
            </div>
            <a href="mailto:prashantchettiyar@ieee.org" className="flex items-center text-sm text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400">
              <Mail size={16} className="mr-2" />
              prashantchettiyar@ieee.org
            </a>
          </div>
        </div>
        
        <div className="border-t border-slate-200 dark:border-slate-700 mt-8 pt-8 text-center text-sm text-slate-600 dark:text-slate-400">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Eye size={16} className="text-emerald-600 dark:text-emerald-400" />
            <span className="font-orbitron font-bold text-emerald-600 dark:text-emerald-400">{visitors.toLocaleString()}</span>
            <span>visitors</span>
          </div>
          <p>&copy; {new Date().getFullYear()} HackiBits. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
