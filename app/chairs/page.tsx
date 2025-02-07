"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { RouteLoading } from "@/app/components/route-loading";

export default function Chairs() {
  return (
    <>
      <RouteLoading />
      <section className="bg-black text-white py-20">
        <div className="mt-[10vh] container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto space-y-8 flex flex-col items-center"
          >
            <h2 className="text-3xl font-serif mb-2">
              From the Desk of the Chair, DISEC
            </h2>

            <div className="relative w-2/5 h-[200px] md:h-[300px] mb-12">
              <Image
                src="/images/team/sudeep.png"
                alt="Secretary General"
                fill
                className="object-cover rounded-full"
                priority
              />
            </div>

            <div className="space-y-6 text-gray-300 leading-8">
              <p>Greetings Esteemed Delegates,</p>
              <p>
                It is my honour and privilege to welcome you to the Disarmament
                and International Security Committee (DISEC) at VCEMUN 2025. As
                one of the principal organs of the United Nations General
                Assembly, DISEC plays a vital role in addressing global security
                challenges, promoting disarmament, and preventing the
                proliferation of weapons that threaten peace and stability.
              </p>
              <p>
                This year, we gather to deliberate on one of the most pressing
                threats to international security—the use of chemical and
                biological weapons in conflict. These weapons, capable of
                causing widespread destruction and suffering, violate
                international humanitarian law and undermine global efforts
                toward peace. While significant strides have been made through
                international treaties, recent events have demonstrated the
                persistent threat posed by both state and non-state actors in
                acquiring and deploying these weapons. It is now our
                responsibility to reinforce existing frameworks, enhance
                compliance mechanisms, and explore innovative solutions to
                mitigate this danger.
              </p>
              <p>
                At VCEMUN, we strive to create a space for dynamic discourse,
                critical thinking, and meaningful diplomacy. Whether you are a
                seasoned delegate or stepping into committee for the first time,
                I encourage you to engage with confidence, challenge
                perspectives, and collaborate toward viable resolutions. The
                discussions we have here will not only shape committee outcomes
                but also refine our collective understanding of global security
                issues. I look forward to witnessing your insights, debates, and
                solutions over the course of the conference. Let us work
                together to pave the way for a safer and more secure world.
              </p>
              <div className="pt-3">
                <p className="pb-4">Warm regards,</p>
                <p className="font-semibold">Sudeep Banerjee</p>
                <p>Chair, DISEC</p>
                <p>VCEMUN 2025</p>
              </div>
            </div>
          </motion.div>
        </div>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto space-y-8 flex flex-col items-center"
          >
            <h2 className="text-3xl font-serif mb-2">
              From the Desk of the Chair, UNHRC
            </h2>

            <div className="relative w-2/5 h-[200px] md:h-[300px] mb-12">
              <Image
                src="/images/team/krunal.jpg"
                alt="Secretary General"
                fill
                className="object-cover rounded-full"
                priority
              />
            </div>

            <div className="space-y-6 text-gray-300 leading-8">
              <p>Greetings Delegates,</p>
              <p>
                It is my distinct honour and privilege to welcome you to the
                United Nations Human Rights Council (UNHRC) at VCEMUN 2025. As
                the principal UN body tasked with upholding and protecting
                fundamental human rights, this committee stands at the forefront
                of addressing some of the most pressing and sensitive issues of
                our time. This year, we delve into a matter of profound global
                significance—Allegations of Genocide and Human Rights Violations
                in Conflict Zones.
              </p>
              <p>
                It is my distinct honour and privilege to welcome you to the
                United Nations Human Rights Council (UNHRC) at VCEMUN 2025. As
                the principal UN body tasked with upholding and protecting
                fundamental human rights, this committee stands at the forefront
                of addressing some of the most pressing and sensitive issues of
                our time. This year, we delve into a matter of profound global
                significance—Allegations of Genocide and Human Rights Violations
                in Conflict Zones.
              </p>
              <p>
                At VCEMUN 2025, we strive to create an environment that is both
                intellectually stimulating and inclusive—where a first-time
                delegate finds their voice just as confidently as a seasoned MUN
                veteran refines theirs. Every contribution matter, and I
                encourage each of you to research diligently, debate
                passionately, and negotiate thoughtfully as we work towards
                effective resolutions.
              </p>
              <p>
                At VCEMUN 2025, we strive to create an environment that is both
                intellectually stimulating and inclusive—where a first-time
                delegate finds their voice just as confidently as a seasoned MUN
                veteran refines theirs. Every contribution matter, and I
                encourage each of you to research diligently, debate
                passionately, and negotiate thoughtfully as we work towards
                effective resolutions.
              </p>
              <p>
                We are excited to welcome you to what promises to be an
                enriching and transformative UNHRC session at VCEMUN 2025!
              </p>
              <div className="pt-3">
                <p className="pb-4">Warn regards,</p>
                <p className="font-semibold">Krunal Samtani</p>
                <p>Chair, UNHRC</p>
                <p>VCEMUN 2025</p>
              </div>
            </div>
          </motion.div>
        </div>
        <div className="mt-[18vh] container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto space-y-8 flex flex-col items-center"
          >
            <h2 className="text-3xl font-serif mb-2">
              From the Desk of the Chair, ECOSOC
            </h2>

            <div className="relative w-2/5 h-[200px] md:h-[300px] mb-12">
              <Image
                src="/images/team/ruchira.jpg"
                alt="Secretary General"
                fill
                className="object-cover rounded-full"
                priority
              />
            </div>

            <div className="space-y-6 text-gray-300 leading-8">
              <p>Greetings Esteemed Delegates,</p>
              <p>
                It is my distinct honour and privilege to welcome you to the
                Economic and Social Council (ECOSOC) at VCEMUN 2025. As one of
                the principal organs of the United Nations, ECOSOC plays a
                crucial role in fostering international cooperation on economic,
                social, and environmental issues. This year, we turn our
                attention to a critical and pressing global challenge—Combating
                Illicit Trading and Wildlife Resource Trafficking.
              </p>
              <p>
                Illicit wildlife trade is one of the largest and most profitable
                transnational crimes, fuelling environmental destruction,
                species extinction, and organized criminal networks. Beyond its
                devastating impact on biodiversity, this illegal industry
                threatens global security, economic stability, and the
                livelihoods of communities that depend on sustainable
                ecosystems. As delegates, you will be tasked with formulating
                innovative and actionable solutions to dismantle trafficking
                networks, strengthen enforcement mechanisms, and promote
                sustainable alternatives.
              </p>
              <p>
                At VCEMUN, we aim to foster an intellectually stimulating and
                collaborative environment where delegates of all experience
                levels can engage meaningfully in diplomacy and problem-solving.
                Whether you are a first-time participant or a seasoned MUN
                veteran, your contributions will be instrumental in shaping
                discussions that lead to effective policy recommendations. I
                encourage you to research thoroughly, debate passionately, and
                negotiate strategically as we work towards pragmatic solutions
                that balance conservation efforts with economic and social
                realities.
              </p>
              <p>
                This committee promises to challenge your perspectives, sharpen
                your diplomatic acumen, and leave you with invaluable
                experiences.
              </p>
              <p>
                We are excited to welcome you to what promises to be an engaging
                and transformative ECOSOC session at VCEMUN 2025!
              </p>
              <div className="pt-3">
                <p className="pb-4">Warm regards,</p>
                <p className="font-semibold">Ruchira Reddy</p>
                <p>Chair, ECOSOC</p>
                <p>VCEMUN 2025</p>
              </div>
            </div>
          </motion.div>
        </div>
        <div className="mt-[18vh] container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto space-y-8 flex flex-col items-center"
          >
            <h2 className="text-3xl font-serif mb-2">
              From the Desk of the IP Head, International Press
            </h2>

            <div className="relative w-2/5 h-[200px] md:h-[300px] mb-12">
              <Image
                src="/images/team/saivardhan.jpg"
                alt="Secretary General"
                fill
                className="object-cover rounded-full"
                priority
              />
            </div>

            <div className="space-y-6 text-gray-300 leading-8">
              <p>
                Greetings Esteemed Delegates It is with great enthusiasm that I
                welcome you to the International Press (IP) Committee at VCEMUN
                2025. As the eyes and ears of the conference, the International
                Press plays a crucial role in documenting, analyzing, and
                bringing to light the dynamic debates and negotiations that
                unfold within each committee.
              </p>
              <p>
                The power of journalism in international diplomacy cannot be
                understated. In an era where information shapes perceptions and
                influences global policies, the responsibility of the press is
                to present unbiased, factual, and insightful coverage. At
                VCEMUN, our team of reporters, photographers, and analysts will
                work tirelessly to ensure that every perspective is heard, every
                debate is recorded, and every moment of diplomacy is captured.
              </p>
              <p>
                Throughout the conference, the IP Committee will be engaged in:
                <br />
                Live Reporting: Delivering timely updates on crucial
                discussions.
                <br />
                Editorial Analysis: Offering critical insights into committee
                proceedings.
                <br />
                Interviews & Press Conferences: Engaging with delegates and
                executive board members.
                <br />
                Media Coverage: Showcasing the spirit of VCEMUN through
                compelling storytelling.
              </p>
              <p>
                We encourage all delegates to interact with our journalists,
                share your viewpoints, and contribute to the dialogue that
                extends beyond committee walls. Your words and actions will
                shape not only resolutions but also the narrative of this
                conference.
              </p>
              <p>
                I look forward to working alongside a passionate team of
                journalists who will bring VCEMUN 2025 to life through the power
                of storytelling. Let us embark on this journey of uncovering
                truth, fostering transparency, and amplifying the voices that
                drive change.
              </p>
              <div className="pt-3">
                <p className="pb-4">Best regards,</p>
                <p className="font-semibold">Sai Vardhan Barla</p>
                <p>IP Head</p>
                <p>VCEMUN 2025</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
