"use client";

import Image from "next/image";
import { RouteLoading } from "@/app/components/route-loading";

export default function UNHRCLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <RouteLoading />
      <div className="min-h-screen bg-black text-white">
        <div className="relative w-full h-[25vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] xl:h-[90vh]">
          <Image
            src="/images/committees/unhrccopy.jpg"
            alt="UNHRC"
            fill
            className="object-cover"
            priority
            quality={100}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black" />
        </div>

        <div className="container mx-auto px-4 mt-8">{children}</div>
      </div>
    </>
  );
}
