"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface TeamMember {
  name: string;
  role: string;
  image: string;
}

const teamMembers: Record<string, TeamMember[]> = {
  "Advisory Board": [
    {
      name: "Dr. Sarah Johnson",
      role: "Head of Advisory",
      image: "/images/team/1.jpg",
    },
  ],
  "Executive Board": [
    {
      name: "Michael Stevens",
      role: "President",
      image: "/images/team/2.jpg",
    },
  ],
  "Technical & Web Development": [
    {
      name: "Alex Chen",
      role: "Lead Developer",
      image: "/images/team/3.jpg",
    },
    {
      name: "Emma Wilson",
      role: "UX Designer",
      image: "/images/team/ananya.jpg",
    },
    {
      name: "James Taylor",
      role: "Full Stack Developer",
      image: "/images/team/sudeep.png",
    },
  ],
  "Expert Management": [
    {
      name: "David Lee",
      role: "Operations Manager",
      image: "/images/team/dhiren.jpg",
    },
    {
      name: "Rachel Brown",
      role: "Project Lead",
      image: "/images/team/siddu.jpg",
    },
  ],
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-black py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            Presenting a team of distinguished
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground">
            experts leading the way in their field
          </p>
        </div>

        {Object.entries(teamMembers).map(([section, members]) => (
          <div key={section} className="mb-12">
            <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-center">
              {section}
            </h2>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="flex flex-wrap justify-center gap-8"
            >
              {members.map(member => (
                <motion.div
                  key={member.name}
                  variants={itemVariants}
                  className="flex flex-col items-center w-full sm:w-auto"
                >
                  <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full overflow-hidden mb-4">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg sm:text-xl font-semibold mb-1">
                      {member.name}
                    </h3>
                    <p className="text-sm sm:text-base text-muted-foreground">
                      {member.role}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
}
