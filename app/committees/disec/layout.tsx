"use client";

import Image from "next/image";
import { RouteLoading } from "@/app/components/route-loading";

export default function DISECLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <RouteLoading />
      <div className="min-h-screen bg-black text-white">
        <div className="relative h-screen">
          <div className="absolute inset-0">
            <Image
              src="/images/committees/diseccopy.jpg"
              alt="DISEC"
              fill
              className="object-cover"
              priority
              quality={100}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black" />
          </div>
        </div>

        <div className="container mx-auto px-4">{children}</div>
      </div>
    </>
  );
}
