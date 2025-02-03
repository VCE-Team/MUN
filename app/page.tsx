import { Hero } from "@/app/components/hero";
import { About } from "@/app/components/about";
import { Partners } from "@/app/components/partners";
import { Committees } from "@/app/components/committees";
import { CallToAction } from "@/app/components/cta";
import { Contact } from "@/app/components/contact";
import { RevealAnimation } from "@/app/components/reveal-animation";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <RevealAnimation>
        <About />
      </RevealAnimation>
      <RevealAnimation>
        <Partners />
      </RevealAnimation>
      <RevealAnimation>
        <Committees />
      </RevealAnimation>
      <RevealAnimation>
        <CallToAction />
      </RevealAnimation>
      <RevealAnimation>
        <Contact />
      </RevealAnimation>
    </div>
  );
}
