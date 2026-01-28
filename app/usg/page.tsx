"use client";

import { RouteLoading } from "@/app/components/route-loading";

export default function TeamPage() {
  return (
    <>
      <RouteLoading />
      <section className="bg-black text-white min-h-screen flex items-center">
        <div className="container mx-auto px-4 max-w-3xl text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold">
            Under Secretary Generals (USGs)
          </h2>
          <p className="text-gray-300 text-sm md:text-base">
            Details about the Under Secretary Generals and team members will
            be revealed soon. Stay tuned for updates.
          </p>
        </div>
      </section>
    </>
  );
}
