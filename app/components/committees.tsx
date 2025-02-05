"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

const committees = [
  {
    title: "International Press",
    description: "Press and Media",
    href: "/committees/internationalpress",
    url: "/images/committees/internationalpress.jpg",
    width: "350px",
    height: "200px",
  },
  {
    title: "UNHRC",
    description: "Human Rights Council",
    href: "/committees/unhrc",
    url: "/images/committees/unhrc.jpg",
    width: "350px",
    height: "200px",
  },
  {
    title: "DISEC",
    description: "Disarmament and International Security",
    href: "/committees/disec",
    url: "/images/committees/diseccopy.jpg",
    width: "350px",
    height: "200px",
  },
  {
    title: "ECOSOC",
    description: "Economic and Social Council",
    href: "/committees/ecosoc",
    url: "/images/committees/ecosoc.jpg",
    width: "350px",
    height: "200px",
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
      id="committees"
      className="relative pt-[6vh] pb-[6vh] bg-black flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="flex flex-col items-center w-full">
        <h2 className="text-4xl font-bold text-center text-white relative z-10">
          COMMITTEES
        </h2>

        <div className="relative w-3/4 h-[750px] flex items-center justify-center">
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <div className="relative w-[220px] h-[220px] flex items-center justify-center">
              <MotionImage
                src="/images/logos/Shield.png"
                alt="VCEMUN Shield"
                width={220}
                height={220}
                className="absolute w-2/3 h-2/3 object-contain mb-[5vh]"
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={shieldVariants}
              />
              <MotionImage
                src="/images/logos/Wings.png"
                alt="VCEMUN Wings"
                width={300}
                height={300}
                className="relative w-full h-full object-contain mt-[3.2vh]"
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={wingsVariants}
              />
            </div>
          </div>

          {committees.map((committee, index) => {
            const angle = index * 90 + 45;
            const isActive = activeIndex === index;

            return (
              <Link
                key={committee.title}
                href={committee.href}
                className={cn(
                  "absolute overflow-hidden transition-all duration-700 cursor-pointer z-30",
                  "before:absolute before:inset-0 before:bg-black/60 before:z-10 before:transition-opacity",
                  isActive
                    ? "scale-110 before:opacity-30"
                    : "hover:scale-95 before:opacity-60"
                )}
                style={{
                  transform: `rotate(${angle}deg) translateX(325px) rotate(-${angle}deg)`,
                  pointerEvents: "auto",
                  width: committee.width,
                  height: committee.height,
                }}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                <Image
                  src={committee.url || "/placeholder.svg"}
                  alt={committee.title}
                  fill
                  className="object-cover transition-transform duration-700"
                />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
