"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { PortfolioDownload } from "@/app/components/portfolio-download";

export default function DISECPage() {
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
              src="/images/chairs/Eswar Chava.jpeg"
              alt="Eswar Chava - DISEC Chairperson"
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-2 text-center sm:text-left">
            <p className="text-sm uppercase tracking-wide text-gray-400">
              Chairperson, DISEC
            </p>
            <h4 className="text-xl sm:text-2xl font-semibold text-gray-100">
              Eswar Chava
            </h4>
            <p className="text-sm sm:text-base leading-relaxed text-gray-300">
              With a strong command over disarmament regimes and multilateral
              diplomacy, Eswar Chava ensures that DISEC sessions remain focused,
              solution-oriented, and deeply aligned with real-world UN
              procedures. Delegates can expect a challenging yet rewarding
              experience that sharpens their understanding of global security
              and arms control.
            </p>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
