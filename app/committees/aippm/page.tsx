"use client";

import { motion } from "framer-motion";
import Image from "next/image";
// import { CallToAction } from "@/app/components/call-to-action";

export default function AIPPMPage() {
  return (
    <div className="py-24 space-y-32">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="max-w-4xl mx-auto text-center space-y-8"
      >
        <p className="text-xl leading-relaxed text-gray-300">
          The All India Political Parties Meet (AIPPM) simulates the dynamic
          and fast-paced world of Indian politics, bringing together delegates
          representing major political parties to debate, negotiate, and build
          consensus on issues of national importance. AIPPM provides a platform
          for delegates to engage in parliamentary-style debates, draft
          resolutions, and work collaboratively across party lines to address
          pressing national challenges. This committee offers a unique
          opportunity to understand the complexities of Indian democracy, party
          politics, and the legislative process while developing skills in
          negotiation, public speaking, and strategic thinking.
        </p>
      </motion.section>
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="space-y-12"
      >
        {/* <h2 className="text-5xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-gray-200 to-gray-400">
          The Executive Board
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {[
            {
              name: "Executive Board Member 1",
              role: "Chair",
              image: "/images/team/placeholder.jpg",
            },
            {
              name: "Executive Board Member 2",
              role: "Vice Chair",
              image: "/images/team/placeholder.jpg",
            },
            {
              name: "Executive Board Member 3",
              role: "Rapporteur",
              image: "/images/team/placeholder.jpg",
            },
          ].map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.2 }}
              className="text-center space-y-4 group"
            >
              <div className="relative w-72 h-72 mx-auto overflow-hidden rounded-lg">
                <Image
                  src={member.image || "/images/team/placeholder.svg"}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-2xl font-bold text-gray-200">
                {member.name}
              </h3>
              <p className="text-gray-400 text-lg">{member.role}</p>
            </motion.div>
          ))}
        </div> */}
      </motion.section>
      {/* <CallToAction delay={0.8} /> */}
    </div>
  );
}

