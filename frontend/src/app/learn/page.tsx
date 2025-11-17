'use client';

import { motion } from 'framer-motion';
import { BookOpen, Video, Trophy, Lock, Zap, Target } from 'lucide-react';

export default function Learn() {
  const categories = [
    {
      level: 'Beginner',
      icon: BookOpen,
      color: 'text-green-400',
      courses: ['Introduction to Cybersecurity', 'RFID Basics', 'WiFi Fundamentals', 'IR Technology 101']
    },
    {
      level: 'Intermediate',
      icon: Zap,
      color: 'text-yellow-400',
      courses: ['Network Penetration Testing', 'Wireless Security', 'Hardware Hacking', 'Signal Analysis']
    },
    {
      level: 'Advanced',
      icon: Target,
      color: 'text-red-400',
      courses: ['Advanced Exploitation', 'Custom Firmware', 'RF Protocol Reverse Engineering', 'IoT Security']
    }
  ];

  const achievements = [
    { name: 'First Steps', desc: 'Complete your first tutorial', icon: '🎯' },
    { name: 'RFID Master', desc: 'Clone 10 RFID cards', icon: '🔐' },
    { name: 'WiFi Warrior', desc: 'Analyze 50 networks', icon: '📡' },
    { name: 'Community Helper', desc: 'Help 5 students', icon: '🤝' }
  ];

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-orbitron font-bold mb-6">
            HackiBits <span className="text-[#00D084] dark:text-[#00FF9C]">Learn</span>
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Master cybersecurity with hands-on tutorials, video courses, and real-world challenges.
          </p>
          <button className="bg-[#00D084] dark:bg-[#00FF9C] text-white dark:text-[#0A0F1F] px-8 py-4 rounded-full font-bold text-lg hover:opacity-90 transition-all shadow-lg">
            Sign Up to Start Learning
          </button>
        </motion.div>

        {/* Learning Paths */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {categories.map((category, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="bg-white dark:bg-[#1a1a2e] border-2 border-gray-200 dark:border-[#00FF9C]/30 rounded-lg p-8 hover-glow shadow-lg"
            >
              <category.icon className={`w-16 h-16 ${category.color} mb-4`} />
              <h3 className="text-2xl font-orbitron font-bold mb-4">{category.level}</h3>
              <ul className="space-y-3">
                {category.courses.map((course, i) => (
                  <li key={i} className="flex items-start text-gray-700 dark:text-gray-300">
                    <span className="text-[#00D084] dark:text-[#00FF9C] mr-2">▸</span>
                    {course}
                  </li>
                ))}
              </ul>
              <button className="w-full mt-6 border-2 border-[#00D084] dark:border-[#00FF9C] text-[#00D084] dark:text-[#00FF9C] py-2 rounded-full font-semibold hover:bg-[#00D084] hover:text-white dark:hover:bg-[#00FF9C] dark:hover:text-[#0A0F1F] transition-all">
                Start Learning
              </button>
            </motion.div>
          ))}
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {[
            { icon: Video, title: 'Video Tutorials', desc: '100+ hours of content' },
            { icon: BookOpen, title: 'Interactive Labs', desc: 'Hands-on practice environments' },
            { icon: Trophy, title: 'Challenges', desc: 'Test your skills with CTFs' }
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="text-center"
            >
              <feature.icon className="w-16 h-16 text-[#00D084] dark:text-[#00FF9C] mx-auto mb-4" />
              <h3 className="text-xl font-orbitron font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{feature.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-[#1a1a2e] border border-gray-200 dark:border-[#00FF9C]/30 rounded-lg p-8 shadow-lg"
        >
          <h2 className="text-3xl font-orbitron font-bold mb-8 text-center">
            Unlock <span className="text-[#00D084] dark:text-[#00FF9C]">Achievements</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, idx) => (
              <div
                key={idx}
                className="bg-gray-50 dark:bg-[#1a1a2e] border border-gray-200 dark:border-[#00FF9C]/20 rounded-lg p-6 text-center hover-glow"
              >
                <div className="text-5xl mb-3">{achievement.icon}</div>
                <h4 className="font-orbitron font-bold mb-2">{achievement.name}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{achievement.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Progress Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 bg-gradient-to-br from-slate-50 to-emerald-50 dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-slate-700 rounded-3xl p-12 text-center shadow-lg"
        >
          <Lock className="w-20 h-20 text-emerald-600 dark:text-emerald-400 mx-auto mb-6" />
          <h2 className="text-3xl font-orbitron font-bold mb-4 text-slate-900 dark:text-white">Your Learning Dashboard</h2>
          <p className="text-slate-600 dark:text-slate-300 mb-6 max-w-2xl mx-auto">
            Track your progress, earn badges, and compete with peers. Sign up to unlock your personalized learning experience.
          </p>
          <button className="bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-500 dark:to-teal-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-2xl transition-all shadow-lg">
            Create Free Account
          </button>
        </motion.div>
      </div>
    </div>
  );
}
