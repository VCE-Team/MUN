"use client";

import Link from "next/link";
import { motion } from "framer-motion";

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
      <Link href="/register">
        <div className="bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm p-6 text-center hover:bg-white/10 transition-colors duration-300">
          <h2 className="text-2xl font-semibold text-white mb-3">
            Ready to Make Your Voice Heard?
          </h2>
          <p className="text-gray-300 mb-4 text-sm">
            Join the Model United Nations and engage in global discussions.
          </p>
          <p className="text-green-400 font-medium text-sm mb-4">
            5 Paid + 1 FREE Registrations Available!
          </p>
          <button className="bg-red-500 text-white font-semibold py-2 px-6 rounded-full hover:bg-red-600 transition-colors duration-300 text-sm">
            Register Now
          </button>
        </div>
      </Link>
    </motion.section>
  );
}
