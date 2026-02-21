'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';
import { CommitteesMobile } from './committees-mobile';

export const committees = [
  {
    title: 'DISEC',
    description: 'Disarmament and International Security',
    href: '/committees/disec',
    url: '/images/committees/diseccopy.jpg',
  },
  {
    title: 'UNHRC',
    description: 'Human Rights Council',
    href: '/committees/unhrc',
    url: '/images/committees/unhrc.jpg',
  },
  {
    title: 'AIPPM',
    description: 'All India Political Parties Meet',
    href: '/committees/aippm',
    url: '/images/committees/aippm.jpeg',
  },
  {
    title: 'International Press (IP)',
    description: 'Press and Media',
    href: '/committees/internationalpress',
    url: '/images/committees/ip-bw.jpg',
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
        type: 'spring' as const,
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
        type: 'spring' as const,
        stiffness: 50,
        damping: 20,
        duration: 0.8,
        delay: 0.2,
      },
    },
  };

  return (
    <div id="committees" className="scroll-mt-20">
      <div className="hidden md:block">
        <section
          ref={containerRef}
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
                    src="/images/logos/optimized/Shield.webp"
                    alt="VCEMUN Shield"
                    width={220}
                    height={220}
                    className="absolute w-2/3 h-2/3 object-contain mb-[5vh]"
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    variants={shieldVariants}
                  />
                  <MotionImage
                    src="/images/logos/optimized/Wings.webp"
                    alt="VCEMUN Wings"
                    width={300}
                    height={300}
                    className="relative w-full h-full object-contain mt-[3.2vh]"
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
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
                      'absolute overflow-hidden transition-all duration-700 cursor-pointer z-30',
                      'w-64 h-48 sm:w-80 sm:h-56 md:w-96 md:h-60',
                      'before:absolute before:inset-0 before:bg-black/60 before:z-10 before:transition-opacity before:pointer-events-none',
                      isActive
                        ? 'scale-110 before:opacity-30'
                        : 'hover:scale-95 before:opacity-60'
                    )}
                    style={{
                      transform: `rotate(${angle}deg) translateX(calc(300px + 2vw)) rotate(-${angle}deg)`,
                      pointerEvents: 'auto',
                    }}
                    onMouseEnter={() => setActiveIndex(index)}
                    onMouseLeave={() => setActiveIndex(null)}
                  >
                    <Image
                      src={committee.url || '/placeholder.svg'}
                      alt={committee.title}
                      fill
                      className="object-cover transition-transform duration-700 pointer-events-none"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-10 flex items-center justify-center pointer-events-none z-20">
                      <div className="text-center">
                        <h3 className="text-xl font-semibold text-white">
                          {committee.title}
                        </h3>
                        <p className="text-sm text-gray-300">
                          {committee.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </div>
      <CommitteesMobile />
    </div>
  );
}
