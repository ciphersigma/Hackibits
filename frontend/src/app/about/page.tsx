'use client';

import { motion } from 'framer-motion';
import { Target, Eye, Mail, Linkedin, Instagram, Youtube } from 'lucide-react';
import { useState } from 'react';
import { api } from '@/lib/api';
import Image from 'next/image';

export default function About() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [statusMessage, setStatusMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.sendContact(formData);
      setStatusMessage(response.message);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatusMessage(''), 3000);
    } catch (error) {
      setStatusMessage('Failed to send message. Please try again.');
    }
  };

  const team = [
    { name: 'Prashant Chettiyar', role: 'Founder & CEO', desc: 'IEEE Member | Security Researcher' },
    { name: 'Team Member 2', role: 'Hardware Engineer', desc: 'Electronics & IoT Specialist' },
    { name: 'Team Member 3', role: 'Software Developer', desc: 'Full Stack & Security' },
    { name: 'Team Member 4', role: 'Community Manager', desc: 'Student Outreach' }
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
            About <span className="text-[#00D084] dark:text-[#00FF9C]">HackiBits</span>
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            We&apos;re on a mission to democratize cybersecurity education in India by making professional-grade tools accessible to every student.
          </p>
        </motion.div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-[#1a1a2e] border-2 border-gray-200 dark:border-[#00FF9C]/30 rounded-lg p-8 hover-glow shadow-lg"
          >
            <Target className="w-16 h-16 text-[#00D084] dark:text-[#00FF9C] mb-4" />
            <h2 className="text-3xl font-orbitron font-bold mb-4">Our Mission</h2>
            <p className="text-gray-700 dark:text-gray-300 text-lg">
              Democratize cybersecurity education by creating affordable, modular, and ethical hacking hardware kits for students across India.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-[#1a1a2e] border-2 border-gray-200 dark:border-[#00FF9C]/30 rounded-lg p-8 hover-glow shadow-lg"
          >
            <Eye className="w-16 h-16 text-[#00D084] dark:text-[#00FF9C] mb-4" />
            <h2 className="text-3xl font-orbitron font-bold mb-4">Our Vision</h2>
            <p className="text-gray-700 dark:text-gray-300 text-lg">
              To be for cybersecurity what Arduino was for electronics — accessible, affordable, and revolutionary.
            </p>
          </motion.div>
        </div>

        {/* Our Story */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-3xl font-orbitron font-bold mb-8 text-center">
            Our <span className="text-[#00D084] dark:text-[#00FF9C]">Story</span>
          </h2>
          <div className="bg-white dark:bg-[#1a1a2e] border border-gray-200 dark:border-[#00FF9C]/30 rounded-lg p-8 max-w-4xl mx-auto shadow-lg">
            <p className="text-gray-700 dark:text-gray-300 text-lg mb-4">
              HackiBits was born from a simple observation: cybersecurity education in India is expensive and inaccessible. 
              Imported tools cost ₹50,000+, putting them out of reach for most students.
            </p>
            <p className="text-gray-700 dark:text-gray-300 text-lg mb-4">
              As an IEEE member and security enthusiast, our founder Prashant Chettiyar saw an opportunity to change this. 
              By designing and manufacturing in India, we&apos;ve reduced costs by 90% without compromising on quality.
            </p>
            <p className="text-gray-700 dark:text-gray-300 text-lg">
              Today, HackiBits is empowering thousands of students to learn ethical hacking, build innovative projects, 
              and secure our digital future — one module at a time.
            </p>
          </div>
        </motion.div>

        {/* Team */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-3xl font-orbitron font-bold mb-8 text-center">
            Meet Our <span className="text-[#00D084] dark:text-[#00FF9C]">Team</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-[#1a1a2e] border border-gray-200 dark:border-[#00FF9C]/30 rounded-lg p-6 text-center hover-glow shadow-lg"
              >
                <div className="w-24 h-24 bg-blue-100 dark:bg-[#00D084]/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-4xl">👤</span>
                </div>
                <h3 className="text-xl font-orbitron font-bold mb-2">{member.name}</h3>
                <p className="text-[#00D084] dark:text-[#00FF9C] mb-2">{member.role}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{member.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-3xl font-orbitron font-bold mb-8 text-center">
            Our <span className="text-[#00D084] dark:text-[#00FF9C]">Values</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: '🎓', title: 'Education First', desc: 'We believe knowledge should be accessible to all' },
              { icon: '', title: 'Made in India', desc: 'Supporting local innovation and manufacturing', hasFlag: true },
              { icon: '🤝', title: 'Community Driven', desc: 'Built by students, for students' }
            ].map((value, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-[#1a1a2e] border border-gray-200 dark:border-[#00FF9C]/30 rounded-lg p-8 text-center shadow-lg"
              >
                <div className="text-5xl mb-4 flex items-center justify-center gap-2">
                  {value.icon}
                  {value.hasFlag && <Image src="/india.png" alt="Indian Flag" width={32} height={32} className="rounded-sm" />}
                </div>
                <h3 className="text-xl font-orbitron font-bold mb-2">{value.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{value.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-slate-50 to-emerald-50 dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-slate-700 rounded-3xl p-12 shadow-lg"
        >
          <h2 className="text-3xl font-orbitron font-bold mb-8 text-center text-slate-900 dark:text-white">
            Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400">Touch</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div>
              <h3 className="text-xl font-orbitron font-bold mb-4 text-slate-900 dark:text-white">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Mail className="w-6 h-6 text-emerald-600 dark:text-emerald-400 mr-3" />
                  <a href="mailto:prashantchettiyar@ieee.org" className="text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400">
                    prashantchettiyar@ieee.org
                  </a>
                </div>
                <div className="flex items-center space-x-4 mt-6">
                  <a href="#" className="text-emerald-600 dark:text-emerald-400 hover:opacity-80"><Instagram size={28} /></a>
                  <a href="#" className="text-emerald-600 dark:text-emerald-400 hover:opacity-80"><Linkedin size={28} /></a>
                  <a href="#" className="text-emerald-600 dark:text-emerald-400 hover:opacity-80"><Youtube size={28} /></a>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-orbitron font-bold mb-4 text-slate-900 dark:text-white">Send us a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Your Name"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 dark:focus:border-emerald-400"
                />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="Your Email"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 dark:focus:border-emerald-400"
                />
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  placeholder="Your Message"
                  rows={4}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 dark:focus:border-emerald-400"
                ></textarea>
                <button type="submit" className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-500 dark:to-teal-500 text-white py-3 rounded-full font-bold hover:shadow-2xl transition-all shadow-lg">
                  Send Message
                </button>
                {statusMessage && <p className="text-emerald-600 dark:text-emerald-400 font-semibold text-center">{statusMessage}</p>}
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
