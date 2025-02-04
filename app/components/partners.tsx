import Image from "next/image";

const partners = [
  {
    name: "Vardhaman Logo",
    logo: "/images/logos/vardhamanlogo.png",
    height: 120,
    width: 120,
  },
  {
    name: "IEEE VCE SB",
    logo: "/images/logos/ieeevcesb.png",
    height: 120,
    width: 120,
  },
  {
    name: "IEEE Education",
    logo: "/images/logos/ieeeeducation.png",
    height: 200,
    width: 200,
  },
  {
    name: "SAC",
    logo: "/images/logos/saclogo.png",
    height: 120,
    width: 120,
  },
];

export function Partners() {
  return (
    <section className="py-12 bg-muted group">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
          {partners.map(partner => (
            <div key={partner.name} className="relative">
              <Image
                src={partner.logo || "/placeholder.svg"}
                alt={partner.name}
                height={partner.height}
                width={partner.width}
                className="object-contain grayscale-70 transition-all group-hover:grayscale-0"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
