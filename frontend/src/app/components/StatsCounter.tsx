'use client';

import { motion } from 'framer-motion';
import { Users, Package, GraduationCap, Award } from 'lucide-react';

export default function StatsCounter() {
  const stats = [
    { icon: Users, value: '2,500+', label: 'Community Members' },
    { icon: Package, value: '500+', label: 'Modules Sold' },
    { icon: GraduationCap, value: '1,200+', label: 'Students Trained' },
    { icon: Award, value: '50+', label: 'College Partners' }
  ];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="text-center"
            >
              <stat.icon className="w-12 h-12 text-[#00D084] dark:text-[#00FF9C] mx-auto mb-4" />
              <h3 className="text-4xl font-orbitron font-bold text-[#00D084] dark:text-[#00FF9C] mb-2">
                {stat.value}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
