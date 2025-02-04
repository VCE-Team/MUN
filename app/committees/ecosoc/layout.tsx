"use client";

import Image from "next/image";

export default function ECOSOCLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="relative h-screen">
        <div className="absolute inset-0">
          <Image
            src="/images/committees/ecosoccopy.jpg"
            alt="ECOSOC"
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
  );
}
