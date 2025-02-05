import Image from "next/image";

const partners = [
  {
    name: "Vardhaman Logo",
    logo: "/images/logos/vardhamanlogo.png",
    height: 275,
    width: 270,
  },
  {
    name: "SAC",
    logo: "/images/logos/saclogo.jpg",
    height: 120,
    width: 120,
  },
];

export function Partners() {
  return (
    <section className="py-12 bg-muted group">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-2 gap-8 items-center justify-items-center">
          {partners.map(partner => (
            <div key={partner.name} className="relative">
              <Image
                src={partner.logo || "/images/team/placeholder.png"}
                alt={partner.name}
                height={partner.height}
                width={partner.width}
                className="object-contain rounded-full"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
