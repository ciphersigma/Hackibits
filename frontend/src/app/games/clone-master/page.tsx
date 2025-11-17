'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Radio, ArrowLeft, Trophy, ShoppingCart, Lock, Unlock } from 'lucide-react';

type GameState = 'idle' | 'reading' | 'cloned' | 'writing' | 'complete';

export default function CloneMaster() {
  const [gameState, setGameState] = useState<GameState>('idle');
  const [cardInReader, setCardInReader] = useState<'none' | 'working' | 'blank'>('none');
  const [copiedData, setCopiedData] = useState<string | null>(null);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const [lockOpen, setLockOpen] = useState(false);
  const [score, setScore] = useState(0);

  const workingCardData = 'A3:7F:2E:9B:C1:45:8D:F2';

  const handleClone = () => {
    if (cardInReader !== 'working' || gameState !== 'idle') return;
    
    setGameState('reading');
    setTerminalOpen(true);
    setTerminalLines([]);

    const commands = [
      `> Initializing RFID reader...`,
      `> Card detected in reader`,
      `> Reading card data...`,
      `> UID: ${workingCardData}`,
      `> Block 0: 4A:B2:C3:D4`,
      `> Block 1: E5:F6:07:18`,
      `> Block 2: 29:3A:4B:5C`,
      `> Data extraction complete!`,
      `> Copying to memory buffer...`,
      `> CARD DATA CLONED SUCCESSFULLY!`,
      `> Remove card and insert blank card`
    ];

    let index = 0;
    const interval = setInterval(() => {
      if (index < commands.length) {
        setTerminalLines(prev => [...prev, commands[index]]);
        index++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setCopiedData(workingCardData);
          setGameState('cloned');
          setCardInReader('none');
          setTerminalOpen(false);
        }, 1000);
      }
    }, 300);
  };

  const handleWrite = () => {
    if (cardInReader !== 'blank' || gameState !== 'cloned' || !copiedData) return;
    
    setGameState('writing');
    setTerminalOpen(true);
    setTerminalLines([]);

    const commands = [
      `> Blank card detected`,
      `> Loading cloned data from buffer...`,
      `> Writing UID: ${copiedData}`,
      `> Writing Block 0...`,
      `> Writing Block 1...`,
      `> Writing Block 2...`,
      `> Verifying data integrity...`,
      `> Verification: PASSED`,
      `> CARD WRITE SUCCESSFUL!`,
      `> Cloned card ready to use`
    ];

    let index = 0;
    const interval = setInterval(() => {
      if (index < commands.length) {
        setTerminalLines(prev => [...prev, commands[index]]);
        index++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setGameState('complete');
          setTerminalOpen(false);
        }, 1000);
      }
    }, 300);
  };

  const handleUnlockWithCloned = () => {
    if (gameState !== 'complete') return;
    setLockOpen(true);
    setScore(100);
  };

  const handleUnlockWithWorking = () => {
    setLockOpen(true);
    setScore(5);
  };

  const resetGame = () => {
    setGameState('idle');
    setCardInReader('none');
    setCopiedData(null);
    setLockOpen(false);
    setScore(0);
  };

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gradient-to-br from-slate-50 via-purple-50/30 to-slate-100 dark:from-slate-900 dark:via-purple-900/20 dark:to-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <Link href="/games" className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:gap-3 transition-all">
            <ArrowLeft className="w-5 h-5" />
            Back to Games
          </Link>
          
          <div className="text-right">
            <p className="text-sm text-slate-500 dark:text-slate-400">Score</p>
            <p className="text-2xl font-orbitron font-bold text-purple-600 dark:text-purple-400">{score}</p>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-orbitron font-bold mb-4 text-slate-900 dark:text-white">
            Clone <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400">Master</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-300 mb-6">
            Drag working card to reader → Clone → Drag blank card → Write → Unlock door!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Working Card */}
          <div className="bg-gradient-to-br from-emerald-500 to-teal-500 p-6 rounded-2xl shadow-xl">
            <p className="text-white font-bold mb-2">Working Card</p>
            <p className="text-white/80 text-sm font-mono mb-4">{workingCardData}</p>
            <div className="flex gap-2">
              <button onClick={() => setCardInReader('working')} className="flex-1 px-3 py-2 bg-white/20 hover:bg-white/30 text-white text-sm rounded-lg">To Reader</button>
              <button onClick={handleUnlockWithWorking} disabled={lockOpen} className="flex-1 px-3 py-2 bg-white/20 hover:bg-white/30 disabled:opacity-50 text-white text-sm rounded-lg">To Lock</button>
            </div>
          </div>

          {/* Blank Card */}
          <div className={`bg-gradient-to-br from-slate-300 to-slate-400 dark:from-slate-600 dark:to-slate-700 p-6 rounded-2xl shadow-xl ${gameState === 'complete' ? 'ring-4 ring-purple-500' : ''}`}>
            <p className="text-slate-700 dark:text-slate-200 font-bold mb-2">Blank Card</p>
            <p className="text-slate-600 dark:text-slate-400 text-sm font-mono mb-4">{gameState === 'complete' ? workingCardData : '00:00:00:00:00:00:00:00'}</p>
            <div className="flex gap-2">
              <button onClick={() => setCardInReader('blank')} className="flex-1 px-3 py-2 bg-slate-700 dark:bg-slate-500 hover:bg-slate-600 dark:hover:bg-slate-400 text-white text-sm rounded-lg">To Reader</button>
              <button onClick={handleUnlockWithCloned} disabled={lockOpen || gameState !== 'complete'} className="flex-1 px-3 py-2 bg-slate-700 dark:bg-slate-500 hover:bg-slate-600 dark:hover:bg-slate-400 disabled:opacity-50 text-white text-sm rounded-lg">To Lock</button>
            </div>
          </div>

          {/* Lock */}
          <div id="lock" className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl border-2 border-slate-300 dark:border-slate-600 p-6 flex flex-col items-center justify-center">
            {lockOpen ? (
              <>
                <Unlock className="w-16 h-16 text-emerald-500 mb-4" />
                <p className="text-emerald-600 dark:text-emerald-400 font-bold text-xl">UNLOCKED!</p>
                <button onClick={resetGame} className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg text-sm">Play Again</button>
              </>
            ) : (
              <>
                <Lock className="w-16 h-16 text-slate-400 mb-4" />
                <p className="text-slate-600 dark:text-slate-400 font-bold">Locked Door</p>
                <p className="text-slate-500 dark:text-slate-500 text-xs mt-2">Use cloned card</p>
              </>
            )}
          </div>
        </div>

        {/* RFID Reader */}
        <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-3xl border border-slate-200 dark:border-slate-700 p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-orbitron font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Radio className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              RFID Cloner Machine
            </h2>
            {copiedData && <span className="text-sm text-purple-600 dark:text-purple-400 font-mono">Buffer: {copiedData}</span>}
          </div>

          <div id="reader" className="bg-slate-200 dark:bg-slate-700 rounded-2xl p-12 border-4 border-dashed border-slate-400 dark:border-slate-500 min-h-[200px] flex flex-col items-center justify-center">
            {cardInReader === 'none' ? (
              <p className="text-slate-500 dark:text-slate-400 text-center">Drop a card here to start</p>
            ) : cardInReader === 'working' ? (
              <>
                <div className="bg-gradient-to-br from-emerald-500 to-teal-500 p-4 rounded-xl mb-4 w-48">
                  <p className="text-white font-bold text-sm">Working Card</p>
                  <p className="text-white/80 text-xs font-mono">{workingCardData}</p>
                </div>
                <button onClick={handleClone} className="px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-semibold">Clone Card</button>
                <button onClick={() => setCardInReader('none')} className="mt-2 text-sm text-slate-500 dark:text-slate-400">Remove</button>
              </>
            ) : (
              <>
                <div className="bg-gradient-to-br from-slate-300 to-slate-400 dark:from-slate-600 dark:to-slate-700 p-4 rounded-xl mb-4 w-48">
                  <p className="text-slate-700 dark:text-slate-200 font-bold text-sm">Blank Card</p>
                  <p className="text-slate-600 dark:text-slate-400 text-xs font-mono">{gameState === 'complete' ? workingCardData : '00:00:00:00:00:00:00:00'}</p>
                </div>
                {gameState === 'cloned' && <button onClick={handleWrite} className="px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-semibold">Write Data</button>}
                <button onClick={() => setCardInReader('none')} className="mt-2 text-sm text-slate-500 dark:text-slate-400">Remove</button>
              </>
            )}
          </div>
        </div>

        {terminalOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          >
            <div className="bg-slate-900 border-2 border-purple-500 rounded-xl w-full max-w-3xl mx-4 overflow-hidden shadow-2xl shadow-purple-500/50">
              <div className="bg-slate-800 px-4 py-2 flex items-center gap-2 border-b border-purple-500">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <span className="text-purple-400 font-mono text-sm ml-2">rfid-cloner@hackibits:~#</span>
              </div>
              <div className="p-6 h-96 overflow-y-auto font-mono text-sm">
                {terminalLines.map((line, idx) => (
                  <div key={idx} className="text-purple-400 mb-1 animate-pulse">
                    {line}
                  </div>
                ))}
                <span className="text-purple-400 animate-pulse">_</span>
              </div>
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-gradient-to-r from-purple-100/50 to-pink-100/50 dark:from-purple-900/30 dark:to-pink-900/30 backdrop-blur-sm rounded-3xl border border-purple-300 dark:border-purple-700/50 p-8 text-center"
        >
          <Trophy className="w-12 h-12 text-purple-600 dark:text-purple-400 mx-auto mb-4" />
          <h3 className="text-2xl font-orbitron font-bold text-slate-900 dark:text-white mb-2">
            Want to clone real cards?
          </h3>
          <p className="text-slate-600 dark:text-slate-300 mb-6">
            Get our RFID/NFC Cloner module and learn card cloning with real hardware
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-purple-500/50 transition-all"
          >
            <ShoppingCart className="w-5 h-5" />
            View RFID Cloner - ₹2,999
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
