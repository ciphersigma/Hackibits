'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Wifi, Lock, Unlock, Trophy, ArrowLeft, RotateCcw, ShoppingCart } from 'lucide-react';

type Network = {
  id: number;
  name: string;
  security: 'WEP' | 'WPA' | 'WPA2' | 'Open';
  signal: number;
  vulnerability: number;
  hacked: boolean;
};

export default function HackTheNetwork() {
  const [networks, setNetworks] = useState<Network[]>([]);
  const [scanning, setScanning] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState<Network | null>(null);
  const [hacking, setHacking] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);

  const generateNetworks = () => {
    const names = ['HomeWiFi', 'OfficeNet', 'CafePublic', 'SecureBank', 'GuestNetwork', 'RouterX'];
    const securities: Array<'WEP' | 'WPA' | 'WPA2' | 'Open'> = ['WEP', 'WPA', 'WPA2', 'Open'];
    
    return Array.from({ length: 4 + level }, (_, i) => ({
      id: i,
      name: `${names[Math.floor(Math.random() * names.length)]}_${Math.random().toString(36).substr(2, 4)}`,
      security: securities[Math.floor(Math.random() * securities.length)],
      signal: Math.floor(Math.random() * 40) + 60,
      vulnerability: Math.floor(Math.random() * 100),
      hacked: false
    }));
  };

  const scanNetworks = () => {
    setScanning(true);
    setNetworks([]);
    setTimeout(() => {
      setNetworks(generateNetworks());
      setScanning(false);
    }, 2000);
  };

  const hackNetwork = (network: Network) => {
    if (hacking || network.hacked) return;
    
    setSelectedNetwork(network);
    setHacking(true);
    setTerminalOpen(true);
    setTerminalLines([]);

    const commands = [
      `> Initializing attack on ${network.name}...`,
      `> Security: ${network.security} | Signal: ${network.signal}%`,
      `> Loading wordlist: rockyou.txt`,
      `> Starting bruteforce attack...`,
      `> Trying password: admin123`,
      `> Trying password: password`,
      `> Trying password: 12345678`,
      `> Trying password: qwerty123`,
      `> Handshake captured!`,
      `> Cracking WPA handshake...`,
      `> Testing 10000 passwords/sec`,
      `> Progress: 25%...`,
      `> Progress: 50%...`,
      `> Progress: 75%...`,
      `> Progress: 100%`,
      `> PASSWORD FOUND: ${Math.random().toString(36).substr(2, 8)}`,
      `> ACCESS GRANTED!`
    ];

    let index = 0;
    const interval = setInterval(() => {
      if (index < commands.length) {
        setTerminalLines(prev => [...prev, commands[index]]);
        index++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          const success = Math.random() * 100 < network.vulnerability;
          
          if (success) {
            const points = network.security === 'WPA2' ? 100 : network.security === 'WPA' ? 75 : network.security === 'WEP' ? 50 : 25;
            setScore(prev => prev + points);
            setNetworks(prev => prev.map(n => n.id === network.id ? { ...n, hacked: true } : n));
            
            if (networks.filter(n => !n.hacked).length === 1) {
              setTimeout(() => {
                setLevel(prev => prev + 1);
                scanNetworks();
              }, 1000);
            }
          }
          
          setTimeout(() => {
            setTerminalOpen(false);
            setHacking(false);
            setSelectedNetwork(null);
          }, 1500);
        }, 500);
      }
    }, 200);
  };

  useEffect(() => {
    scanNetworks();
  }, []);

  const getSecurityColor = (security: string) => {
    switch (security) {
      case 'Open': return 'text-green-500';
      case 'WEP': return 'text-yellow-500';
      case 'WPA': return 'text-orange-500';
      case 'WPA2': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gradient-to-br from-slate-50 via-emerald-50/30 to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <Link href="/games" className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400 hover:gap-3 transition-all">
            <ArrowLeft className="w-5 h-5" />
            Back to Games
          </Link>
          
          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="text-sm text-slate-500 dark:text-slate-400">Level</p>
              <p className="text-2xl font-orbitron font-bold text-slate-900 dark:text-white">{level}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-slate-500 dark:text-slate-400">Score</p>
              <p className="text-2xl font-orbitron font-bold text-emerald-600 dark:text-emerald-400">{score}</p>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-orbitron font-bold mb-4 text-slate-900 dark:text-white">
            Hack the <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400">Network</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-300 mb-6">
            Scan networks, identify vulnerabilities, and exploit them. Higher security = more points!
          </p>
        </motion.div>

        <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-3xl border border-slate-200 dark:border-slate-700 p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-orbitron font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Wifi className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              Available Networks
            </h2>
            <button
              onClick={scanNetworks}
              disabled={scanning}
              className="flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-400 dark:disabled:bg-slate-600 text-white rounded-xl font-semibold transition-all"
            >
              <RotateCcw className={`w-5 h-5 ${scanning ? 'animate-spin' : ''}`} />
              {scanning ? 'Scanning...' : 'Scan'}
            </button>
          </div>

          <div className="space-y-3">
            <AnimatePresence>
              {networks.map((network, idx) => (
                <motion.div
                  key={network.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: idx * 0.1 }}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    network.hacked
                      ? 'bg-emerald-100 dark:bg-emerald-900/20 border-emerald-500'
                      : selectedNetwork?.id === network.id
                      ? 'bg-yellow-100 dark:bg-yellow-900/20 border-yellow-500'
                      : 'bg-slate-100 dark:bg-slate-700/50 border-slate-300 dark:border-slate-600 hover:border-emerald-500 cursor-pointer'
                  }`}
                  onClick={() => !network.hacked && !hacking && hackNetwork(network)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {network.hacked ? (
                        <Unlock className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                      ) : (
                        <Lock className={`w-6 h-6 ${getSecurityColor(network.security)}`} />
                      )}
                      <div>
                        <p className="font-mono font-bold text-slate-900 dark:text-white">{network.name}</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          {network.security} • Signal: {network.signal}%
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      {!network.hacked && (
                        <div className="text-right">
                          <p className="text-xs text-slate-500 dark:text-slate-400">Vulnerability</p>
                          <div className="w-32 h-2 bg-slate-300 dark:bg-slate-600 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-red-500 to-emerald-500"
                              style={{ width: `${network.vulnerability}%` }}
                            />
                          </div>
                        </div>
                      )}
                      
                      {network.hacked ? (
                        <span className="px-4 py-2 bg-emerald-500 text-white rounded-lg font-semibold">
                          Hacked!
                        </span>
                      ) : selectedNetwork?.id === network.id ? (
                        <span className="px-4 py-2 bg-yellow-500 text-slate-900 rounded-lg font-semibold animate-pulse">
                          Hacking...
                        </span>
                      ) : (
                        <button className="px-4 py-2 bg-slate-300 dark:bg-slate-600 hover:bg-emerald-600 text-slate-900 dark:text-white rounded-lg font-semibold transition-all">
                          Hack
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {terminalOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          >
            <div className="bg-slate-900 border-2 border-emerald-500 rounded-xl w-full max-w-3xl mx-4 overflow-hidden shadow-2xl shadow-emerald-500/50">
              <div className="bg-slate-800 px-4 py-2 flex items-center gap-2 border-b border-emerald-500">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <span className="text-emerald-400 font-mono text-sm ml-2">root@hackibits:~#</span>
              </div>
              <div className="p-6 h-96 overflow-y-auto font-mono text-sm">
                {terminalLines.map((line, idx) => (
                  <div key={idx} className="text-emerald-400 mb-1 animate-pulse">
                    {line}
                  </div>
                ))}
                <span className="text-emerald-400 animate-pulse">_</span>
              </div>
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-gradient-to-r from-emerald-100/50 to-teal-100/50 dark:from-emerald-900/30 dark:to-teal-900/30 backdrop-blur-sm rounded-3xl border border-emerald-300 dark:border-emerald-700/50 p-8 text-center"
        >
          <Trophy className="w-12 h-12 text-emerald-600 dark:text-emerald-400 mx-auto mb-4" />
          <h3 className="text-2xl font-orbitron font-bold text-slate-900 dark:text-white mb-2">
            Want to hack real networks?
          </h3>
          <p className="text-slate-600 dark:text-slate-300 mb-6">
            Get our WiFi Scanner module and learn ethical hacking with real hardware
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-emerald-500/50 transition-all"
          >
            <ShoppingCart className="w-5 h-5" />
            View WiFi Scanner - ₹3,499
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
