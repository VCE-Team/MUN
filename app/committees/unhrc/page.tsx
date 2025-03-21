"use client";

import { motion } from "framer-motion";
// import { CallToAction } from "@/app/components/call-to-action";
import Image from "next/image";

export default function UNHRCPage() {
  return (
    <div className="py-16 space-y-20">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="max-w-4xl mx-auto text-center space-y-8"
      >
        <p className="text-lg leading-relaxed">
          The United Nations Human Rights Council (UNHRC) is a key
          intergovernmental body within the UN responsible for promoting and
          protecting human rights worldwide. It plays a crucial role in
          addressing allegations of genocide and human rights violations in
          conflict zones, ensuring accountability, and advocating for justice.
          Through investigations, resolutions, and diplomatic efforts, UNHRC
          works to prevent atrocities, support affected communities, and uphold
          international human rights law. By collaborating with states, NGOs,
          and humanitarian organizations, the committee strives to implement
          measures that safeguard human dignity and prevent future violations.
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
          Allegations of Genocide and Human Rights Violations in Conflict Zones
        </p>
        <div className="rounded-md bg-red-700/70 py-2 px-4 text-white text-xl font-semibold">
          Registrations are closed for VCEMUN.
        </div>
        <div className="rounded-md bg-gray-800/70 py-2 px-4 text-white text-lg font-medium">
          <span className="text-gray-300">Venue:</span>{" "}
          <span className="text-white">UNHRC: 1016</span>
        </div>
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
              name: "Krunal Samtani",
              role: "Chair",
              image: "/images/team/krunal.jpg",
            },
            {
              name: "M V Krishna Vihar",
              role: "Vice Chair",
              image: "/images/team/krish.jpg",
            },
            {
              name: "Anumita Choubey",
              role: "Rapporteur",
              image: "/images/team/anumita.png",
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
      {/* <CallToAction delay={0.8} /> */}
    </div>
  );
}
