"use client";

import { motion } from "framer-motion";
import Image from "next/image";
// import { CallToAction } from "@/app/components/call-to-action";

export default function InternationalPressPage() {
  return (
    <div className="py-16 space-y-20">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="max-w-4xl mx-auto text-center space-y-8"
      >
        <p className="text-lg leading-relaxed">
          The International Press (IP) serves as the eyes and ears of global
          diplomacy, ensuring transparency and accountability in international
          discussions. Comprising journalists and photographers, the IP plays a
          crucial role in reporting on key issues, such as allegations of
          genocide and human rights violations in conflict zones. Through
          investigative journalism, interviews, and visual documentation, it
          provides unbiased coverage, shapes public opinion, and holds global
          leaders accountable. By fostering informed debate and amplifying the
          voices of those affected, the International Press upholds the
          principles of free speech and responsible journalism in the realm of
          international affairs.
        </p>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="space-y-8"
      >
        <div className=" text-center rounded-md bg-red-700/70 py-2 px-4 text-white text-xl font-semibold">
          Registrations are closed for VCEMUN.
        </div>
        <div className="rounded-md bg-gray-800/70 py-2 px-4 text-white text-lg font-medium">
          <span className="text-gray-300">Venue:</span>{" "}
          <span className="text-white">IP: Glass Building 2nd Floor</span>
        </div>
        <h2 className="text-4xl font-bold text-center">The Executive Board</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 p-0 gap-[10rem] max-w-5xl mx-auto">
          <div></div>
          {[
            {
              name: "Sai Vardhan Barla",
              role: "Chair",
              image: "/images/team/saivardhan.jpg",
            },
            {
              name: "Syeda Sayeeda Farhath",
              role: "Chief Editor",
              image: "/images/team/farhath.jpg",
            },
          ].map(member => (
            <div
              key={member.name}
              className="flex flex-col items-center space-y-4"
            >
              <div className="relative w-64 h-64 mx-4 overflow-hidden rounded-lg">
                <Image
                  src={member.image || "/images/team/placeholder.png"}
                  alt={member.name}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <h3 className="text-xl font-bold sm:whitespace-nowrap sm:overflow-hidden sm:text-ellipsis">
                {member.name}
              </h3>
              <p className="text-gray-400 sm:whitespace-nowrap sm:overflow-hidden sm:text-ellipsis">
                {member.role}
              </p>
            </div>
          ))}

          <div></div>
        </div>
      </motion.section>
      {/* <CallToAction delay={0.8} /> */}
    </div>
  );
}
