"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { PortfolioDownload } from "@/app/components/portfolio-download";

export default function AIPPMPage() {
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
            Comprehensive Deliberation on Electoral Reforms and Institutional
            Accountability to Ensure Free, Fair, Transparent, and Credible
            Elections in India, with Special Reference to recent developments in
            India.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-100 text-center">
            Committee Description
          </h3>
          <p className="text-base sm:text-lg leading-relaxed text-gray-300 text-justify">
            The All India Political Parties Meet (AIPPM) simulates the dynamic
            and fast-paced world of Indian politics, bringing together delegates
            representing major political parties to debate, negotiate, and build
            consensus on issues of national importance. AIPPM provides a
            platform for delegates to engage in parliamentary-style debates,
            draft resolutions, and work collaboratively across party lines to
            address pressing national challenges. This committee offers a unique
            opportunity to understand the complexities of Indian democracy,
            party politics, and the legislative process while developing skills
            in negotiation, public speaking, and strategic thinking.
          </p>
        </div>

        <div className="flex justify-center pt-8">
          <PortfolioDownload
            filename="AIPPM_Portfolios.xlsx"
            fileUrl="/spreadsheet/AIPPM_Portfolios.xlsx"
          />
        </div>
      </motion.section>

      {/* Chair / Speaker */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="max-w-4xl mx-auto px-4"
      >
        <h3 className="text-2xl sm:text-3xl font-bold text-center text-gray-100 mb-6">
          Speaker of the Committee
        </h3>
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:gap-8">
          <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden border border-white/15 shadow-lg flex-shrink-0">
            <Image
              src="/images/chairs/Sangras Bhargav.jpeg"
              alt="Sangras Bhargav - AIPPM Speaker"
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-2 text-center sm:text-left">
            <p className="text-sm uppercase tracking-wide text-gray-400">
              Speaker, AIPPM
            </p>
            <h4 className="text-xl sm:text-2xl font-semibold text-gray-100">
              Sangras Bhargav
            </h4>
            <p className="text-sm sm:text-base leading-relaxed text-gray-300">
              Known for his sharp understanding of Indian parliamentary dynamics
              and consensus-building, Sangras Bhargav brings structure, nuance,
              and realism to the AIPPM. Under his guidance, delegates can expect
              rigorous debate, sharp political insight, and an authentic
              simulation of Indian party politics.
            </p>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
