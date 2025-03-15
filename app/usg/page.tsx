"use client";

import Image from "next/image";
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
    image: "/images/usg/sujithusg.jpg",
  },
  {
    name: "Aniketh G.",
    role: "USG Design",
    image: "/images/usg/anikethusg.png",
  },
  {
    name: "Sadha",
    role: "USG Technology",
    image: "/images/usg/sadausg.png",
  },
  {
    name: "Vaishali Bandaru",
    role: "Head of Social Media",
    image: "/images/usg/vaishaliusg.jpg",
  },
  {
    name: "Pothu Vennela Priya",
    role: "Head of Social Media",
    image: "/images/usg/vennelausg.jpg",
  },
  {
    name: "Franzonia MSYKG",
    role: "USG Finance",
    image: "/images/usg/franzusg.png",
  },
  {
    name: "Teerthala Lohith Kumar",
    role: "USG Logistics",
    image: "/images/usg/lohithusg.png",
  },
  {
    name: "Aniketh Kanna",
    role: "Director of Photography",
    image: "/images/usg/anikethhusg.jpg",
  },
  {
    name: "Sri Satya Subham Peri",
    role: "USG Logistics",
    image: "/images/usg/shubhamusg.jpg",
  },
  {
    name: "Bhavish Reddy",
    role: "USG Sponsorship",
    image: "/images/usg/bhavishusg.png",
  },
  {
    name: "Dinesh Reddy Malreddy",
    role: "OC head",
    image: "/images/usg/dineshusg.jpg",
  },
  {
    name: "Advith Reddy Teelaru",
    role: "OC Head",
    image: "/images/usg/advithusg.jpg",
  },
];

export default function TeamPage() {
  return (
    <>
      <RouteLoading />
      <div className="min-h-screen bg-gradient-to-b from-background to-black py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">
              Meet Our Team
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground">
              Dedicated professionals leading the way
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full md:w-5/6 mx-auto">
            {teamMembers.map(member => (
              <div
                key={member.name}
                className="flex flex-col items-center w-full"
              >
                <div className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-full overflow-hidden mb-2">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                    priority
                    onError={e => {
                      console.error("Image load error", e);
                    }}
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-base sm:text-lg font-semibold mb-0.5">
                    {member.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    {member.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
