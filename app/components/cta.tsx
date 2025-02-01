import { Button } from "@/components/ui/button";

export function CallToAction() {
  return (
    <section className="py-16 bg-[url('/cta-bg.jpg')] bg-cover bg-center relative">
      <div className="absolute inset-0 bg-black/50" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center text-white">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Call To Sponsors
          </h3>
          <p className="mb-8 max-w-2xl mx-auto">
            Be a catalyst for global change! Support our Model United Nations
            conference as a sponsor and help nurture the next generation of
            diplomatic leaders.
          </p>
          <Button
            variant="outline"
            className="text-white border-white hover:bg-primary hover:text-white"
          >
            Reach out
          </Button>
        </div>
      </div>
    </section>
  );
}
