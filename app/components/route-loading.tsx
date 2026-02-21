'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export function RouteLoading() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    isLoading && (
      <motion.div
        className="fixed top-0 left-0 right-0 z-50 h-1 bg-primary"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        exit={{ scaleX: 0 }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
      />
    )
  );
}
