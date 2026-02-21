'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { PortfolioDownload } from '@/app/components/portfolio-download';
import { CommitteeEBGrid } from '@/app/components/committee-eb-grid';

export default function UNHRCPage() {
  const unhrcMembers = [
    {
      name: 'Vishal Chowdary',
      position: 'Chairperson, UNHRC',
      image: '/images/chairs/Vishal Choudary.jpeg',
    },
    {
      name: 'Pranathi Vemuri',
      position: 'Vice Chair, UNHRC',
      image: '/images/chairs/pranathi vemuri.jpeg',
    },
  ];
  return (
    <div className="py-12 sm:py-16 md:py-24 space-y-16 sm:space-y-20 md:space-y-24 px-4">
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
            Addressing systemic discrimination and persecution of ethnic and
            religious minorities in Southern Asia.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-100 text-center">
            Committee Description
          </h3>
          <p className="text-base sm:text-lg leading-relaxed text-gray-300 text-justify">
            The United Nations Human Rights Council (UNHRC) is a key
            intergovernmental body within the UN responsible for promoting and
            protecting human rights worldwide. It plays a crucial role in
            addressing allegations of genocide and human rights violations in
            conflict zones, ensuring accountability, and advocating for justice.
            Through investigations, resolutions, and diplomatic efforts, UNHRC
            works to prevent atrocities, support affected communities, and
            uphold international human rights law. By collaborating with states,
            NGOs, and humanitarian organizations, the committee strives to
            implement measures that safeguard human dignity and prevent future
            violations.
          </p>
        </div>

        <div className="flex justify-center pt-8">
          <PortfolioDownload
            filename="UNHRC_Portfolio.xlsx"
            fileUrl="/spreadsheet/UNHRC_Portfolio.xlsx"
          />
        </div>
      </motion.section>

      {/* Chairperson */}
      <CommitteeEBGrid title="Executive Board" members={unhrcMembers} />
    </div>
  );
}
