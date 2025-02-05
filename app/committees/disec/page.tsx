"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function DISECPage() {
  return (
    <div className="py-24 space-y-32">
      {" "}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="max-w-4xl mx-auto text-center space-y-8"
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
        transition={{ delay: 0.4 }}
        className="text-center space-y-6"
      >
        <h2 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-200 to-gray-400">
          Agenda
        </h2>
        <p className="text-3xl text-gray-300">
          Tackling the use of Chemical and Biological weapons in conflict
        </p>
      </motion.section>
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="space-y-12"
      >
        <h2 className="text-5xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-gray-200 to-gray-400">
          The Executive Board
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {[
            {
              name: "Sudeep",
              role: "Chair",
              image: "/images/team/sudeep.png",
            },
            {
              name: "Siddha Sankalp",
              role: "Vice Chair",
              image: "/images/team/siddu.jpg",
            },
            {
              name: "Ananya",
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
        </div>
      </motion.section>
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="max-w-5xl mx-auto"
      >
        <Link href="/register">
          <div className="bg-black border border-red-600 rounded-lg p-8 text-center cursor-pointer hover:shadow-2xl transition-shadow duration-300">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Make Your Voice Heard?
            </h2>
            <p className="text-lg text-gray-200 mb-6">
              Register now for the Model United Nations and join the global
              debate!
            </p>
            <button className="bg-red-600 text-white font-semibold py-3 px-8 rounded-full hover:bg-red-700 transition-colors duration-300">
              Register Now
            </button>
          </div>
        </Link>
      </motion.section>
    </div>
  );
}
