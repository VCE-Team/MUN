"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { RouteLoading } from "@/app/components/route-loading";

interface TeamMember {
  name: string;
  role: string;
  image: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Kayithi Sujeeth Reddy",
    role: "USG Outreach and marketing",
    image: "/images/team/sujeeth.jpg",
  },
  {
    name: "Aniketh G.",
    role: "USG Design",
    image: "/images/team/anikethg.jpg",
  },
  {
    name: "Sadha",
    role: "USG Technology",
    image: "/images/team/sadha.jpg",
  },
  {
    name: "Vaishali Bandaru",
    role: "Head of Social Media",
    image: "/images/team/vaishali.jpg",
  },
  {
    name: "Pothu Vennela Priya",
    role: "Head of Social Media",
    image: "/images/team/vennela.jpg",
  },
  {
    name: "Franz",
    role: "USG Finance",
    image: "/images/team/franz.jpg",
  },
  {
    name: "Teerthala Lohith Kumar",
    role: "USG Logistics",
    image: "/images/team/lohith.jpg",
  },
  {
    name: "Aniketh Kanna",
    role: "Director of Photography",
    image: "/images/team/aniketh.jpg",
  },
  {
    name: "Sri Satya Subham Peri",
    role: "USG Logistics",
    image: "/images/team/shubham.jpg",
  },
  {
    name: "Bhavish Reddy",
    role: "USG Sponsorship",
    image: "/images/team/bhavish.jpg",
  },
  {
    name: "Dinesh Reddy Malreddy",
    role: "OC head",
    image: "/images/team/dinesh.jpg",
  },
  { name: "Advith Teelaru", role: "OC Head", image: "/images/team/advith.jpg" },
];

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
  const [imageSrcs, setImageSrcs] = useState<{ [key: string]: string }>({});
  return (
    <>
      <RouteLoading />
      <div className="min-h-screen bg-gradient-to-b from-background to-black py-20 px-4">
        <div className="max-w-6xl mt-[10vh] mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">
              Meet Our Team
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground">
              Dedicated professionals leading the way
            </p>
          </div>

          <div className="flex justify-center">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 w-full md:w-5/6 justify-items-center"
            >
              {teamMembers.map(member => (
                <motion.div
                  key={member.name}
                  variants={itemVariants}
                  className="flex flex-col items-center w-full max-w-[200px]"
                >
                  <div className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-full overflow-hidden mb-4">
                    <Image
                      src={imageSrcs[member.name] || member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                      onError={() => {
                        setImageSrcs(prev => ({
                          ...prev,
                          [member.name]: "/images/team/placeholder.jpg",
                        }));
                      }}
                    />
                  </div>
                  <div className="text-center">
                    <h3 className="text-base sm:text-lg font-semibold mb-1">
                      {member.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      {member.role}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}
