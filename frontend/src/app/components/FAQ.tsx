'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'What is HackiBits?',
      answer: 'HackiBits is an affordable, modular cybersecurity hardware platform designed for students and enthusiasts. We offer tools like RFID cloners, WiFi scanners, and more at 10x cheaper prices than imported alternatives.'
    },
    {
      question: 'Are these tools legal to use?',
      answer: 'Yes, our tools are legal for educational and authorized security testing purposes. Always ensure you have permission before testing any systems you don\'t own.'
    },
    {
      question: 'Do you ship internationally?',
      answer: 'Currently, we ship within India only. International shipping will be available soon. Join our community to get notified when we expand.'
    },
    {
      question: 'What support do you provide?',
      answer: 'We offer free tutorials, video courses, an active Discord community, and email support. Every module comes with detailed documentation and example projects.'
    },
    {
      question: 'Can I build custom modules?',
      answer: 'Absolutely! Our platform is modular and open-source. You can mix and match modules or create your own. We encourage community contributions.'
    },
    {
      question: 'What is the warranty period?',
      answer: 'All HackiBits modules come with a 1-year warranty covering manufacturing defects. We also offer repair services and replacement parts.'
    }
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-[#1a1a2e]/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-orbitron font-bold text-center mb-12"
        >
          Frequently Asked <span className="text-[#00D084] dark:text-[#00FF9C]">Questions</span>
        </motion.h2>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white dark:bg-[#1a1a2e] border border-gray-200 dark:border-[#00FF9C]/30 rounded-lg overflow-hidden shadow-lg"
            >
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 dark:hover:bg-[#1a1a2e]/80 transition-colors"
              >
                <span className="font-bold text-lg">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-[#00D084] dark:text-[#00FF9C] transition-transform ${
                    openIndex === idx ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openIndex === idx && (
                <div className="px-6 pb-4 text-gray-600 dark:text-gray-400">
                  {faq.answer}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
