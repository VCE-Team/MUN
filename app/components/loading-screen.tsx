'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === '/') {
      setIsLoading(true);
      document.body.classList.add('overflow-hidden');

      const timer = setTimeout(() => {
        setIsLoading(false);
        document.body.classList.remove('overflow-hidden');
      }, 1500);

      return () => {
        clearTimeout(timer);
        document.body.classList.remove('overflow-hidden');
      };
    } else {
      setIsLoading(false);
      document.body.classList.remove('overflow-hidden');
    }
  }, [pathname]);

  if (!isLoading) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black"
      >
        <div className="relative">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="absolute left-0 top-1/2 h-[3px] bg-white"
          />
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-[8vh] sm:text-[10vh] font-bold text-white tracking-wider"
          >
            VCEMUN
          </motion.h1>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
