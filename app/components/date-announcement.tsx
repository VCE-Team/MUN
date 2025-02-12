"use client";

import React, { useEffect, useState, useRef } from "react";
import "../DateAnnouncement.css";

const DateAnnouncement: React.FC = () => {
  const [text, setText] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);
  const fullText = "MUN is on the 21st and 22nd of March!";

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

    let currentIndex = 0;

    const interval = setInterval(() => {
      if (currentIndex < fullText.length) {
        setText(fullText.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [isVisible]);

  return (
    <div
      ref={elementRef}
      className="text-xs p-[2.2rem] sm:p-[3.5rem] sm:text-sm md:p-[5rem] md:text-2xl text-center text-white font-bold typewriter"
    >
      {text}
    </div>
  );
};

export default DateAnnouncement;
