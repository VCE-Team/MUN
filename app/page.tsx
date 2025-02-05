import { Hero } from "@/app/components/hero";
import { Committees } from "@/app/components/committees";
import { Contact } from "@/app/components/contact";
import { RevealAnimation } from "@/app/components/reveal-animation";
import { SecGenDirectorGen } from "./components/sec-gen-director-gen";
import { Partners } from "./components/partners";
import { LoadingScreen } from "./components/loading-screen";
import { RouteLoading } from "./components/route-loading";

export default function Home() {
  return (
    <div className="min-h-screen">
      <LoadingScreen />
      <RouteLoading />
      <Hero />
      <RevealAnimation>
        <div>
          <h1
            style={{
              textAlign: "center",
              fontSize: "3rem",
              fontWeight: "bold",
              color: "white",
              padding: "10rem",
            }}
          >
            Stay Tuned – Event Dates Will Be Revealed Soon!
          </h1>
        </div>
      </RevealAnimation>
      <RevealAnimation>
        <Committees />
      </RevealAnimation>
      <RevealAnimation>
        <SecGenDirectorGen />
      </RevealAnimation>
      <RevealAnimation>
        <Partners />
      </RevealAnimation>
      <RevealAnimation>
        <Contact />
      </RevealAnimation>
    </div>
  );
}
