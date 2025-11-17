'use client';

import { motion } from 'framer-motion';
import { MessageCircle, Calendar, Users, Award, Mail, Github } from 'lucide-react';
import { useState } from 'react';
import { api } from '@/lib/api';

export default function Community() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.subscribeNewsletter(email);
      setMessage(response.message);
      setEmail('');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Failed to subscribe. Please try again.');
    }
  };

  const events = [
    { title: 'WiFi Security Workshop', date: 'March 15, 2024', type: 'Workshop' },
    { title: 'CTF Competition', date: 'March 22, 2024', type: 'Hackathon' },
    { title: 'IEEE Student Chapter Meetup', date: 'April 5, 2024', type: 'Meetup' }
  ];

  const projects = [
    { name: 'Smart Lock Bypass', author: 'Rahul K.', likes: 234 },
    { name: 'WiFi Deauther v2', author: 'Priya S.', likes: 189 },
    { name: 'RFID Payment Clone', author: 'Arjun M.', likes: 156 }
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
            Join Our <span className="text-[#00D084] dark:text-[#00FF9C]">Community</span>
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            Connect with fellow hackers, share projects, and learn together. We&apos;re building India&apos;s largest cybersecurity student community.
          </p>
        </motion.div>

        {/* Community Platforms */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {[
            { icon: MessageCircle, name: 'Discord Server', members: '2,500+ members', link: 'Join Discord' },
            { icon: Github, name: 'GitHub', members: 'Open source projects', link: 'View Repos' },
            { icon: Users, name: 'Telegram Group', members: '1,800+ members', link: 'Join Telegram' }
          ].map((platform, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white dark:bg-[#1a1a2e] border-2 border-gray-200 dark:border-[#00FF9C]/30 rounded-lg p-8 text-center hover-glow shadow-lg"
            >
              <platform.icon className="w-16 h-16 text-[#00D084] dark:text-[#00FF9C] mx-auto mb-4" />
              <h3 className="text-2xl font-orbitron font-bold mb-2">{platform.name}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">{platform.members}</p>
              <button className="bg-[#00D084] dark:bg-[#00FF9C] text-white dark:text-[#0A0F1F] px-6 py-3 rounded-full font-bold hover:opacity-90 transition-all">
                {platform.link}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Upcoming Events */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-3xl font-orbitron font-bold mb-8 text-center">
            Upcoming <span className="text-[#00D084] dark:text-[#00FF9C]">Events</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {events.map((event, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-[#1a1a2e] border border-gray-200 dark:border-[#00FF9C]/30 rounded-lg p-6 hover-glow shadow-lg"
              >
                <Calendar className="w-10 h-10 text-[#00D084] dark:text-[#00FF9C] mb-4" />
                <span className="inline-block bg-blue-100 dark:bg-[#00D084]/20 text-[#00D084] dark:text-[#00FF9C] px-3 py-1 rounded-full text-sm mb-3">
                  {event.type}
                </span>
                <h3 className="text-xl font-orbitron font-bold mb-2">{event.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{event.date}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Student Projects Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-3xl font-orbitron font-bold mb-8 text-center">
            Featured <span className="text-[#00D084] dark:text-[#00FF9C]">Projects</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.map((project, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-[#1a1a2e] border border-gray-200 dark:border-[#00FF9C]/30 rounded-lg p-6 hover-glow shadow-lg"
              >
                <Award className="w-10 h-10 text-[#00D084] dark:text-[#00FF9C] mb-4" />
                <h3 className="text-xl font-orbitron font-bold mb-2">{project.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">by {project.author}</p>
                <div className="flex items-center text-[#00D084] dark:text-[#00FF9C]">
                  <span className="mr-2">❤️</span>
                  <span>{project.likes} likes</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-slate-50 to-emerald-50 dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-slate-700 rounded-3xl p-12 text-center shadow-lg"
        >
          <Mail className="w-20 h-20 text-emerald-600 dark:text-emerald-400 mx-auto mb-6" />
          <h2 className="text-3xl font-orbitron font-bold mb-4 text-slate-900 dark:text-white">HackiBits Insider Newsletter</h2>
          <p className="text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
            Get weekly updates on new modules, tutorials, events, and exclusive community content.
          </p>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-1 px-6 py-4 rounded-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 dark:focus:border-emerald-400"
            />
            <button type="submit" className="bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-500 dark:to-teal-500 text-white px-8 py-4 rounded-full font-bold hover:shadow-2xl transition-all shadow-lg">
              Subscribe
            </button>
          </form>
          {message && <p className="mt-4 text-emerald-600 dark:text-emerald-400 font-semibold">{message}</p>}
        </motion.div>

        {/* Partners Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <h2 className="text-3xl font-orbitron font-bold mb-8 text-center">
            Our <span className="text-[#00D084] dark:text-[#00FF9C]">Partners</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {['IEEE', 'IIT Bombay', 'NIT Trichy', 'BITS Pilani'].map((partner, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-[#1a1a2e] border border-gray-200 dark:border-[#00FF9C]/20 rounded-lg p-6 flex items-center justify-center text-center hover-glow shadow-lg"
              >
                <span className="text-xl font-bold text-gray-700 dark:text-gray-400">{partner}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
