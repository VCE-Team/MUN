import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center text-center">
      <div
        className="absolute inset-0 bg-[url('/hero-bg.jpg')] bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/hero-bg.jpg')",
        }}
      />
      <div className="relative z-10 container mx-auto px-4">
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
      </div>
    </section>
  );
}
