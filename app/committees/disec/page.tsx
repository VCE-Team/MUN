"use client";

import { motion } from "framer-motion";
import Image from "next/image";
// import { CallToAction } from "@/app/components/call-to-action";

export default function DISECPage() {
  return (
    <div className="py-12 sm:py-16 md:py-24 space-y-16 sm:space-y-24 md:space-y-32 px-4">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8 px-4"
      >
        <p className="text-xl leading-relaxed text-gray-300">
          The Disarmament and International Security Committee (DISEC) is the
          First Committee of the United Nations General Assembly. Established in
          1945, it focuses on issues concerning global peace, disarmament, and
          international security. DISEC addresses topics such as nuclear
          disarmament, arms control, regional security, and the regulation of
          weapons of mass destruction. It plays a crucial role in formulating
          resolutions and agreements aimed at reducing global militarization and
          preventing armed conflict. While its resolutions are non-binding,
          DISEC influences the discourse on international security issues,
          encouraging collaboration among member states to create a safer world.
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
              name: "Sudeep Banerjee Chopra",
              role: "Chair",
              image: "/images/team/sudeep.png",
            },
            {
              name: "Siddha Sankalp Topalle",
              role: "Vice Chair",
              image: "/images/team/siddu.jpg",
            },
            {
              name: "Ananya Charaka",
              role: "Rapporteur",
              image: "/images/team/ananya.jpg",
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
