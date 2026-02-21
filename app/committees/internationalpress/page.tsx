'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { CommitteeEBGrid } from '@/app/components/committee-eb-grid';

export default function InternationalPressPage() {
  const ipMembers = [
    {
      name: 'Sai Preethi Polu',
      position: 'Head of International Press',
      image: '/images/chairs/Sai Preethi Polu.jpeg',
    },
    {
      name: 'Sai Vardhan Barla',
      position: 'Director of Photography',
      image: '/images/chairs/sai vardhan.jpeg',
    },
  ];
  return (
    <div className="py-12 sm:py-16 md:py-24 space-y-16 sm:space-y-20 md:space-y-24 px-4">
      {/* Agenda (not agenda-based, so we highlight mandate) + Description */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="max-w-4xl mx-auto space-y-8 px-4"
      >
        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-100">
            Mandate of the International Press
          </h2>
          <p className="text-base sm:text-lg leading-relaxed text-gray-300 text-justify">
            The International Press (IP) serves as the eyes and ears of global
            diplomacy, ensuring transparency and accountability in international
            discussions. Comprising journalists and photographers, the IP plays
            a crucial role in reporting on key issues, such as allegations of
            genocide and human rights violations in conflict zones. Through
            investigative journalism, interviews, and visual documentation, it
            provides unbiased coverage, shapes public opinion, and holds global
            leaders accountable.
          </p>
          <p className="text-base sm:text-lg leading-relaxed text-gray-300 text-justify">
            By fostering informed debate and amplifying the voices of those
            affected, the International Press upholds the principles of free
            speech and responsible journalism in the realm of international
            affairs. Delegates in the IP will craft articles, conduct
            interviews, and capture moments that define the conference, bringing
            every committee to life through their lens and words.
          </p>
        </div>
      </motion.section>

      {/* Head of IP */}
      <CommitteeEBGrid title="Executive Board" members={ipMembers} />
    </div>
  );
}
