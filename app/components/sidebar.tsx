"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const committees = [
  { title: "DISEC", href: "/committees/disec" },
  { title: "UNHRC", href: "/committees/unhrc" },
  { title: "AIPPM", href: "/committees/aippm" },
  { title: "International Press (IP)", href: "/committees/internationalpress" },
];

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="fixed top-4 right-4 z-50 md:hidden"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[300px] sm:w-[400px]">
          <nav className="flex flex-col gap-4">
            <Link href="/" onClick={() => setIsOpen(false)}>
              Home
            </Link>
            <Accordion type="single" collapsible>
              <AccordionItem value="committees">
                <AccordionTrigger>Committees</AccordionTrigger>
                <AccordionContent>
                  <ul className="ml-4 space-y-2">
                    {committees.map(committee => (
                      <li key={committee.title}>
                        <Link
                          href={committee.href}
                          onClick={() => setIsOpen(false)}
                        >
                          {committee.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <Link href="/usg" onClick={() => setIsOpen(false)}>
              USG
            </Link>
            <Link href="/chairs" onClick={() => setIsOpen(false)}>
              Chairs
            </Link>
            <Link href="/register" onClick={() => setIsOpen(false)}>
              <Button className="w-full">Register</Button>
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}
