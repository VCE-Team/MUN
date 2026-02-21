import Link from 'next/link';
import { RevealAnimation } from './reveal-animation';
import Image from 'next/image';

const PartnersSection = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex flex-col lg:flex-row justify-evenly items-center gap-16">
        <RevealAnimation className="flex flex-col items-center text-center lg:text-left">
          <div className="flex flex-col items-center">
            <Link href="https://vardhaman.org/" target="_blank">
              <Image
                src="/images/logos/vardhamanlogo.jpg"
                alt="VCE Logo"
                width={80}
                height={80}
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
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-4 mb-4">
              <Image
                src="/images/logos/optimized/saclogomain.webp"
                alt="Student Affairs Cell Logo"
                width={100}
                height={100}
              />
              <Image
                src="/images/logos/vce-munsoc-logo.png"
                alt="VCE MUNSoc Logo"
                width={100}
                height={100}
                className="rounded-full"
              />
            </div>
            <h2 className="text-2xl font-bold text-center">Organized by</h2>
            <p className="text-lg text-muted-foreground">
              VCE MUNSoc under Student Affairs Cell
            </p>
          </div>
        </RevealAnimation>
      </div>
    </div>
  );
};

export default PartnersSection;
