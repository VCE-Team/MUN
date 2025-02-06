import Image from "next/image";

const partners = [
  {
    name: "Vardhaman Logo",
    logo: "/images/logos/vardhamanlogo.png",
    height: 75,
    width: 75,
  },
  {
    name: "SAC",
    logo: "/images/logos/saclogo.jpg",
    height: 70,
    width: 70,
  },
];

export function Partners() {
  return (
    <section className="py-12 bg-muted group">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-2 gap-8 items-center justify-items-center">
          <div key={partners[0].name} className="relative">
            <Image
              src={partners[0].logo || "/images/team/placeholder.png"}
              alt={partners[0].name}
              height={partners[0].height}
              width={partners[0].width}
              className="object-contain rounded-full"
            />
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-2 gap-8 items-center justify-items-center">
          <div key={partners[1].name} className="relative">
            <Image
              src={partners[1].logo || "/images/team/placeholder.png"}
              alt={partners[1].name}
              height={partners[1].height}
              width={partners[1].width}
              className="object-contain rounded-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
