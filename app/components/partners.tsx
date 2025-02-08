import { RevealAnimation } from "./reveal-animation";
import Image from "next/image";

const ContactSection = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex flex-col lg:flex-row justify-center items-center gap-8">
        <RevealAnimation className="w-full lg:w-1/3 flex flex-row items-flex-end gap-4">
          <Image
            src="/images/logos/vardhamanlogo.png"
            alt="VCE Logo"
            width={100}
            height={100}
            className="order-first lg:order-last"
          />
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold">Co - Sponsored By</h2>
            <p className="text-lg text-muted-foreground">
              Vardhaman College of Engineering
            </p>
          </div>
        </RevealAnimation>

        <RevealAnimation className="w-full lg:w-1/3 flex flex-row lg:flex-row items-center gap-4">
          <Image
            src="/images/logos/saclogomain.png"
            alt="SAC Logo"
            width={100}
            height={100}
            className="order-first lg:order-first"
          />
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold">Organized By</h2>
            <p className="text-lg text-muted-foreground">
              Student Affairs Cell
            </p>
          </div>
        </RevealAnimation>
      </div>
    </div>
  );
};

export default ContactSection;
