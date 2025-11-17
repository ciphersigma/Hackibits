import Link from 'next/link';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen pt-16 flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <h1 className="text-9xl font-orbitron font-bold text-[#00D084] dark:text-[#00FF9C] mb-4">404</h1>
        <h2 className="text-4xl font-orbitron font-bold mb-4">Page Not Found</h2>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
        </p>
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 bg-[#00D084] dark:bg-[#00FF9C] text-white dark:text-[#0A0F1F] px-8 py-4 rounded-full font-bold text-lg hover:opacity-90 transition-all shadow-lg"
        >
          <Home size={20} />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
