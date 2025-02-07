import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";

const partnerLogos = {
  mainPartners: [
    {
      name: "VCE Logo",
      logo: "/images/logos/vardhamanlogo.png",
      height: 80,
      width: 80,
    },
  ],
  sacPartners: [
    {
      name: "SAC Logo",
      logo: "/images/logos/saclogomain.png",
      height: 80,
      width: 80,
    },
  ],
  coSponsors: [
    {
      name: "Institution's Innovation Council",
      logo: "/images/logos/iic.png",
      height: 80,
      width: 100,
    },
    {
      name: "T-Works",
      logo: "/images/logos/tworks.png",
      height: 80,
      width: 100,
    },
    {
      name: "Osmania Technology Business Incubator",
      logo: "/images/logos/otbi.png",
      height: 80,
      width: 100,
    },
    {
      name: "J-Hub",
      logo: "/images/logos/jhub.png",
      height: 80,
      width: 100,
    },
  ],
  organizedBy: [
    {
      name: "TSIC",
      logo: "/images/logos/tsic.png",
      height: 80,
      width: 100,
    },
    {
      name: "AIC Mahindra",
      logo: "/images/logos/aicmahindra.png",
      height: 80,
      width: 100,
    },
    {
      name: "APEDA",
      logo: "/images/logos/apeda.png",
      height: 80,
      width: 100,
    },
    {
      name: "MoES Innovation Cell",
      logo: "/images/logos/moes.png",
      height: 80,
      width: 100,
    },
  ],
  sponsors: [
    {
      name: "Monster",
      logo: "/images/logos/monster.png",
      height: 80,
      width: 120,
    },
    {
      name: "Tesla",
      logo: "/images/logos/tesla.png",
      height: 80,
      width: 120,
    },
    {
      name: "Google",
      logo: "/images/logos/google.png",
      height: 80,
      width: 120,
    },
    {
      name: "Microsoft",
      logo: "/images/logos/microsoft.png",
      height: 80,
      width: 120,
    },
  ],
};

const LogoGrid: React.FC<{
  logos: {
    name: string;
    logo: string;
    height: number;
    width: number;
  }[];
  title?: string;
}> = ({ logos, title }) => (
  <div className="flex flex-col items-center space-y-4">
    {title && <h3 className="text-lg font-semibold text-primary">{title}</h3>}
    <div className="flex flex-wrap justify-center gap-6 items-center">
      {logos.map(logo => (
        <div key={logo.name} className="flex items-center justify-center">
          <Image
            src={logo.logo}
            alt={logo.name}
            height={logo.height}
            width={logo.width}
            className="object-contain grayscale hover:grayscale-0 transition-all duration-300"
          />
        </div>
      ))}
    </div>
  </div>
);

export function Partners() {
  return (
    <section className="py-8 bg-background">
      <div className="container mx-auto px-4">
        <Card className="w-full p-6 shadow-lg">
          <CardContent>
            <div className="flex flex-col md:flex-row justify-center items-center gap-12">
              <div className="flex flex-col items-center space-y-8">
                <LogoGrid logos={partnerLogos.mainPartners} />
                {/* <LogoGrid logos={partnerLogos.coSponsors} title="Co-Sponsors" /> */}
              </div>

              <div className="hidden md:block">
                <Separator
                  orientation="vertical"
                  className="h-[12rem] w-0.5"
                />
              </div>

              <div className="flex flex-col items-center space-y-8">
                <LogoGrid logos={partnerLogos.sacPartners} />
                {/* <LogoGrid
                  logos={partnerLogos.organizedBy}
                  title="Organized By"
                /> */}
              </div>
            </div>

            {/* <Separator className="my-12" />

            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-center text-primary mb-6">
                Our Sponsors
              </h2>
              <LogoGrid logos={partnerLogos.sponsors} />
            </div> */}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
