"use client";

import React, { useState, useEffect, useRef } from "react";
import { useInView } from "framer-motion";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";

export function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isEventStarted, setIsEventStarted] = useState(false);
  const [confettiTriggered, setConfettiTriggered] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.3 });

  const targetDate = new Date("2025-03-21T00:00:00+05:30").getTime();
  // const targetDate = new Date(Date.now() - 5000).getTime();
  // use the above line to test the confetti

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setIsEventStarted(true);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  useEffect(() => {
    if (isInView && isEventStarted && !confettiTriggered) {
      triggerConfetti();
      setConfettiTriggered(true);
    }
  }, [isInView, isEventStarted, confettiTriggered]);

  const triggerConfetti = () => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.9), y: randomInRange(0, 0.2) },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.9), y: randomInRange(0, 0.2) },
      });
    }, 250);
  };

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center mx-2 md:mx-4">
      <div className="text-2xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
        {value.toString().padStart(2, "0")}
      </div>
      <div className="text-xs md:text-sm text-gray-400 mt-1">{label}</div>
    </div>
  );

  return (
    <div
      ref={containerRef}
      className="w-full py-10 flex flex-col items-center justify-center"
    >
      <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-6 text-center">
        {isEventStarted
          ? "The Event Is Happening Now!"
          : "Countdown to MUN 2025"}
      </h2>

      <div className="flex justify-center items-center">
        {isEventStarted ? (
          <motion.div
            className="text-2xl md:text-4xl font-bold text-green-500"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
            }}
          >
            00:00:00
          </motion.div>
        ) : (
          <>
            <TimeUnit value={timeLeft.days} label="Days" />
            <div className="text-xl md:text-3xl font-bold">:</div>
            <TimeUnit value={timeLeft.hours} label="Hours" />
            <div className="text-xl md:text-3xl font-bold">:</div>
            <TimeUnit value={timeLeft.minutes} label="Minutes" />
            <div className="text-xl md:text-3xl font-bold">:</div>
            <TimeUnit value={timeLeft.seconds} label="Seconds" />
          </>
        )}
      </div>
    </div>
  );
}
