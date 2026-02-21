"use client";

import { RouteLoading } from "@/app/components/route-loading";
import Image from "next/image";

type ChairCardProps = {
  title: string;
  name: string;
  roleLabel: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  titleColorHex?: string;
};

function ChairCard({
  title,
  name,
  roleLabel,
  description,
  imageSrc,
  imageAlt,
  titleColorHex,
}: ChairCardProps) {
  return (
    <section className="max-w-5xl mx-auto px-4 py-10 border border-white/10 rounded-2xl bg-black/40 backdrop-blur-sm space-y-6">
      <h2
        className="text-2xl sm:text-3xl font-bold text-center"
        style={titleColorHex ? { color: titleColorHex } : undefined}
      >
        {title}
      </h2>
      <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start sm:gap-8">
        <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden shadow-lg flex-shrink-0">
          <Image src={imageSrc} alt={imageAlt} fill className="object-cover" />
        </div>
        <div className="space-y-3 text-center sm:text-left">
          <div>
            <p className="text-xs uppercase tracking-wide text-gray-400">
              {roleLabel}
            </p>
            <p className="text-xl sm:text-2xl font-semibold text-white">
              {name}
            </p>
          </div>
          <p className="text-sm sm:text-base leading-relaxed text-gray-300 whitespace-pre-line">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}

export default function Chairs() {
  return (
    <>
      <RouteLoading />
      <main className="bg-black text-white min-h-screen py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-5xl space-y-10 sm:space-y-12">
          <header className="text-center space-y-3">
            <h1 className="text-3xl md:text-4xl font-bold">
              Chairs and Executive Board
            </h1>
            <p className="text-gray-300 text-sm md:text-base max-w-2xl mx-auto">
              Meet the executive board and heads of each committee at VCEMUN
              2026. They bring experience, vision, and commitment to ensure a
              rigorous yet welcoming conference for every delegate.
            </p>
          </header>

          <div className="space-y-8 sm:space-y-10">
            <ChairCard
              title="AIPPM – All India Political Parties Meet"
              name="Sangras Bhargav"
              roleLabel="Speaker, AIPPM"
              titleColorHex="#b36920"
              imageSrc="/images/chairs/Sangras Bhargav.jpeg"
              imageAlt="Sangras Bhargav - AIPPM Speaker"
              description={
                "Sangras Bhargav is a fourth-generation lawyer and computer science graduate who chose to dedicate his career to the practice of law. He is currently an Advocate at the Telangana High Court, where he specializes in criminal law and matrimonial disputes. Known for his commitment, sharp legal acumen, and persuasive advocacy, Sangras strongly believes that law is the most powerful instrument to uphold justice.\n\nWith nearly a decade of experience in AIPPMs and Youth Parliaments, he has earned a reputation for his clarity of thought, analytical depth, and the ability to simplify complex legal and political issues for diverse audiences. His arguments balance wit with wisdom, making him a dynamic voice in every forum he participates in.\n\nBeyond the courtroom and debating floor, Sangras is an avid reader and a dedicated mentor, guiding aspiring students with integrity and purpose. His presence ensures that every discussion is not only engaging but also rooted in knowledge and conviction."
              }
            />

            <ChairCard
              title="DISEC – Disarmament and International Security Committee"
              name="Eswar Chava"
              roleLabel="Chairperson, DISEC"
              titleColorHex="#0e76be"
              imageSrc="/images/chairs/Eswar Chava.jpeg"
              imageAlt="Eswar Chava - DISEC Chairperson"
              description={
                "Eswar Chava, a renowned face in MUNs across the country, first discovered his passion for debate and diplomacy through MUNs in college. With a profound interest in international law and foreign policy, he believes that \"Life is what begins at the end of your comfort zone.\" Over the years, Eswar has amassed a wealth of experience across numerous UN committees, making him a respected and sought-after figure, particularly in military committees, where his insights and expertise have left a lasting impact.\n\nWhen he's not stressed out by his work, you'll find him gaming or vibing to music. Known for his down-to-earth personality and genuine dedication to fostering collaboration, Eswar is honoured to serve on the Executive Board, ready to champion a space where meaningful dialogue can thrive and every delegate's voice is heard."
              }
            />

            <ChairCard
              title="UNHRC – United Nations Human Rights Council"
              name="Vishal Chowdary"
              roleLabel="Chairperson, UNHRC"
              titleColorHex="#c72928"
              imageSrc="/images/chairs/Vishal Choudary.jpeg"
              imageAlt="Vishal Chowdary - UNHRC Chairperson"
              description={
                "Vishal Chowdary is a law graduate from Jindal Global Law School, whose deep interest in international relations is reflected in his extensive experiences at the United Nations. He has received exclusive letters of recommendation from a former Swedish diplomat, and from UNITAR during an Immersion Programme in Geneva, attended the World Congress on Enforced Disappearances, visited the UN Headquarters in New York, and observed treaty-body proceedings at the OHCHR.\n\nWith more than a decade of involvement in over 70 Model UNs and parliamentary debates across Hyderabad and Delhi, including two terms as Secretary-General, Vishal brings seasoned insight to humanitarian committees and crisis simulations. Approachable, thoughtful, and deeply committed to meaningful dialogue, he looks forward to guiding the UNHRC committee at VCEMUN 2026."
              }
            />

            <ChairCard
              title="International Press (IP)"
              name="Sai Preethi Polu"
              roleLabel="Head of International Press"
              titleColorHex="#55585d"
              imageSrc="/images/chairs/Sai Preethi Polu.jpeg"
              imageAlt="Sai Preethi Polu - Head of International Press"
              description={
                "Sai Preethi Polu is an avid munner who has attended over 100 MUNs in several circuits. Although she graduated B.Tech. in Information Technology, her passion for MUNs keeps her frequently exposed to worldly events that keep her up to date with current affairs of the world. Preethi takes a keen interest in taking part in MUNs and believes them to be an excellent platform for people to improve their analytical skills and leadership skills.\n\nWhile she is known for her experience in the International Press, she has an affinity towards humanitarian committees. She wishes the best for the participants and looks forward to the conference."
              }
            />
          </div>
        </div>
      </main>
    </>
  );
}
