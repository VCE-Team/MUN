import { Hero } from "@/app/components/hero";
import { About } from "@/app/components/about";
import { Committees } from "@/app/components/committees";
import { CallToAction } from "@/app/components/cta";
import { Contact } from "@/app/components/contact";
import { Partners } from "@/app/components/partners";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <About />
      <Partners />
      <Committees />
      <CallToAction />
      <Contact />
    </div>
  );
}
