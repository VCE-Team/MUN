"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function InternationalPressPage() {
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
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="max-w-4xl mx-auto px-4"
      >
        <h3 className="text-2xl sm:text-3xl font-bold text-center text-gray-100 mb-6">
          Head of International Press
        </h3>
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:gap-8">
          <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden border border-white/15 shadow-lg flex-shrink-0">
            <Image
              src="/images/chairs/Sai Preethi Polu.jpeg"
              alt="Sai Preethi Polu - Head of International Press"
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-2 text-center sm:text-left">
            <p className="text-sm uppercase tracking-wide text-gray-400">
              Head of International Press
            </p>
            <h4 className="text-xl sm:text-2xl font-semibold text-gray-100">
              Sai Preethi Polu
            </h4>
            <p className="text-sm sm:text-base leading-relaxed text-gray-300">
              Sai Preethi Polu is an avid munner who has attended over 100 MUNs
              in several circuits. Although she graduated B.Tech. in Information
              Technology, her passion for MUNs keeps her frequently exposed to
              worldly events that keep her up to date with current affairs of
              the world. Preethi takes a keen interest in taking part in MUNs
              and believes them to be an excellent platform for people to
              improve their analytical skills and leadership skills. While she
              is known for her experience in the International Press, she has an
              affinity towards humanitarian committees. She wishes the best for
              the participants and looks forward to the conference.
            </p>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
