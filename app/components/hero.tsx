"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

export function Hero() {
  const [bgLoaded, setBgLoaded] = useState(false);

  useEffect(() => {
    setBgLoaded(true);
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center text-center">
      <div
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
          bgLoaded ? "opacity-100" : "opacity-0"
        }`}
        style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="relative z-10 container mx-auto px-4"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
          Welcome to VCE Model United Nations
        </h1>
        <h2 className="text-xl md:text-2xl text-gray-200 mb-8">
          #Advocate Aspire Achieve
        </h2>
        <Link href="/register">
          <Button
            size="lg"
            variant="outline"
            className="text-white border-white hover:bg-primary hover:text-white"
          >
            Register Now!
          </Button>
        </Link>
      </motion.div>
    </section>
  );
}
