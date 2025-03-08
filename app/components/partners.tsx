import Link from "next/link";
import { RevealAnimation } from "./reveal-animation";
import Image from "next/image";

const PartnersSection = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex flex-col lg:flex-row justify-evenly items-center gap-8">
        <RevealAnimation className="flex flex-col items-center text-center lg:text-left">
          <div className="flex flex-col items-center ">
            <Link href="https://vardhaman.org/" target="_blank">
              <Image
                src="/images/logos/vardhamanlogo.png"
                alt="VCE Logo"
                width={100}
                height={100}
                className="mb-4"
              />
            </Link>
            <h2 className="text-2xl font-bold">Co - Sponsored By</h2>
            <p className="text-lg text-muted-foreground">
              Vardhaman College of Engineering
            </p>
          </div>
        </RevealAnimation>

        <RevealAnimation className="flex flex-col items-center text-center lg:text-left">
          <div className="flex flex-col items-center ">
            <Image
              src="/images/logos/saclogomain.png"
              alt="SAC Logo"
              width={100}
              height={100}
              className="mb-4"
            />
            <h2 className="text-2xl font-bold">Organized By</h2>
            <p className="text-lg text-muted-foreground">
              Student Affairs Cell
            </p>
          </div>
        </RevealAnimation>
      </div>
    </div>
  );
};

export default PartnersSection;
