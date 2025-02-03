import { Hero } from "@/app/components/hero";
import { About } from "@/app/components/about";
import { Committees } from "@/app/components/committees";
import { Contact } from "@/app/components/contact";
import { RevealAnimation } from "@/app/components/reveal-animation";
import { SecGenDirectorGen } from "./components/sec-gen-director-gen";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <RevealAnimation>
        <About />
      </RevealAnimation>
      <RevealAnimation>
        <Committees />
      </RevealAnimation>
      <RevealAnimation>
        <SecGenDirectorGen />
      </RevealAnimation>
      <RevealAnimation>
        <Contact />
      </RevealAnimation>
    </div>
  );
}
