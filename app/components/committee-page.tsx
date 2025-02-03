"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface BoardMember {
  name: string;
  role: string;
  image: string;
}

interface CommitteePageProps {
  title: string;
  description: string;
  agenda: string;
  heroImage: string;
  board: BoardMember[];
}

export function CommitteePage({
  title,
  description,
  agenda,
  heroImage,
  board,
}: CommitteePageProps) {
  return (
    <div className="min-h-screen">
      <section className="relative h-screen flex items-center justify-center">
        <Image
          src={heroImage || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
      </section>

      <section className="py-20 px-4 md:px-8 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="prose prose-invert max-w-none"
        >
          <p className="text-lg leading-relaxed">{description}</p>
        </motion.div>
      </section>

      <section className="py-20 px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-4xl font-bold mb-12">Agenda</h2>
          <p className="text-2xl">{agenda}</p>
        </motion.div>
      </section>

      <section className="py-20 px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-4xl font-bold mb-12">The Executive Board</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {board.map(member => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center"
              >
                <div className="relative w-64 h-64 mb-4 overflow-hidden rounded-lg">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-2xl font-bold mb-2">{member.name}</h3>
                <p className="text-gray-400 uppercase tracking-wide">
                  {member.role}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
}
