"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function ECOSOCPage() {
  return (
    <div className="py-16 space-y-20">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="max-w-4xl mx-auto text-center space-y-8"
      >
        <p className="text-lg leading-relaxed">
          International Press (IP) is the First Committee of the United Nations
          General Assembly. Established in 1945, it focuses on issues concerning
          global peace, disarmament, and international security. DISEC addresses
          topics such as nuclear disarmament, arms control, regional security,
          and the regulation of weapons of mass destruction. It plays a crucial
          role in formulating resolutions and agreements aimed at reducing
          global militarization and preventing armed conflict. While its
          resolutions are non-binding, DISEC influences the discourse on
          international security issues, encouraging collaboration among member
          states to create a safer world.
        </p>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-center space-y-4"
      >
        <h2 className="text-4xl font-bold">Agenda</h2>
        <p className="text-2xl">
          Combating illicit trading and wildlife resource trafficking
        </p>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="space-y-8"
      >
        <h2 className="text-4xl font-bold text-center">The Executive Board</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            {
              name: "Ruchira Dhanasri",
              role: "Chair",
              image: "/images/team/ruchira.jpg",
            },
            {
              name: "Tejasvi Bonam",
              role: "Co-Chair",
              image: "/images/team/tejaswi.jpg",
            },
            {
              name: "Dhiren Rao B",
              role: "Rapporteur",
              image: "/images/team/dhiren.jpg",
            },
          ].map(member => (
            <div key={member.name} className="text-center space-y-4">
              <div className="relative w-64 h-64 mx-auto">
                <Image
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold">{member.name}</h3>
              <p className="text-gray-400">{member.role}</p>
            </div>
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
