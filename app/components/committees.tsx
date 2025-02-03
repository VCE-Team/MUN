"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

const committees = [
  {
    title: "DISEC",
    description: "Disarmament and International Security",
    href: "/committees/disec",
    url: "/images/committees/disec.jpg",
  },
  {
    title: "International Press",
    description: "Press and Media",
    href: "/committees/internationalpress",
    url: "/images/committees/internationalpress.jpg",
  },
  {
    title: "UNHRC",
    description: "Human Rights Council",
    href: "/committees/unhrc",
    url: "/images/committees/unhrc.jpg",
  },
  {
    title: "ECOSOC",
    description: "Economic and Social Council",
    href: "/committees/ecosoc",
    url: "/images/committees/ecosoc.jpg",
  },
];

const MotionImage = motion(Image);

export function Committees() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.5 });

  const shieldVariants = {
    hidden: { y: -400, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 20,
        duration: 0.8,
      },
    },
  };

  const wingsVariants = {
    hidden: { y: 400, opacity: 0 },
    visible: {
      y: -14,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 20,
        duration: 0.8,
        delay: 0.2,
      },
    },
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100vh] bg-black flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="flex flex-col items-center w-full">
        <h2 className="text-4xl font-bold text-center text-white relative z-10">
          Committees
        </h2>

        <div className="relative w-[800px] h-[800px] flex items-center justify-center mt-0">
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <div className="relative w-[220px] h-[220px] flex items-center justify-center">
              <MotionImage
                src="/images/logos/Shield.png"
                alt="VCEMUN Shield"
                width={220}
                height={220}
                className="absolute w-2/3 h-2/3 object-contain"
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={shieldVariants}
              />
              <MotionImage
                src="/images/logos/Wings.png"
                alt="VCEMUN Wings"
                width={300}
                height={300}
                className="relative w-full h-full object-contain mt-[6vh]"
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={wingsVariants}
              />
            </div>
          </div>

          {committees.map((committee, index) => {
            const angle = 45 + index * 90;
            const isActive = activeIndex === index;

            return (
              <Link
                key={committee.title}
                href={committee.href}
                className={cn(
                  "absolute w-[300px] h-[200px] rounded-2xl overflow-hidden transform-gpu transition-all duration-700 cursor-pointer",
                  "before:absolute before:inset-0 before:bg-black/60 before:z-10 before:transition-opacity",
                  isActive
                    ? "scale-110 before:opacity-30"
                    : "hover:scale-105 before:opacity-60"
                )}
                style={{
                  transform: `rotate(${angle}deg) translateX(300px) rotate(-${angle}deg)`,
                }}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                <Image
                  src={committee.url || "/placeholder.svg"}
                  alt={committee.title}
                  width={300}
                  height={200}
                  className="object-cover w-full h-full transition-transform duration-700"
                />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
