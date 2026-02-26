'use client';

import { motion } from 'framer-motion';

interface CallToActionProps {
  delay?: number;
}

export function CallToAction({ delay = 0 }: CallToActionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay }}
      className="max-w-4xl mx-auto"
    >
      <div className="bg-red-900/20 rounded-xl border border-red-500/30 backdrop-blur-sm p-6 text-center">
        <h2 className="text-2xl font-semibold text-red-400 mb-3">
          Registrations Closed
        </h2>
        <p className="text-gray-300 mb-2 text-sm">
          Thank you for your overwhelming response!
        </p>
        <p className="text-gray-400 text-sm">
          All committee positions have been filled. See you at the conference on
          February 27th & 28th, 2026!
        </p>
      </div>
    </motion.section>
  );
}
