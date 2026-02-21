'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { PortfolioDownload } from '@/app/components/portfolio-download';
import { CommitteeEBGrid } from '@/app/components/committee-eb-grid';

export default function DISECPage() {
  const disecMembers = [
    {
      name: 'Eswar Chava',
      position: 'Chairperson, DISEC',
      image: '/images/chairs/Eswar Chava.jpeg',
    },
    {
      name: 'Suraj Veerubhotla',
      position: 'Vice Chair, DISEC',
      image: '/images/chairs/suraj veerubhotla.jpeg',
    },
    {
      name: 'Kaniganti Tejasvi',
      position: 'Rapporteur, DISEC',
      image: '/images/chairs/kaniganti tejasvi.jpeg',
    },
  ];
  return (
    <div className="py-12 sm:py-16 md:py-24 space-y-16 sm:space-y-24 md:space-y-32 px-4">
      {/* Agenda + Description */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="max-w-4xl mx-auto space-y-8 px-4"
      >
        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-100">
            Agenda
          </h2>
          <p className="text-base sm:text-lg leading-relaxed text-gray-300 text-center">
            Preventing, combating and eradicating the illicit trade of Small
            Arms and Light Weapons (SALW) in all its aspects.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-100 text-center">
            Committee Description
          </h3>
          <p className="text-base sm:text-lg leading-relaxed text-gray-300 text-justify">
            The Disarmament and International Security Committee (DISEC) is the
            First Committee of the United Nations General Assembly. Established
            in 1945, it focuses on issues concerning global peace, disarmament,
            and international security. DISEC addresses topics such as nuclear
            disarmament, arms control, regional security, and the regulation of
            weapons of mass destruction. It plays a crucial role in formulating
            resolutions and agreements aimed at reducing global militarization
            and preventing armed conflict. While its resolutions are
            non-binding, DISEC influences the discourse on international
            security issues, encouraging collaboration among member states to
            create a safer world.
          </p>
        </div>

        <div className="flex justify-center pt-8">
          <PortfolioDownload
            filename="DISEC_Portfolio.xlsx"
            fileUrl="/spreadsheet/DISEC_Portfolio.xlsx"
          />
        </div>
      </motion.section>

      {/* Chairperson */}
      <CommitteeEBGrid title="Executive Board" members={disecMembers} />
    </div>
  );
}
