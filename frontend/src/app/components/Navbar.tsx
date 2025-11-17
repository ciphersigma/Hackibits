'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/95 dark:bg-[#0A0F1F]/95 backdrop-blur-md border-b border-gray-200 dark:border-[#00FF9C]/20 shadow-sm dark:shadow-[#00FF9C]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-orbitron font-bold text-[#00D084] dark:text-[#00FF9C] glow-text">HackiBits</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <Link href="/" className={pathname === '/' ? 'text-[#00D084] dark:text-[#00FF9C] font-semibold transition-colors' : 'text-gray-700 dark:text-gray-200 hover:text-[#00D084] dark:hover:text-[#00FF9C] transition-colors'}>Home</Link>
            <Link href="/products" className={pathname === '/products' ? 'text-[#00D084] dark:text-[#00FF9C] font-semibold transition-colors' : 'text-gray-700 dark:text-gray-200 hover:text-[#00D084] dark:hover:text-[#00FF9C] transition-colors'}>Products</Link>
            <Link href="/games" className={pathname?.startsWith('/games') ? 'text-[#00D084] dark:text-[#00FF9C] font-semibold transition-colors' : 'text-gray-700 dark:text-gray-200 hover:text-[#00D084] dark:hover:text-[#00FF9C] transition-colors'}>Games</Link>
            <Link href="/community" className={pathname === '/community' ? 'text-[#00D084] dark:text-[#00FF9C] font-semibold transition-colors' : 'text-gray-700 dark:text-gray-200 hover:text-[#00D084] dark:hover:text-[#00FF9C] transition-colors'}>Community</Link>
            <Link href="/about" className={pathname === '/about' ? 'text-[#00D084] dark:text-[#00FF9C] font-semibold transition-colors' : 'text-gray-700 dark:text-gray-200 hover:text-[#00D084] dark:hover:text-[#00FF9C] transition-colors'}>About</Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              {theme === 'light' ? <Moon className="w-5 h-5 text-gray-700" /> : <Sun className="w-5 h-5 text-yellow-400" />}
            </button>
            <Link href="/join-beta" className="bg-[#00D084] dark:bg-[#00FF9C] text-white dark:text-[#0A0F1F] px-6 py-2 rounded-full font-semibold hover:opacity-90 transition-all shadow-lg">
              Join Beta
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <button onClick={toggleTheme} className="p-2">
              {theme === 'light' ? <Moon className="w-5 h-5 text-gray-700" /> : <Sun className="w-5 h-5 text-yellow-400" />}
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className="text-[#00D084] dark:text-[#00FF9C]">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-[#1a1a2e] border-t border-gray-200 dark:border-[#00FF9C]/20">
          <div className="px-4 pt-2 pb-4 space-y-3">
            <Link href="/" className={pathname === '/' ? 'block text-[#00D084] dark:text-[#00FF9C] font-semibold py-2' : 'block text-gray-700 dark:text-gray-200 hover:text-[#00D084] dark:hover:text-[#00FF9C] py-2'} onClick={() => setIsOpen(false)}>Home</Link>
            <Link href="/products" className={pathname === '/products' ? 'block text-[#00D084] dark:text-[#00FF9C] font-semibold py-2' : 'block text-gray-700 dark:text-gray-200 hover:text-[#00D084] dark:hover:text-[#00FF9C] py-2'} onClick={() => setIsOpen(false)}>Products</Link>
            <Link href="/games" className={pathname?.startsWith('/games') ? 'block text-[#00D084] dark:text-[#00FF9C] font-semibold py-2' : 'block text-gray-700 dark:text-gray-200 hover:text-[#00D084] dark:hover:text-[#00FF9C] py-2'} onClick={() => setIsOpen(false)}>Games</Link>
            <Link href="/community" className={pathname === '/community' ? 'block text-[#00D084] dark:text-[#00FF9C] font-semibold py-2' : 'block text-gray-700 dark:text-gray-200 hover:text-[#00D084] dark:hover:text-[#00FF9C] py-2'} onClick={() => setIsOpen(false)}>Community</Link>
            <Link href="/about" className={pathname === '/about' ? 'block text-[#00D084] dark:text-[#00FF9C] font-semibold py-2' : 'block text-gray-700 dark:text-gray-200 hover:text-[#00D084] dark:hover:text-[#00FF9C] py-2'} onClick={() => setIsOpen(false)}>About</Link>
            <Link href="/join-beta" className="block w-full bg-[#00D084] dark:bg-[#00FF9C] text-white dark:text-[#0A0F1F] px-6 py-2 rounded-full font-semibold mt-2 shadow-lg text-center">
              Join Beta
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
