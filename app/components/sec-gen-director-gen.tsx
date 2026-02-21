'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export function SecGenDirectorGen() {
  return (
    <section className="bg-black text-white py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto space-y-8 flex flex-col items-center"
        >
          <h2 className="text-3xl font-serif mb-2">
            From the desk of the Secretary General
          </h2>

          <div className="relative w-3/5 h-[200px] md:h-[300px] mb-12">
            <Image
              src="/images/usg/akshayusg.png"
              alt="Secretary General"
              fill
              className="object-cover rounded-lg"
              priority
            />
          </div>

          <div className="space-y-6 text-gray-300 leading-8">
            <p>Greetings Distinguished Delegates,</p>
            <p>
              Dear Delegates, Faculty, and Esteemed Guests, When I first
              envisioned VCEMUN, it was more than a spark of an idea—it was a
              call to foster a new generation of diplomacy and dialogue. Our
              modest beginnings as part of the Journeyzia Club, with just nine
              enthusiastic members, have blossomed into an event that stands as
              a testament to determination and belief in meaningful
              conversation.
            </p>
            <p>
              As Secretary General, I have had the privilege of shaping the
              foundational ideas of VCEMUN. Over the past 1.5 years, every
              debate, every brainstorming session, and every sleepless night has
              been driven by the desire to create a platform where voices are
              not only heard but also respected. Today, as we gather for this
              inaugural event, I am proud to see that spark ignite into a full
              flame of potential and promise.
            </p>
            <p>
              I invite you to immerse yourselves in this experience. Let your
              ideas challenge conventions and let your words pave the way for a
              future defined by cooperation and understanding. Together, we are
              not merely attending a conference; we are partaking in the
              creation of a legacy. Alongside Aron and myself I would like to
              also appreciate all those who believed in this dream, whose
              relentless energy has been the force behind every accomplishment,
              I welcome you to VCEMUN.
            </p>
            <div className="pt-3">
              <p className="pb-4">Warm regards,</p>
              <p className="font-semibold">A. Akshay</p>
              <p>Secretary General</p>
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
            From the desk of the Director General
          </h2>

          <div className="relative w-3/5 h-[200px] md:h-[300px] mb-12">
            <Image
              src="/images/usg/arunusg.jpg"
              alt="Secretary General"
              fill
              className="object-cover rounded-lg"
              priority
            />
          </div>

          <div className="space-y-6 text-gray-300 leading-8">
            <p>Greetings Distinguished Delegates,</p>
            <p>
              Dear Delegates, Organizers, and Distinguished Guests, Today marks
              the beginning of a bold chapter at our college—a chapter built on
              ambition, innovation, and a shared commitment to global dialogue.
              As the Director General, I have had the honor of guiding this
              project from its earliest days. Since its inception, I have
              witnessed our dream evolve into a vibrant and ambitious
              conference.
            </p>
            <p>
              VCEMUN is not just an event—it is a platform engineered for action
              and leadership. It challenges every participant to step forward,
              think critically, and contribute to discussions that mirror the
              complexities of our modern world. Our rigorous preparations and
              collective efforts over the last 1.5 years underscore our
              commitment to not only emulate the workings of international
              diplomacy but also to inspire tangible change. I am immensely
              proud of what we have built together, from a small club initiative
              to an institution ready to host one of the most prestigious events
              in our college&apos;s history.
            </p>
            <p>
              As you engage in debates and collaborative problem-solving
              sessions, remember that every idea has the power to shape our
              future. Thank you for joining us on this transformative journey.
              Let us seize this moment to redefine leadership and create a
              lasting impact on our community and beyond.
            </p>
            <div className="pt-3">
              <p className="pb-4">Sincerely,</p>
              <p className="font-semibold">Aron D&apos;Souza</p>
              <p>Director General</p>
              <p>VCEMUN 2025</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
