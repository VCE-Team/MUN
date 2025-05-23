"use client";

import React, { useEffect, useState, useRef } from "react";
import "../DateAnnouncement.css";
import { motion } from "framer-motion";

const DateAnnouncement: React.FC = () => {
  const [mainText, setMainText] = useState("");
  const [promotionText, setPromotionText] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [mainTextComplete, setMainTextComplete] = useState(false);
  const [allTextComplete, setAllTextComplete] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);
  const fullMainText = "MUN is on the 21st and 22nd of March!";
  const fullPromotionText = "Registrations are CLOSED.";

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
      }
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
          className={`text-lg sm:text-xl md:text-3xl text-center text-white font-bold ${
            !mainTextComplete ? "typewriter" : ""
          }`}
        >
          {mainText}
        </div>

        {mainTextComplete && (
          <div
            className={`text-sm sm:text-base md:text-xl text-center text-red-500 font-semibold mt-4 ${
              !allTextComplete ? "typewriter" : ""
            }`}
          >
            {promotionText}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default DateAnnouncement;
