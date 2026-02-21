import Image from "next/image";
import Link from "next/link";
import { committees } from "./committees";

export function CommitteesMobile() {
  return (
    <section className="md:hidden bg-black py-8">
      <h2 className="text-3xl font-bold text-center text-white mb-6">
        COMMITTEES
      </h2>
      <div className="flex flex-col items-center space-y-6 px-4">
        {committees.map(committee => (
          <Link
            key={committee.title}
            href={committee.href}
            className="w-full max-w-md mx-auto"
          >
            <div className="relative w-full h-48 overflow-hidden rounded-lg">
              <Image
                src={committee.url || "/placeholder.svg"}
                alt={committee.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-white">
                    {committee.title}
                  </h3>
                  <p className="text-sm text-gray-300">
                    {committee.description}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
