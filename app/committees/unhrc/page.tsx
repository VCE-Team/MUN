"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { PortfolioDownload } from "@/app/components/portfolio-download";

export default function UNHRCPage() {
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
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="max-w-4xl mx-auto px-4"
      >
        <h3 className="text-2xl sm:text-3xl font-bold text-center text-gray-100 mb-6">
          Chairperson of the Committee
        </h3>
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:gap-8">
          <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden border border-white/15 shadow-lg flex-shrink-0">
            <Image
              src="/images/chairs/Vishal Choudary.jpeg"
              alt="Vishal Choudary - UNHRC Chairperson"
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-2 text-center sm:text-left">
            <p className="text-sm uppercase tracking-wide text-gray-400">
              Chairperson, UNHRC
            </p>
            <h4 className="text-xl sm:text-2xl font-semibold text-gray-100">
              Vishal Choudary
            </h4>
            <p className="text-sm sm:text-base leading-relaxed text-gray-300">
              With a keen focus on human rights jurisprudence and conflict
              resolution, Vishal Choudary brings clarity, empathy, and structure
              to discussions on minority protection and systemic discrimination.
              Delegates can expect a deeply engaging committee that balances
              legal nuance with humanitarian urgency.
            </p>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
