import { Card, CardContent } from "@/components/ui/card";
import {
  BanknoteIcon as Bank2,
  ShieldIcon as ShieldShaded,
  Flag,
  Hospital,
  BanknoteIcon as Bank,
  Mic,
} from "lucide-react";
import Link from "next/link";

const committees = [
  {
    icon: Bank2,
    title: "General Assembly",
    description:
      "The General Assembly stands as a beacon of hope and unity, providing a platform for open dialogue and the exchange of diverse perspectives on a myriad of global issues.",
    href: "/committees/general-assembly",
  },
  {
    icon: ShieldShaded,
    title: "UN Security Council",
    description:
      "The Security Council is responsible for upholding international peace and security within the United Nations and assumes a crucial role in navigating the complexities of our ever changing global landscape.",
    href: "/committees/unsc",
  },
  {
    icon: Flag,
    title: "UN Human Rights Council",
    description:
      "The Model United Nations Human Rights Council is a forum dedicated to promoting and protecting the fundamental rights and dignity of every individual across the globe.",
    href: "/committees/unhrc",
  },
  {
    icon: Hospital,
    title: "World Health Organization",
    description:
      "The World Health Organization (WHO) is a beacon of hope and progress, working towards achieving the highest attainable standard of health for all people & plays a pivotal role in shaping international health policies and responses.",
    href: "/committees/who",
  },
  {
    icon: Bank,
    title: "Lok Sabha",
    description:
      "The Lok Sabha is a melting pot of ideas and ideologies, where the dynamic exchange of thoughts and perspectives enriches the democratic fabric of the nation.",
    href: "/committees/lok-sabha",
  },
  {
    icon: Mic,
    title: "International Press",
    description:
      "The Model United Nations International Press holds the power of information and communication embodying the spirit of free press, objectivity, and responsibility in reporting.",
    href: "/committees/international-press",
  },
];

export function Committees() {
  return (
    <section className="py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Committees</h2>
          <p className="text-muted-foreground">
            Explore our diverse range of committees
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {committees.map(committee => (
            <Link href={committee.href} key={committee.title}>
              <Card className="h-full hover:bg-accent transition-colors">
                <CardContent className="p-6">
                  <div className="mb-4">
                    <committee.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    {committee.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {committee.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
