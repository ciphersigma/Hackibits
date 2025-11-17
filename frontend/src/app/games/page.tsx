'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Wifi, Radio, Zap, ArrowLeft } from 'lucide-react';

export default function GamesPage() {
  const games = [
    {
      id: 'hack-the-network',
      title: 'Hack the Network',
      description: 'Scan WiFi networks and exploit vulnerabilities',
      icon: Wifi,
      product: 'WiFi Scanner',
      difficulty: 'Medium',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'clone-master',
      title: 'Clone Master',
      description: 'Master RFID cloning techniques',
      icon: Radio,
      product: 'RFID Cloner',
      difficulty: 'Easy',
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'signal-hunter',
      title: 'Signal Hunter',
      description: 'Coming Soon - Capture and replay IR signals',
      icon: Zap,
      product: 'IR Blaster',
      difficulty: 'Hard',
      color: 'from-orange-500 to-red-500',
      disabled: true
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gradient-to-br from-slate-50 via-emerald-50/30 to-slate-100 dark:from-slate-950 dark:via-emerald-950/20 dark:to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/" className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400 hover:gap-3 transition-all mb-8">
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-orbitron font-bold mb-4 text-slate-900 dark:text-white">
            Virtual <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400">Lab</span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300">
            Try our products virtually and learn cybersecurity through interactive games
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {games.map((game, idx) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Link href={game.disabled ? '#' : `/games/${game.id}`} className={game.disabled ? 'pointer-events-none' : ''}>
                <div className={`group relative p-8 bg-white dark:bg-slate-800 rounded-3xl border-2 border-slate-200 dark:border-slate-700 hover:border-emerald-400 dark:hover:border-emerald-500 transition-all hover:-translate-y-2 shadow-lg hover:shadow-2xl h-full ${game.disabled ? 'opacity-60' : ''}`}>
                  <div className={`absolute top-4 right-4 w-16 h-16 bg-gradient-to-br ${game.color} rounded-2xl opacity-20 group-hover:opacity-30 transition-opacity`}></div>
                  
                  <game.icon className="w-16 h-16 mb-6 text-emerald-600 dark:text-emerald-400" />
                  
                  <h3 className="text-2xl font-orbitron font-bold mb-3 text-slate-900 dark:text-white">{game.title}</h3>
                  
                  <p className="text-slate-600 dark:text-slate-400 mb-4">{game.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">{game.product}</span>
                    <span className="text-xs px-3 py-1 bg-slate-100 dark:bg-slate-700 rounded-full text-slate-600 dark:text-slate-300">{game.difficulty}</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
