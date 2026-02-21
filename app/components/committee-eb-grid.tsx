'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface CommitteeMember {
  name: string;
  position: string;
  image: string;
  bio?: string;
}

interface CommitteeEBGridProps {
  title: string;
  members: CommitteeMember[];
}

export function CommitteeEBGrid({ title, members }: CommitteeEBGridProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.9,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.9 }}
      className="max-w-6xl mx-auto px-4"
    >
      <h3 className="text-2xl sm:text-3xl font-bold text-center text-gray-100 mb-12">
        {title}
      </h3>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {members.map((member, index) => (
          <motion.div
            key={`${member.name}-${index}`}
            variants={itemVariants}
            className="flex flex-col items-center"
          >
            <div className="relative w-32 h-32 xs:w-40 xs:h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden shadow-lg mb-4">
              <Image
                src={member.image}
                alt={`${member.name} - ${member.position}`}
                fill
                className="object-cover"
              />
            </div>
            <div className="text-center space-y-2">
              <p className="text-xs sm:text-sm uppercase tracking-wider text-red-400 font-semibold">
                {member.position}
              </p>
              <h4 className="text-lg sm:text-xl font-semibold text-gray-100">
                {member.name}
              </h4>
              {member.bio && (
                <p className="text-xs sm:text-sm leading-relaxed text-gray-400 max-w-xs">
                  {member.bio}
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}
