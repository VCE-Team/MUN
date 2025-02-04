"use client";

import Image from "next/image";

export default function InternationalPressLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="relative h-screen">
        <div className="absolute inset-0">
          <Image
            src="/images/committees/internationalpresscopy.jpg"
            alt="International Press"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/10" />
        </div>
      </div>

      <div className="container mx-auto px-4">{children}</div>
    </div>
  );
}
