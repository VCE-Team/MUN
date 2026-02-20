"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import "../DateAnnouncement.css";

const DateAnnouncement: React.FC = () => {
  const [mainText, setMainText] = useState("");
  const [promotionText, setPromotionText] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [mainTextComplete, setMainTextComplete] = useState(false);
  const [allTextComplete, setAllTextComplete] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);
  const fullMainText = "VCEMUN will be held on February 27th & 28th, 2026.";
  const fullPromotionText =
    "Priority Round registrations close on 21 Feb 2026.";

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
      },
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let mainIndex = 0;
    let promotionIndex = 0;

    const mainInterval = setInterval(() => {
      if (mainIndex < fullMainText.length) {
        setMainText(fullMainText.slice(0, mainIndex + 1));
        mainIndex++;
      } else {
        setMainTextComplete(true);
        clearInterval(mainInterval);

        setTimeout(() => {
          const promotionInterval = setInterval(() => {
            if (promotionIndex < fullPromotionText.length) {
              setPromotionText(fullPromotionText.slice(0, promotionIndex + 1));
              promotionIndex++;
            } else {
              setAllTextComplete(true);
              clearInterval(promotionInterval);
            }
          }, 40);
        }, 300);
      }
    }, 70);

    return () => {
      clearInterval(mainInterval);
    };
  }, [isVisible]);

  return (
    <div
      ref={elementRef}
      className="flex flex-col items-center justify-center py-8 md:py-16 bg-gradient-to-b from-black to-gray-900"
    >
      <motion.div
        className="typewriter-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div
          className={`text-base sm:text-xl md:text-3xl text-center text-white font-bold ${
            !mainTextComplete ? "typewriter" : ""
          }`}
        >
          {mainText}
        </div>

        {mainTextComplete && (
          <div
            className={`text-xs sm:text-sm md:text-xl text-center text-amber-400 font-semibold mt-4 ${
              !allTextComplete ? "typewriter" : ""
            }`}
          >
            {promotionText}
          </div>
        )}
      </motion.div>
      <div className="mt-8 w-full flex justify-center px-4">
        <Link href="/register">
          <Button className="w-full max-w-xs sm:max-w-md px-6 py-2 sm:px-8 sm:py-3 text-sm sm:text-base font-semibold bg-red-600 hover:bg-red-700 rounded-full shadow-lg whitespace-normal text-center leading-snug">
            Priority Round Registration closes on 21 Feb 2026
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default DateAnnouncement;
