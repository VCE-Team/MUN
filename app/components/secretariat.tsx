'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const secretariatMembers = [
  {
    role: 'Secretary General',
    name: 'T. Siddha Sankalp',
    image: '/images/secretariat/siddha sankalp.jpeg',
    letter: [
      'Dear Delegates,',
      'When we first envisioned this conference, the intention was simple: to create a space where ideas are taken seriously, where debate is rooted in preparation, and where leadership is defined by responsibility rather than recognition. Season 2 is a continuation of that commitment.',
      'Model United Nations, when pursued with sincerity, becomes more than a simulation. It becomes a test of perspective, patience, and principle. It teaches us that disagreement is not something to avoid, but something to navigate thoughtfully. It reminds us that influence is earned through understanding, not volume.',
      'This year, our team has worked with one clear priority: substance. The agendas are designed to challenge. The Executive Board has been chosen to uphold fairness and depth. Every delegate stepping into committee carries the opportunity to shape meaningful discourse.',
      'As Secretary-General, I do not simply hope for competitive debate. I hope for growth. I hope each participant leaves this conference more confident in their voice, more disciplined in their thinking, and more open to perspectives beyond their own.',
      'Thank you for placing your trust in VCEMUN. I look forward to witnessing the conversations, negotiations, and leadership that will define Season 2.',
    ],
    signature: 'T. Siddha Sankalp\nSecretary-General\nVCEMUN Season 2',
  },
  {
    role: 'Deputy Secretary General',
    name: 'Syeda Sayeeda Farhath',
    image: '/images/secretariat/sayeeda farhath.jpeg',
    letter: [
      'Dear Delegates,',
      'It gives me immense pleasure and gratitude to welcome you all to Season 2 of VCEMUN. From what began exactly a year ago as a simple conversation during a club meeting, to taking charge and putting ideas into action, we have truly come a long way.',
      'I take immense pride in the journey and transformation each one of us has experienced personally - from serving as the Chief Editor of the International Press last season to now leading my incredible team as the Deputy Secretary-General.',
      "Here's something each one of you must know: VCEMUN is not just about resolutions and committee sessions; it is about courage. The courage to raise your placard. The courage to challenge perspectives. The courage to listen. And that is exactly what we aim to achieve this season as we return stronger, better, and more determined to create a truly intellectual and memorable experience.",
      'The experience of bringing this season to life has been surreal. Yet, we know we have a long way to go, and we remain committed to making it better with every step forward.',
      'We cannot wait to host each one of you and witness the ideas you bring to the table on the 27th and 28th of February, 2026.',
      "Here's to diplomacy, and to dialogue that truly matters.",
    ],
    signature:
      'Syeda Sayeeda Farhath\nDeputy Secretary-General\nVCEMUN Season 2',
  },
  {
    role: 'Director General',
    name: 'Ananya Charaka',
    image: '/images/secretariat/ananya.jpeg',
    letter: [
      'Dear Delegates,',
      'VCEMUN was conceived with intention rather than ambition. It was built on the belief that meaningful debate does not emerge from noise, but from clarity of thought, mutual respect, and careful preparation. Season 2 is a reaffirmation of that belief.',
      'Model United Nations finds its true value beyond procedure and performance. It lies in the discipline of listening before responding, in engaging with opposing views without defensiveness, and in remaining committed to dialogue even when agreement feels distant. This edition of VCEMUN has been shaped by a team that understands this responsibility.',
      'Our Chairs, Organising Committee, and Press Corps have worked with focus and integrity to ensure an environment where substance leads and every contribution is respected. Here, leadership is demonstrated through consistency, responsibility, and an openness to learning.',
      'As you step into committee, I encourage you to speak with intention, listen with attentiveness, and engage with integrity. VCEMUN is not defined by the resolutions passed or the accolades received, but by the perspective you carry forward.',
      'Thank you for choosing to be part of VCEMUN Season 2. Your presence and participation are what give this conference its purpose.',
    ],
    signature: 'Ananya Charaka\nDirector General\nVCEMUN Season 2',
  },
];

export function Secretariat() {
  return (
    <section className="bg-black text-white py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-serif">
            From the Secretariat
          </h2>
        </motion.div>

        {secretariatMembers.map((member, index) => (
          <div key={index} className={index > 0 ? 'mt-[18vh]' : ''}>
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="max-w-3xl mx-auto space-y-8 flex flex-col items-center"
              >
                <h3 className="text-2xl md:text-3xl font-serif mb-2 text-center">
                  {member.role}
                </h3>

                <div className="relative w-3/5 h-[200px] md:h-[300px] mb-8">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover rounded-lg"
                    priority={index === 0}
                  />
                </div>

                <h4 className="text-xl font-semibold mb-4">{member.name}</h4>

                <div className="space-y-6 text-gray-300 leading-8">
                  {member.letter.map((paragraph, pIndex) => (
                    <p key={pIndex}>{paragraph}</p>
                  ))}
                  <div className="pt-3">
                    {member.signature.split('\n').map((line, lineIndex) => (
                      <p
                        key={lineIndex}
                        className={lineIndex === 0 ? 'font-semibold' : ''}
                      >
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
