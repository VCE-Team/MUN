 "use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const targetDate = new Date("2026-02-27T09:00:00+05:30").getTime();

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(): TimeLeft {
  const now = Date.now();
  const diff = Math.max(targetDate - now, 0);

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { days, hours, minutes, seconds };
}

const INITIAL_PLACEHOLDER: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

export function CountdownTimer() {
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(INITIAL_PLACEHOLDER);

  useEffect(() => {
    setMounted(true);
    setTimeLeft(calculateTimeLeft());
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [mounted]);

  const items: { label: string; value: number }[] = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <section className="w-full py-10 md:py-16 flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-black">
      <motion.h2
        className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 text-center text-white"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Countdown to VCEMUN 2026
      </motion.h2>
      <motion.p
        className="text-sm md:text-base text-center text-gray-300 mb-8 max-w-xl"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        February 27th &amp; 28th, 2026 · Vardhaman College of Engineering
      </motion.p>

      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.15 }}
      >
        {items.map((item, idx) => (
          <motion.div
            key={item.label}
            className="flex flex-col items-center justify-center rounded-2xl bg-black/60 border border-white/10 px-6 py-4 shadow-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 + idx * 0.05 }}
          >
            <motion.span
              key={item.value}
              className="text-2xl md:text-3xl font-semibold text-red-500 tabular-nums"
              initial={{ scale: 0.9, opacity: 0.8 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 120, damping: 12 }}
            >
              {item.value.toString().padStart(2, "0")}
            </motion.span>
            <span className="mt-1 text-xs md:text-sm uppercase tracking-wide text-gray-400">
              {item.label}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
