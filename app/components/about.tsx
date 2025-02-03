import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

export function About() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1">
            <h3 className="text-2xl font-semibold mb-4">
              What is VCE Model United Nations?
            </h3>
            <p className="text-muted-foreground">
              At Vardhaman College of Engineering (VCE), we believe in providing
              a transformative educational experience for our students. As part
              of our commitment to holistic learning, we organize Model United
              Nations (MUN) events, empowering our students to become confident
              global citizens. Through MUN, our participants engage in
              real-world simulations, developing critical skills such as public
              speaking, research, negotiation, and teamwork.
            </p>
          </div>
          <div className="order-1 md:order-2">
            <Image
              src="/images/about.avif"
              alt="MUN Conference"
              width={600}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          {[
            {
              number: "01",
              title: "Advocate",
              description:
                "Be the passionate advocate of diplomacy, justice, and progress - Join the Model United Nations and make your voice heard on the global stage, shaping a better world for all.",
            },
            {
              number: "02",
              title: "Aspire",
              description:
                "Aspire to make a difference on the global stage - Embrace the challenge of diplomacy at the Model United Nations and unlock your potential as a future leader of positive change.",
            },
            {
              number: "03",
              title: "Achieve",
              description:
                "Believe, act, and achieve - at the Model United Nations, you have the power to influence global affairs and make your mark as a diplomat of tomorrow.",
            },
          ].map(item => (
            <Card
              key={item.number}
              className="bg-card hover:bg-accent transition-colors"
            >
              <CardContent className="p-6">
                <span className="text-2xl font-bold text-primary">
                  #{item.number}
                </span>
                <h4 className="text-xl font-semibold mt-4 mb-2">
                  {item.title}
                </h4>
                <p className="text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
