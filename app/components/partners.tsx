import Image from "next/image";

const partners = [
  {
    name: "Vardhaman Logo",
    logo: "/placeholder.svg?height=100&width=200",
  },
  {
    name: "IEEE VCE SB",
    logo: "/placeholder.svg?height=100&width=200",
  },
  {
    name: "IEEE Education",
    logo: "/placeholder.svg?height=100&width=200",
  },
  {
    name: "SAC",
    logo: "/placeholder.svg?height=100&width=200",
  },
];

export function Partners() {
  return (
    <section className="py-12 bg-muted">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
          {partners.map(partner => (
            <div key={partner.name} className="w-40 h-20 relative">
              <Image
                src={partner.logo || "/placeholder.svg"}
                alt={partner.name}
                fill
                className="object-contain filter grayscale hover:grayscale-0 transition-all"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
